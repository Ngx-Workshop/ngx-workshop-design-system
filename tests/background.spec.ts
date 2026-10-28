import { writeFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
const story = '/iframe.html?id=foundations-backgrounds--rhombus-fractal&viewMode=story';

test('outline flow pauses and resumes without blocking content', async ({ page }) => {
  await page.goto(story);
  const background = page.locator('ngx-background');
  await expect(background).toHaveAttribute('aria-hidden', 'true');
  await expect(background).toHaveCSS('pointer-events', 'none');
  await expect
    .poll(() => background.evaluate((node) => node.getAnimations({ subtree: true }).length))
    .toBeGreaterThan(0);
  const trace = background.locator('.trace').first();
  const before = await trace.evaluate((node) => getComputedStyle(node).strokeDashoffset);
  await expect
    .poll(() => trace.evaluate((node) => getComputedStyle(node).strokeDashoffset))
    .not.toBe(before);
  await page.getByRole('button', { name: 'Pause flow' }).click();
  await expect
    .poll(() => background.evaluate((node) => node.getAnimations({ subtree: true }).length))
    .toBe(0);
  await page.getByRole('button', { name: 'Resume flow' }).click();
  await expect
    .poll(() => background.evaluate((node) => node.getAnimations({ subtree: true }).length))
    .toBeGreaterThan(0);
});

test('reduced motion and still mode remove all animation; colors inherit live', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(story);
  const background = page.locator('ngx-background');
  await expect(background.locator('svg')).toBeVisible();
  expect(await background.evaluate((node) => node.getAnimations({ subtree: true }).length)).toBe(0);
  const trace = background.locator('.trace').first();
  await background.evaluate((node) =>
    (node as HTMLElement).style.setProperty('--ngx-color-violet', 'rgb(100, 150, 200)'),
  );
  await expect(trace).toHaveCSS('stroke', 'rgb(100, 150, 200)');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect
    .poll(() => background.evaluate((node) => node.getAnimations({ subtree: true }).length))
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() => background.evaluate((node) => node.getAnimations({ subtree: true }).length))
    .toBe(0);
  await page.goto('/iframe.html?id=foundations-backgrounds--still&viewMode=story');
  await expect(background).toHaveAttribute('data-animated', 'false');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  expect(await background.evaluate((node) => node.getAnimations({ subtree: true }).length)).toBe(0);
});

test('mobile and contained backgrounds remain bounded', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(story);
  await expect(page.getByRole('heading', { name: 'A quieter dimension.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.screenshot({ path: '/tmp/ngx-background-mobile.png', fullPage: true });
  await page.goto('/iframe.html?id=foundations-backgrounds--contained&viewMode=story');
  const bounds = await page.locator('ngx-background').boundingBox();
  expect(bounds?.height).toBe(438);
  await expect(page.getByText('Content outside the background.')).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(story);
  await page.screenshot({ path: '/tmp/ngx-background-desktop.png', fullPage: true });
});

test('live controls update geometry in place and reset the pattern', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(story);
  const background = page.locator('ngx-background');
  const svg = background.locator('svg');
  await svg.evaluate((node) => node.setAttribute('data-original', 'true'));
  const firstPath = background.locator('.structure').first();
  const original = await firstPath.getAttribute('d');
  for (const label of ['Rhombus size', 'Height / width', 'Spacing']) {
    const previous = await background.locator('.structure').last().getAttribute('d');
    await page.getByRole('slider', { name: label, exact: true }).focus();
    await page.keyboard.press('End');
    await expect
      .poll(() => background.locator('.structure').last().getAttribute('d'))
      .not.toBe(previous);
  }
  await expect(background.locator('.structure')).toHaveCount(1);
  await page.getByRole('slider', { name: 'Intensity', exact: true }).focus();
  await page.keyboard.press('End');
  await expect(background.locator('.field')).toHaveCSS('opacity', '1');
  await page.getByRole('slider', { name: 'Pattern cycle', exact: true }).focus();
  await page.keyboard.press('End');
  await expect
    .poll(() =>
      background.evaluate((node) =>
        getComputedStyle(node).getPropertyValue('--ngx-background-flow-duration').trim(),
      ),
    )
    .toBe('90s');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(firstPath).toHaveAttribute('d', original!);
  await expect(background.locator('.structure')).toHaveCount(1);
  await expect(svg).toHaveAttribute('data-original', 'true');
  await expect(background.locator('.field')).toHaveCSS('opacity', '0.48');
});

test('extreme and invalid configuration stays bounded and finite', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(story + '&args=size:-100;aspectRatio:99;spacing:-1');
  const background = page.locator('ngx-background');
  await expect(background.locator('.structure')).toHaveCount(1);
  for (const path of await background
    .locator('.structure')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('d')!))) {
    expect(path).not.toMatch(/NaN|Infinity/);
    expect(path.length).toBeLessThan(2_000_000);
  }
  await page.goto(
    '/iframe.html?id=foundations-backgrounds--contained&viewMode=story' +
      '&args=size:invalid;aspectRatio:invalid;spacing:invalid',
  );
  await expect(background.locator('.structure')).toHaveCount(1);
  expect(await background.locator('.structure').first().getAttribute('d')).not.toMatch(
    /NaN|Infinity/,
  );
  expect(errors).toEqual([]);
});

