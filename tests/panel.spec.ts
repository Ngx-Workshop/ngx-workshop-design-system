import { test, expect } from '@playwright/test';
const story = (id: string) =>
  `/iframe.html?id=components-panel-transition-lab--${id}&viewMode=story`;
for (const [id, mode] of [
  ['boot-sequence', 'boot'],
  ['glitch-transmission', 'glitch'],
  ['holographic-uplink', 'hologram'],
]) {
  test(`${mode} enters and completes a real exit before DOM removal`, async ({ page }) => {
    await page.goto(story(id));
    const panel = page.locator('ngx-panel');
    await expect(panel).toBeVisible();
    await expect(panel).not.toHaveClass(/ngx-panel-enter-/);
    await panel.evaluate((el) =>
      (el as HTMLElement).style.setProperty('--ngx-panel-leave-duration', '700ms'),
    );
    const start = Date.now();
    await page.getByRole('button', { name: 'Hide panel', exact: true }).click();
    await expect(panel).toHaveClass(new RegExp(`ngx-panel-leave-${mode}`));
    await expect(page.getByRole('button', { name: 'Hide panel', exact: true })).toBeFocused();
    await expect(panel).toHaveJSProperty('inert', true);
    await expect(panel).toHaveCount(0);
    expect(Date.now() - start).toBeGreaterThanOrEqual(600);
    await page.getByRole('button', { name: 'Show panel', exact: true }).click();
    await expect(panel).toHaveCount(1);
    await expect(panel).not.toHaveClass(/ngx-panel-enter-/);
    await expect(panel).toHaveJSProperty('inert', false);
    await expect(panel.getByRole('button', { name: 'Inspect uplink' })).toBeVisible();
    await page.getByRole('button', { name: 'Replay transition' }).click();
    await expect(page.getByRole('button', { name: 'Replay transition' })).toHaveAttribute(
      'aria-busy',
      'false',
    );
    await expect(page.getByRole('button', { name: 'Replay transition' })).toBeFocused();
    await expect(panel).toHaveCount(1);
    await expect(panel).not.toHaveClass(/ngx-panel-enter-/);
  });
}
test('motion none removes immediately; reduced motion suppresses transform sequences', async ({
  page,
}) => {
  await page.goto(story('no-motion'));
  await page.getByRole('button', { name: 'Hide panel', exact: true }).click();
  await expect(page.locator('ngx-panel')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(story('boot-sequence'));
  const panel = page.locator('ngx-panel');
  await expect(panel).toBeVisible();
  const duration = await panel.evaluate((el) =>
    getComputedStyle(el).getPropertyValue('--panel-leave-duration').trim(),
  );
  expect(duration).toBe('1ms');
  await page.getByRole('button', { name: 'Hide panel', exact: true }).click();
  await expect(panel).toHaveCount(0);
});
test('five distinct frame geometries and opaque/blurred surfaces render', async ({ page }) => {
  await page.goto('/iframe.html?id=components-panel--shapes&viewMode=story');
  await expect(page.locator('ngx-panel')).toHaveCount(5);
  const clips = await page
    .locator('ngx-panel .frame')
    .evaluateAll((els) => els.map((el) => getComputedStyle(el, '::after').clipPath));
  expect(new Set(clips).size).toBe(5);
  expect(clips.every((c) => c.startsWith('polygon('))).toBe(true);
  await page.goto('/iframe.html?id=components-panel--backgrounds&viewMode=story');
  const grid = page.locator('ngx-panel[data-background="grid"] .frame');
  const solid = page.locator('ngx-panel[data-background="solid"] .frame');
  const glass = page.locator('ngx-panel[data-background="glass"] .frame');
  await expect(glass).toBeVisible();
  expect(await grid.evaluate((el) => getComputedStyle(el, '::after').backgroundImage)).toContain(
    'linear-gradient',
  );
  expect(await solid.evaluate((el) => getComputedStyle(el, '::after').backgroundImage)).toBe(
    'none',
  );
  const style = await glass.evaluate((el) => ({
    blur: getComputedStyle(el, '::after').backdropFilter,
    color: getComputedStyle(el, '::after').backgroundColor,
    ring: getComputedStyle(el, '::before').clipPath,
  }));
  expect(style.blur).toContain('blur(16px)');
  expect(style.color).toContain('0.65');
  expect(style.ring).toContain('evenodd');
});
test('panel lab is accessible and contained at mobile width', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(story('holographic-uplink'));
  await expect(page.locator('ngx-panel')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
  const violations = await page.evaluate(async () => {
    const { violations } = await (window as any).axe.run(document.querySelector('ngx-panel-lab'));
    return violations
      .filter((v: any) => ['serious', 'critical'].includes(v.impact))
      .map((v: any) => ({ id: v.id, nodes: v.nodes.map((n: any) => n.target) }));
  });
  expect(violations).toEqual([]);
});

test('header slot shares the heading row and wraps without mobile overflow', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/iframe.html?id=components-panel--header-content&viewMode=story');
  const panel = page.locator('ngx-panel');
  const header = panel.locator('mat-card-header');
  const preview = header.getByRole('button', { name: 'Preview remote' });
  await expect(preview).toBeVisible();
  await expect(header).toContainText('ID remote-021');
  await expect(panel.locator('mat-card-content')).not.toContainText('ID remote-021');
  await expect(
    panel.locator('mat-card-actions').getByRole('button', { name: 'Save changes' }),
  ).toBeVisible();
  const titleBox = await header.locator('mat-card-title').boundingBox();
  const previewBox = await preview.boundingBox();
  expect(Math.abs(titleBox!.y - previewBox!.y)).toBeLessThan(40);
  await preview.focus();
  await expect(preview).toBeFocused();
  await page.setViewportSize({ width: 320, height: 640 });
  await expect(preview).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('staggered heading reveals graphemes and replays only when its heading/key changes', async ({
  page,
}) => {
  await page.goto('/iframe.html?id=components-panel--animated-heading&viewMode=story');
  const title = page.getByRole('heading', { name: 'Seed 🚀 MFE', exact: true });
  await expect(title).toBeVisible();
  const characters = title.locator('.panel__heading-character');
  await expect(characters).toHaveCount(10);
  await expect(characters.nth(5)).toHaveText('🚀');
  await expect(characters.nth(4)).toHaveText('\u00a0');
  expect(await characters.nth(1).evaluate((el) => getComputedStyle(el).animationDelay)).toBe(
    '0.025s',
  );
  await expect
    .poll(() =>
      title.evaluate(
        (el) => el.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').length,
      ),
    )
    .toBe(0);
  expect(await characters.first().evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  const original = await characters.first().elementHandle();
  await page.getByRole('button', { name: 'Refresh metadata' }).click();
  expect(await original!.evaluate((el) => el.isConnected)).toBe(true);
  await page.getByRole('button', { name: 'Switch remote' }).click();
  await expect.poll(() => original!.evaluate((el) => el.isConnected)).toBe(false);
  await expect(title).toHaveAttribute('aria-label', 'Seed 🚀 MFE');
});

test('reduced motion makes staggered headings immediately readable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/iframe.html?id=components-panel--animated-heading&viewMode=story');
  const title = page.getByRole('heading', { name: 'Seed 🚀 MFE', exact: true });
  await expect(title).toBeVisible();
  const styles = await title
    .locator('.panel__heading-character')
    .evaluateAll((elements) =>
      elements.map((el) => ({
        opacity: getComputedStyle(el).opacity,
        animation: getComputedStyle(el).animationName,
      })),
    );
  expect(styles.every((style) => style.opacity === '1' && style.animation === 'none')).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
