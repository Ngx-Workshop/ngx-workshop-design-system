import { test, expect } from '@playwright/test';
const overview = '/iframe.html?id=start-here-workshop-frequency--overview&viewMode=story';
test('catalog renders, form saves, CDK copies real text', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(overview);
  await expect(page.getByRole('heading', { name: 'Interface the future' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Workshop name' }).fill('Reactive Workshop');
  await page.getByRole('button', { name: 'Save session' }).click();
  await expect(page.getByRole('status')).toContainText(['Session saved locally']);
  await page.getByRole('button', { name: 'Copy code' }).click();
  await expect(page.getByRole('button', { name: 'Copied!' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    'npm install /path/to/dist/ngx-workshop-ui',
  );
  expect(errors).toEqual([]);
});
test('dialog traps focus, Escape restores trigger; select overlay inherits neutral palette', async ({
  page,
}) => {
  await page.goto(overview);
  const trigger = page.getByRole('button', { name: 'Open a dialog' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Keep exploring' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: "Let's build" })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.getByRole('button', { name: 'Switch palette' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-ngx-theme', 'neutral');
  await page.getByRole('combobox', { name: 'Experience level' }).click();
  const option = page.getByRole('option', { name: 'Advanced' });
  await expect(option).toBeVisible();
  expect(
    await option.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--ngx-color-primary').trim(),
    ),
  ).toBe('#b6c8e0');
  await page.keyboard.press('End');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('combobox', { name: 'Experience level' })).toContainText('Advanced');
});
test('all stories render without runtime errors', async ({ page, request }) => {
  test.setTimeout(120_000);
  const index = await (await request.get('/index.json')).json();
  const stories = Object.values(index.entries).filter((e: any) => e.type === 'story') as {
    id: string;
  }[];
  expect(stories.length).toBeGreaterThanOrEqual(14);
  for (const story of stories) {
    const errors: string[] = [];
    const onError = (e: Error) => errors.push(e.message);
    const onConsole = (message: import('@playwright/test').ConsoleMessage) => {
      if (message.type() === 'error') errors.push(message.text());
    };
    page.on('console', onConsole);
    page.on('pageerror', onError);
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    await expect(page.locator('#storybook-root')).not.toBeEmpty();
    if (story.id.startsWith('material-') && !story.id.startsWith('material-primitives--'))
      await expect(page.locator('ngx-material-demo')).toBeVisible();
    await expect(page.locator('.sb-errordisplay')).not.toBeVisible();
    expect(errors, story.id).toEqual([]);
    page.off('pageerror', onError);
    page.off('console', onConsole);
  }
});
test('responsive showcase has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(overview);
  await expect(page.getByRole('heading', { name: 'Interface the future' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
test('Storybook manager exposes the theme toolbar', async ({ page }) => {
  await page.goto('/?path=/story/start-here-workshop-frequency--overview');
  const theme = page.getByRole('button', { name: /Neon \/ Workshop/ });
  await expect(theme).toBeVisible();
  await theme.click();
  await page.getByText('Neutral / Minimal', { exact: true }).click();
  const frame = page.frameLocator('#storybook-preview-iframe');
  await expect(frame.locator('html')).toHaveAttribute('data-ngx-theme', 'neutral');
});

test('foundation has no serious accessibility violations in either palette', async ({ page }) => {
  for (const theme of ['neon', 'neutral']) {
    await page.goto(overview + '&globals=theme:' + theme);
    await expect(page.getByRole('heading', { name: 'Interface the future' })).toBeVisible();
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => {
      const result = await (window as any).axe.run(document.querySelector('ngx-showcase'));
      return result.violations
        .filter((v: any) => ['serious', 'critical'].includes(v.impact))
        .map((v: any) => ({ id: v.id, nodes: v.nodes.map((n: any) => n.target) }));
    });
    expect(violations, theme).toEqual([]);
  }
});

test('overview shared primary action keeps a visible background and keyboard focus', async ({
  page,
}) => {
  await page.goto(overview);
  const action = page.getByRole('link', { name: 'Explore components ↗' });
  await expect(action).toBeVisible();
  await expect(action).toHaveAttribute('data-ngx-shape', 'chamfered');
  expect(
    await action
      .locator('.ngx-button-decoration')
      .evaluate((el) => getComputedStyle(el).backgroundColor),
  ).not.toBe('rgba(0, 0, 0, 0)');
  await action.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(action).toBeFocused();
  expect(await action.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
});