test('dense mobile lattice supports keyboard configuration without overflow', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/iframe.html?id=foundations-backgrounds--dense-lattice&viewMode=story');
  await expect(page.locator('ngx-background .structure')).toHaveCount(1);
  await expect(page.locator('ngx-background .structure')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.screenshot({ path: '/tmp/ngx-background-config-mobile.png', fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(story);
  await page.screenshot({ path: '/tmp/ngx-background-config-desktop.png', fullPage: true });
});

test('palette, independent cycle speeds and thickness update live and reset', async ({ page }) => {
  await page.goto(story);
  const background = page.locator('ngx-background');
  const trace = background.locator('.trace').first();
  const structure = background.locator('.structure').first();
  const colors = ['#112233', '#445566', '#778899', '#aabbcc'];
  for (const [index, color] of colors.entries()) {
    await page.getByLabel(`Outline color ${index + 1}`, { exact: true }).evaluate((node, value) => {
      (node as HTMLInputElement).value = value;
      node.dispatchEvent(new Event('input', { bubbles: true }));
    }, color);
  }
  await expect(structure).toHaveCSS('stroke', 'rgb(17, 34, 51)');
  await page.getByRole('slider', { name: 'Pattern cycle', exact: true }).focus();
  await page.keyboard.press('Home');
  await expect(trace).toHaveCSS('animation-duration', '5s, 28s');
  await page.getByRole('slider', { name: 'Color cycle', exact: true }).focus();
  await page.keyboard.press('End');
  await expect(trace).toHaveCSS('animation-duration', '5s, 90s');
  for (const [index, expected] of [
    'rgb(17, 34, 51)',
    'rgb(68, 85, 102)',
    'rgb(119, 136, 153)',
    'rgb(170, 187, 204)',
  ].entries()) {
    await trace.evaluate((node, position) => {
      const animation = node
        .getAnimations()
        .find((item) => (item as CSSAnimation).animationName.endsWith('ngx-background-palette'))!;
      animation.pause();
      animation.currentTime = position * 22500;
    }, index);
    await expect(trace).toHaveCSS('stroke', expected);
  }
  for (const label of ['Outline thickness', 'Trace thickness']) {
    await page.getByRole('slider', { name: label, exact: true }).focus();
    await page.keyboard.press('End');
  }
  await expect(structure).toHaveCSS('stroke-width', '4px');
  await expect(trace).toHaveCSS('stroke-width', '4px');
  await trace.evaluate((node) => node.getAnimations().forEach((animation) => animation.cancel()));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(trace).toHaveCSS('stroke', 'rgb(68, 85, 102)');
  await expect
    .poll(() => background.evaluate((node) => node.getAnimations({ subtree: true }).length))
    .toBe(0);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(structure).toHaveCSS('stroke-width', '0.6px');
  await expect(trace).toHaveCSS('stroke-width', '1px');
  await expect(structure).toHaveCSS('stroke', 'rgb(39, 245, 239)');
  await expect(trace).toHaveCSS('stroke', 'rgb(170, 140, 255)');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(trace).toHaveCSS('animation-duration', '28s, 28s');
});

test('rotation preserves nodes, wraps at 360 degrees and resets', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(story);
  const path = page.locator('ngx-background .structure').first();
  const original = await path.getAttribute('d');
  await path.evaluate((node) => node.setAttribute('data-original', 'true'));
  const slider = page.getByRole('slider', { name: 'Rotation', exact: true });
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => path.getAttribute('d')).not.toBe(original);
  await page.keyboard.press('End');
  await expect(path).toHaveAttribute('d', original!);
  await page.keyboard.press('ArrowLeft');
  await expect.poll(() => path.getAttribute('d')).not.toBe(original);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(path).toHaveAttribute('d', original!);
  await expect(path).toHaveAttribute('data-original', 'true');
  await page.goto(
    '/iframe.html?id=foundations-backgrounds--contained&viewMode=story&args=rotation:-330',
  );
  const negative = await path.getAttribute('d');
  await page.goto(
    '/iframe.html?id=foundations-backgrounds--contained&viewMode=story&args=rotation:30',
  );
  await expect(path).toHaveAttribute('d', negative!);
});

