import { test, expect } from '@playwright/test';

const story = '/iframe.html?id=foundations-backgrounds-theme-aware--neon&viewMode=story';
const themes = [
  'neon',
  'neutral',
  'light',
  'amber-light',
  'amber',
  'teal-light',
  'teal-dark',
  'nasa-light',
  'nasa-dark',
  'reeses-light',
  'reeses-dark',
  'neon',
];

test('one component follows all themes, retains content and keeps panel overrides independent', async ({
  page,
}) => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:6007') && !request.url().startsWith('data:'))
      externalRequests.push(request.url());
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(story);
  const background = page.locator('ngx-background');
  const pattern = background.locator('.pattern');
  const svg = background.locator('svg');
  await expect(background).toHaveAttribute('data-design', 'theme');
  await background.evaluate((el) => el.setAttribute('data-original', 'true'));
  await svg.evaluate((el) => el.setAttribute('data-original', 'true'));
  const content = page.getByText('Make yourself at home', { exact: true });
  await content.evaluate((el) => el.setAttribute('data-original', 'true'));
  const originalGeometry = await background.locator('.structure').getAttribute('d');
  for (const theme of themes) {
    await page.evaluate(
      (value) => document.documentElement.setAttribute('data-ngx-theme', value),
      theme,
    );
    const branded = theme.startsWith('nasa') || theme.startsWith('reeses');
    await expect(svg).toHaveCSS('display', branded ? 'none' : 'block');
    await expect(pattern).toHaveCSS('display', branded ? 'block' : 'none');
    if (branded) {
      const image = await pattern.evaluate((el) => getComputedStyle(el).backgroundImage);
      expect(image).toContain('data:image/svg+xml');
      expect(image).toContain(theme.startsWith('nasa') ? '110%2092' : '841.9%20352.3');
      await page.evaluate(() =>
        document.documentElement.style.setProperty('--ngx-panel-grid-image', 'none'),
      );
      expect(await pattern.evaluate((el) => getComputedStyle(el).backgroundImage)).toBe(image);
      await page.evaluate(() =>
        document.documentElement.style.removeProperty('--ngx-panel-grid-image'),
      );
    }
    await expect(background).toHaveAttribute('data-original', 'true');
    await expect(svg).toHaveAttribute('data-original', 'true');
    await expect(content).toHaveAttribute('data-original', 'true');
    await expect(background.locator('.structure')).toHaveAttribute('d', originalGeometry!);
    expect(await background.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0);
  }
  expect(externalRequests).toEqual([]);
  await page.getByRole('link', { name: 'Explore the scene' }).click();
  await expect(page).toHaveURL(/#background-content$/);
});

for (const theme of ['nasa-light', 'nasa-dark', 'reeses-light', 'reeses-dark']) {
  test(`${theme}: branded scene, mobile containment and accessibility`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${story}&globals=theme:${theme}`);
    await expect(page.getByRole('heading', { name: 'A background that belongs.' })).toBeVisible();
    const background = page.locator('ngx-background');
    await expect(background).toHaveAttribute('aria-hidden', 'true');
    await expect(background).toHaveCSS('pointer-events', 'none');
    await expect(background.locator('svg')).toHaveCSS('display', 'none');
    await expect(background.locator('.pattern')).toHaveCSS('display', 'block');
    await page.screenshot({ path: `test-results/background-${theme}-desktop.png`, fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.screenshot({ path: `test-results/background-${theme}-mobile.png`, fullPage: true });
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => {
      const { violations } = await (window as any).axe.run(document.querySelector('main'));
      return violations
        .filter((v: any) => ['serious', 'critical'].includes(v.impact))
        .map((v: any) => ({ id: v.id, nodes: v.nodes.map((n: any) => n.target) }));
    });
    expect(violations).toEqual([]);
    await page.emulateMedia({ forcedColors: 'active' });
    await expect(background).toHaveCSS('display', 'none');
  });
}

test('contained instances and explicit lattice stay independent, still and reduced motion stop the entrance', async ({
  page,
}) => {
  await page.goto(
    '/iframe.html?id=foundations-backgrounds-theme-aware--multiple-scenes&viewMode=story',
  );
  const auto = page.locator('ngx-background[data-design="theme"]');
  const lattice = page.locator('ngx-background[data-design="lattice"]');
  await expect(auto.locator('.pattern')).toHaveCSS('display', 'block');
  await expect(auto.locator('svg')).toHaveCSS('display', 'none');
  await expect(lattice.locator('.pattern')).toHaveCSS('display', 'none');
  await expect(lattice.locator('svg')).toHaveCSS('display', 'block');
  for (const item of [auto, lattice]) {
    expect((await item.boundingBox())!.height).toBe(498);
    expect(await item.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0);
  }
  await page.goto(story + '&globals=theme:nasa-dark');
  const background = page.locator('ngx-background');
  await expect(background.locator('.pattern')).toHaveCSS('display', 'block');
  const animations = await background.evaluate((el) =>
    el
      .getAnimations({ subtree: true })
      .map((animation) => (animation as CSSAnimation).animationName),
  );
  expect(animations).toHaveLength(1);
  expect(animations[0]).toContain('ngx-background-arrive');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await background.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0);
});
