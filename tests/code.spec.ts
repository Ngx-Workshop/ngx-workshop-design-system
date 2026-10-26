import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
const story = (id: string, theme = 'neon') =>
  `/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`;

test('supported languages preserve exact source and render semantic tokens as text', async ({
  page,
}) => {
  for (const language of ['type-script', 'java-script', 'html', 'css', 'json']) {
    await page.goto(story('components-code-block--' + language));
    const code = page.locator('ngx-code-block pre code');
    await expect(code).toBeVisible();
    await expect(code.locator('[class^="ngx-syntax-"]').first()).toBeVisible();
    const source = await code.textContent();
    expect(source?.length).toBeGreaterThan(20);
    await page.getByRole('button', { name: 'Copy code', exact: true }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(source);
    await expect(page.getByRole('button', { name: 'Copied!', exact: true })).toBeVisible();
  }
});

test('source edits clear copied feedback; highlighted HTML remains escaped and rapid language changes stay current', async ({
  page,
}) => {
  await page.goto(story('components-code-block-snippet-lab--live-source'));
  await page.getByRole('button', { name: 'Copy code', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Copied!', exact: true })).toBeVisible();
  await page.getByText('Edit source', { exact: true }).click();
  const input = page.getByRole('textbox', { name: 'Snippet source' });
  const payload =
    '<img src="x" onerror="window.__unsafeSnippet=true"><script>window.__unsafeSnippet=true</script>';
  await page.getByRole('button', { name: 'HTML sample', exact: true }).click();
  await expect(input).toHaveValue(/<section class="workshop"/);
  await input.fill(payload);
  await expect(page.getByRole('button', { name: 'Copy code', exact: true })).toBeVisible();
  await expect(page.locator('ngx-code-block pre code')).toHaveText(payload);
  await expect(page.locator('ngx-code-block pre img,ngx-code-block pre script')).toHaveCount(0);
  expect(await page.evaluate(() => (window as any).__unsafeSnippet)).toBeUndefined();
  await page.getByRole('button', { name: 'TypeScript sample', exact: true }).click();
  await page.getByRole('button', { name: 'CSS sample', exact: true }).click();
  await page.getByRole('button', { name: 'JSON sample', exact: true }).click();
  await expect(page.locator('ngx-code-block pre code')).toHaveClass('language-json');
  await expect(page.locator('ngx-code-block .ngx-syntax-string').first()).toBeVisible();
  await expect(page.locator('ngx-code-block pre code')).toContainText('"published": true');
  await page.getByRole('button', { name: 'Copy code', exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('"published": true');
});

test('actual CodeMirror and lightweight views share palette, syntax and readable/original contrast', async ({
  page,
}) => {
  for (const [variant, comment] of [
    ['readable', 'rgb(132, 139, 189)'],
    ['original', 'rgb(73, 84, 149)'],
  ]) {
    await page.goto(story('components-code-block-codemirror-parity--' + variant));
    const editor = page.locator('.editor-shell .cm-editor');
    const block = page.locator('ngx-code-block');
    await expect(editor).toBeVisible();
    await expect(editor.locator('.ngx-syntax-keyword').first()).toBeVisible();
    await expect(block.locator('.ngx-syntax-keyword').first()).toBeVisible();
    for (const cls of ['keyword', 'string', 'literal', 'comment', 'property']) {
      const left = editor.locator('.ngx-syntax-' + cls).first();
      const right = block.locator('.ngx-syntax-' + cls).first();
      await expect(left).toBeVisible();
      await expect(right).toBeVisible();
      expect(await left.evaluate((el) => getComputedStyle(el).color), cls).toBe(
        await right.evaluate((el) => getComputedStyle(el).color),
      );
    }
    expect(
      await editor
        .locator('.ngx-syntax-comment')
        .first()
        .evaluate((el) => getComputedStyle(el).color),
    ).toBe(comment);
    expect(await editor.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(
      'rgb(38, 35, 53)',
    );
    expect(
      await block.locator('section').evaluate((el) => getComputedStyle(el).backgroundColor),
    ).toBe('rgb(38, 35, 53)');
    expect(await editor.evaluate((el) => getComputedStyle(el).fontSize)).toBe(
      await block.locator('pre').evaluate((el) => getComputedStyle(el).fontSize),
    );
  }
});

test('native pre/code and neutral surroundings keep the code palette; editor runtime is not a library dependency', async ({
  page,
}) => {
  await page.goto(story('foundations-native-code--plain', 'neutral'));
  await expect(page.getByRole('region', { name: 'Native terminal source' })).toBeVisible();
  expect(
    await page
      .getByRole('region', { name: 'Native terminal source' })
      .evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe('rgb(38, 35, 53)');
  await expect(page.locator('.cm-editor')).toHaveCount(0);
  const pkg = JSON.parse(readFileSync('dist/ngx-workshop-ui/package.json', 'utf8'));
  expect(Object.keys(pkg.dependencies).some((name) => name.includes('codemirror'))).toBe(false);
  for (const file of readdirSync('dist/ngx-workshop-ui/fesm2022').filter((f) =>
    f.endsWith('.mjs'),
  )) {
    const source = readFileSync('dist/ngx-workshop-ui/fesm2022/' + file, 'utf8');
    expect(source).not.toMatch(
      /(?:from\s*|import\s*(?:\(\s*)?)['"](?:@codemirror|codemirror|@fsegurai)/,
    );
  }
});

test('empty, large and wrapping specimens keep fallback and mobile behavior', async ({ page }) => {
  await page.goto(story('components-code-block--empty'));
  await expect(page.getByRole('button', { name: 'Copy code' })).toBeDisabled();
  await expect(page.getByText('No code provided.')).toBeVisible();
  await page.goto(story('components-code-block--large-plain-fallback'));
  await expect(page.locator('ngx-code-block pre code')).toBeVisible();
  await expect(page.locator('ngx-code-block [class^="ngx-syntax-"]')).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of [
    'components-code-block--type-script',
    'components-code-block--wrapped',
    'components-code-block-codemirror-parity--readable',
  ]) {
    await page.goto(story(id));
    await expect(page.locator('ngx-code-block pre')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), id).toBe(
      true,
    );
  }
});

test('readable syntax and actual editor comparison have no serious accessibility violations in both palettes', async ({
  page,
}) => {
  test.setTimeout(90_000);
  for (const theme of ['neon', 'neutral'])
    for (const id of [
      'components-code-block--type-script',
      'components-code-block--css',
      'components-code-block--json',
      'components-code-block-codemirror-parity--readable',
    ]) {
      await page.goto(story(id, theme));
      await expect(
        page
          .locator('ngx-code-block .ngx-syntax-comment,ngx-code-block .ngx-syntax-string')
          .first(),
      ).toBeVisible();
      if (id.includes('parity'))
        await expect(page.locator('.cm-editor .ngx-syntax-keyword').first()).toBeVisible();
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
      const violations = await page.evaluate(async () => {
        const result = await (window as any).axe.run(document.body);
        return result.violations
          .filter((v: any) => ['serious', 'critical'].includes(v.impact))
          .map((v: any) => ({
            id: v.id,
            nodes: v.nodes.map((n: any) => ({ target: n.target, summary: n.failureSummary })),
          }));
      });
      expect(violations, theme + '/' + id).toEqual([]);
    }
});