test('random trace delays reshuffle independently of geometry and reset', async ({ page }) => {
  await page.goto(story);
  const background = page.locator('ngx-background');
  const traces = background.locator('.trace');
  await expect(traces).toHaveCount(8);
  const geometry = await background.locator('.structure').first().getAttribute('d');
  const delays = () =>
    traces.evaluateAll((nodes) =>
      nodes.map((node) => parseFloat(getComputedStyle(node).animationDelay.split(',')[0])),
    );
  const initial = await delays();
  expect(initial[0]).toBe(0);
  expect(new Set(initial).size).toBeGreaterThan(4);
  expect(initial.every((delay) => delay >= 0 && delay <= 8)).toBe(true);
  await page.getByRole('button', { name: 'Reshuffle traces', exact: true }).click();
  await expect.poll(delays).not.toEqual(initial);
  await expect(background.locator('.structure').first()).toHaveAttribute('d', geometry!);
  const slider = page.getByRole('slider', { name: 'Random delay', exact: true });
  await slider.focus();
  await page.keyboard.press('Home');
  await expect.poll(async () => (await delays()).every((delay) => delay === 0)).toBe(true);
  await page.keyboard.press('End');
  await expect.poll(async () => Math.max(...(await delays()))).toBeGreaterThan(20);
  expect((await delays()).every((delay) => delay <= 30)).toBe(true);
  const delayed = traces.nth(1);
  await delayed.evaluate((node) => {
    const flow = node
      .getAnimations()
      .find((animation) =>
        (animation as CSSAnimation).animationName.endsWith('ngx-background-flow'),
      )!;
    flow.pause();
    flow.currentTime = 0;
  });
  await expect(delayed).toHaveCSS('opacity', '0');
  await delayed.evaluate((node) => {
    const flow = node
      .getAnimations()
      .find((animation) =>
        (animation as CSSAnimation).animationName.endsWith('ngx-background-flow'),
      )!;
    flow.currentTime = Number(flow.effect!.getTiming().delay) + 100;
  });
  await expect(delayed).toHaveCSS('opacity', '0.85');
  await delayed.evaluate((node) => node.getAnimations().forEach((animation) => animation.cancel()));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(delayed).toHaveCSS('opacity', '0.85');
  await expect
    .poll(() => background.evaluate((node) => node.getAnimations({ subtree: true }).length))
    .toBe(0);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(delays).toEqual(initial);
});

test('random trace lengths stay in bounds, reshuffle and support equal endpoints', async ({
  page,
}) => {
  await page.goto(story);
  const traces = page.locator('ngx-background .trace');
  await expect(traces).toHaveCount(8);
  const lengths = () =>
    traces.evaluateAll((nodes) =>
      nodes.map((node) =>
        Number(
          getComputedStyle(node)
            .strokeDasharray.split(',')[0]
            .match(/[0-9.]+/)![0],
        ),
      ),
    );
  const initial = await lengths();
  expect(initial.every((value) => value >= 40 && value <= 160)).toBe(true);
  expect(new Set(initial).size).toBeGreaterThan(4);
  const originalGeometry = await page
    .locator('ngx-background .structure')
    .first()
    .getAttribute('d');
  await page.getByRole('button', { name: 'Reshuffle traces', exact: true }).click();
  await expect.poll(lengths).not.toEqual(initial);
  await expect(page.locator('ngx-background .structure').first()).toHaveAttribute(
    'd',
    originalGeometry!,
  );
  await page.getByRole('slider', { name: 'Minimum trace length', exact: true }).focus();
  await page.keyboard.press('End');
  await expect.poll(async () => (await lengths()).every((value) => value === 360)).toBe(true);
  await page.getByRole('slider', { name: 'Maximum trace length', exact: true }).focus();
  await page.keyboard.press('Home');
  await expect.poll(async () => (await lengths()).every((value) => value === 5)).toBe(true);
  await expect(traces.first()).toHaveCSS('animation-duration', '28s, 28s');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect.poll(lengths).toEqual(initial);
  await page.goto('/iframe.html?id=foundations-backgrounds--contained&viewMode=story');
  await expect(traces).toHaveCount(8);
  expect((await lengths()).every((value) => value >= 40 && value <= 160)).toBe(true);
  await page.locator('ngx-background').evaluate((node) => {
    const style = (node as HTMLElement).style;
    style.setProperty('--ngx-background-trace-min-length', '200');
    style.setProperty('--ngx-background-trace-max-length', '20');
  });
  await expect
    .poll(async () => (await lengths()).every((value) => value >= 20 && value <= 200))
    .toBe(true);
  await page.locator('ngx-background').evaluate((node) => {
    const style = (node as HTMLElement).style;
    style.removeProperty('--ngx-background-trace-min-length');
    style.removeProperty('--ngx-background-trace-max-length');
    (node.parentElement as HTMLElement).style.removeProperty('--ngx-background-trace-min-length');
    (node.parentElement as HTMLElement).style.removeProperty('--ngx-background-trace-max-length');
    style.setProperty('--ngx-background-trace-length', '120');
  });
  await expect.poll(async () => (await lengths()).every((value) => value === 120)).toBe(true);
});

