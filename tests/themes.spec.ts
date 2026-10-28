import { test, expect } from '@playwright/test';

const overview = '/iframe.html?id=start-here-workshop-frequency--overview&viewMode=story';
const palettes = {
  light: { primary: '#006b70', surface: '#ffffff', scheme: 'light' },
  'amber-light': { primary: '#8a5200', surface: '#fffdf6', scheme: 'light' },
  amber: { primary: '#ffb547', surface: '#22251d', scheme: 'dark' },
  'teal-light': { primary: '#007577', surface: '#fffcf5', scheme: 'light' },
  'teal-dark': { primary: '#24d6ce', surface: '#191e35', scheme: 'dark' },
  'nasa-light': { primary: '#0b3d91', surface: '#ffffff', scheme: 'light' },
  'nasa-dark': { primary: '#8bbcff', surface: '#111e32', scheme: 'dark' },
  'reeses-light': { primary: '#b94700', surface: '#fffcf5', scheme: 'light' },
  'reeses-dark': { primary: '#ff8618', surface: '#2c1b13', scheme: 'dark' },
};

for (const [theme, palette] of Object.entries(palettes)) {
  test(`${theme}: scheme, Material roles, contrast, overlays and mobile`, async ({ page }) => {
    await page.goto(`${overview}&globals=theme:${theme}`);
    await expect(page.getByRole('heading', { name: 'Interface the future' })).toBeVisible();
    const styles = await page.locator('html').evaluate((el) => {
      const css = getComputedStyle(el);
      const token = (name: string) => css.getPropertyValue(name).trim();
      const pairs = [
        ['text', 'canvas'],
        ['text', 'surface'],
        ['muted', 'canvas'],
        ['muted', 'surface'],
        ['primary', 'surface'],
        ['secondary', 'surface'],
        ['success', 'surface'],
        ['warning', 'surface'],
        ['error', 'surface'],
        ['on-primary', 'primary'],
        ['on-secondary', 'secondary'],
        ['on-danger', 'danger'],
        ['on-error', 'error'],
        ['on-secondary', 'violet'],
      ];
      const luminance = (hex: string) => {
        const rgb = hex
          .slice(1)
          .match(/../g)!
          .map((v) => parseInt(v, 16) / 255)
          .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
        return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
      };
      return {
        scheme: css.colorScheme,
        primary: token('--mat-sys-primary'),
        surface: token('--mat-sys-surface'),
        onError: token('--mat-sys-on-error'),
        expectedOnError: token('--ngx-color-on-error'),
        fixed: token('--mat-sys-primary-fixed'),
        code: token('--ngx-code-background'),
        contrast: pairs.map(([fg, bg]) => {
          const a = luminance(token(`--ngx-color-${fg}`));
          const b = luminance(token(`--ngx-color-${bg}`));
          return { pair: `${fg}/${bg}`, ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) };
        }),
      };
    });
    expect(styles.scheme).toBe(palette.scheme);
    expect(styles.primary).toBe(palette.primary);
    expect(styles.fixed).toBe(palette.primary);
    expect(styles.surface).toBe(palette.surface);
    expect(styles.onError).toBe(styles.expectedOnError);
    expect(styles.code).toBe('#262335');
    for (const { pair, ratio } of styles.contrast) expect(ratio, pair).toBeGreaterThanOrEqual(4.5);

    await page.getByRole('button', { name: 'Open a dialog' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    expect(
      await dialog.evaluate((el) =>
        getComputedStyle(el).getPropertyValue('--mat-sys-surface').trim(),
      ),
    ).toBe(palette.surface);
    await page.keyboard.press('Escape');
    await page.getByRole('combobox', { name: 'Experience level' }).click();
    const option = page.getByRole('option', { name: 'Advanced' });
    await expect(option).toBeVisible();
    expect(
      await option.evaluate((el) =>
        getComputedStyle(el).getPropertyValue('--mat-sys-primary').trim(),
      ),
    ).toBe(palette.primary);
    await page.keyboard.press('Escape');
    await expect(option).not.toBeVisible();
    await expect(page.locator('.cdk-overlay-pane')).toHaveCount(0);
    await page.screenshot({ path: `test-results/theme-${theme}-desktop.png`, fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.screenshot({ path: `test-results/theme-${theme}-mobile.png`, fullPage: true });
  });
}

test('showcase cycles all palettes and restores Neon', async ({ page }) => {
  await page.goto(overview);
  await expect(page.getByRole('button', { name: 'Switch palette' })).toBeVisible();
  for (const theme of [
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
  ]) {
    await page.getByRole('button', { name: 'Switch palette' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-ngx-theme', theme);
  }
  expect(await page.locator('html').evaluate((el) => getComputedStyle(el).colorScheme)).toBe(
    'dark',
  );
});

test('Storybook toolbar selects all added themes and restores Neon', async ({ page }) => {
  await page.goto('/?path=/story/start-here-workshop-frequency--overview');
  let current = 'Neon / Workshop';
  for (const [title, value] of [
    ['Light / Daylight', 'light'],
    ['Amber / Dawn', 'amber-light'],
    ['Amber / Dusk', 'amber'],
    ['Teal / Light', 'teal-light'],
    ['Teal / Dark', 'teal-dark'],
    ['NASA / Light', 'nasa-light'],
    ['NASA / Dark', 'nasa-dark'],
    ['Reese’s / Light', 'reeses-light'],
    ['Reese’s / Dark', 'reeses-dark'],
    ['Neon / Workshop', 'neon'],
  ]) {
    await page.getByRole('button', { name: new RegExp(current) }).click();
    await page.getByText(title, { exact: true }).click();
    await expect(page.frameLocator('#storybook-preview-iframe').locator('html')).toHaveAttribute(
      'data-ngx-theme',
      value,
    );
    current = title;
  }
});