test('copies the current reusable background configuration and updates after edits', async ({
  page,
}) => {
  await page.goto('/iframe.html?id=foundations-backgrounds--viewport&viewMode=story');
  for (const name of [
    'Rhombus size',
    'Pattern cycle',
    'Color cycle',
    'Maximum trace length',
    'Rotation',
    'Trace thickness',
  ]) {
    await page.getByRole('slider', { name, exact: true }).focus();
    await page.keyboard.press('End');
  }
  await page.getByLabel('Outline color 1', { exact: true }).evaluate((node) => {
    (node as HTMLInputElement).value = '#123456';
    node.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await page.getByRole('button', { name: 'Reshuffle traces', exact: true }).click();
  await page.getByRole('button', { name: 'Pause flow', exact: true }).click();
  await page.getByRole('button', { name: 'Copy background configuration', exact: true }).click();
  await expect(page.locator('.copy-status')).toHaveText('Configuration copied');
  const content = await page.evaluate(() => navigator.clipboard.readText());
  for (const fragment of [
    "import { NgxBackground } from '@tmdjr/ngx-workshop-design-system'",
    'placement="viewport"',
    '[animated]="false"',
    '[size]="720"',
    '[aspectRatio]="0.5777777777777777"',
    '[traceSeed]="2"',
    '[rotation]="360"',
    '--ngx-background-trace-min-length: 40;',
    '--ngx-background-trace-max-length: 360;',
    '--ngx-background-flow-duration: 90s;',
    '--ngx-background-color-duration: 90s;',
    '--ngx-background-color-1: #123456;',
    '--ngx-background-trace-width: 4px;',
    '--ngx-background-opacity: 0.48;',
    '--ngx-background-trace-delay: 8s;',
    'isolation: isolate;',
  ])
    expect(content).toContain(fragment);
  expect(content).not.toContain('[depth]');
  expect(content).not.toContain('[childScale]');
  writeFileSync('/tmp/ngx-background-current-configuration.txt', content);
  await page.getByRole('slider', { name: 'Intensity', exact: true }).focus();
  await page.keyboard.press('End');
  await expect(page.locator('.copy-status')).toHaveText('');
  await page.getByRole('button', { name: 'Use theme colors', exact: true }).click();
  await page.getByRole('button', { name: 'Copy background configuration', exact: true }).click();
  const inherited = await page.evaluate(() => navigator.clipboard.readText());
  expect(inherited).toContain('--ngx-background-opacity: 1;');
  expect(inherited).toContain('Outline colors inherit the app theme');
  expect(inherited).not.toContain('#123456');
});

test('clipboard failure leaves selectable current configuration', async ({ page }) => {
  await page.addInitScript(() => {
    document.execCommand = () => false;
  });
  await page.goto(story);
  await page.getByRole('button', { name: 'Copy background configuration', exact: true }).click();
  await expect(page.locator('.copy-status')).toContainText('Copy failed');
  await page.getByText('View configuration', { exact: true }).click();
  await expect(page.locator('pre[aria-label="Background configuration"]')).toContainText(
    '[traceSeed]="1"',
  );
  await expect(page.locator('pre[aria-label="Background configuration"]')).toBeVisible();
});

test('single lattice bounds geometry and animation work without recursion controls', async ({
  page,
}) => {
  await page.goto(story);
  const background = page.locator('ngx-background');
  await expect(background.locator('.structure')).toHaveCount(1);
  await expect(background.locator('.trace')).toHaveCount(8);
  await expect(page.getByRole('slider', { name: 'Recursion levels', exact: true })).toHaveCount(0);
  await expect(page.getByRole('slider', { name: 'Child scale', exact: true })).toHaveCount(0);
  const count = () =>
    background
      .locator('.structure')
      .evaluate((node) => (node.getAttribute('d')!.match(/M/g) || []).length);
  expect(await count()).toBe(24);
  expect(
    await background.evaluate((node) => node.getAnimations({ subtree: true }).length),
  ).toBeLessThanOrEqual(17);
  for (const name of ['Rhombus size', 'Height / width', 'Spacing']) {
    await page.getByRole('slider', { name, exact: true }).focus();
    await page.keyboard.press('Home');
  }
  await expect.poll(count).toBe(273);
  await expect(background.locator('path')).toHaveCount(9);
  expect(
    await background.evaluate((node) => node.getAnimations({ subtree: true }).length),
  ).toBeLessThanOrEqual(17);
});
