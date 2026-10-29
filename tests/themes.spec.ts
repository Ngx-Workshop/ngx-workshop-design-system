import { test, expect } from '@playwright/test';

const overview = '/iframe.html?id=start-here-workshop-frequency--overview&viewMode=story';
const palettes = {
  light: { primary: '#006b70', surface: '#edf2f7', scheme: 'light' },
  'amber-light': { primary: '#8a5200', surface: '#f7efdf', scheme: 'light' },
  amber: { primary: '#ffb547', surface: '#22251d', scheme: 'dark' },
  'teal-light': { primary: '#006e70', surface: '#f7eddf', scheme: 'light' },
  'teal-dark': { primary: '#24d6ce', surface: '#191e35', scheme: 'dark' },
  'nasa-light': { primary: '#0032a0', surface: '#f4f6fa', scheme: 'light' },
  'nasa-dark': { primary: '#92b9ff', surface: '#10131a', scheme: 'dark' },
  'reeses-light': { primary: '#a83e00', surface: '#fff0d9', scheme: 'light' },
  'reeses-dark': { primary: '#ff5d00', surface: '#2f1c0b', scheme: 'dark' },
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
        ['primary', 'canvas'],
        ['secondary', 'canvas'],
        ['error', 'canvas'],
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
      if (css.colorScheme === 'light') {
        pairs.push(
          ['text', 'surface-high'],
          ['muted', 'surface-high'],
          ['primary', 'surface-highest'],
        );
      }
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
    if (theme.startsWith('nasa-')) {
      await expect(dialog.locator('[mat-dialog-title]')).toHaveCSS('font-family', /Inter/);
      await expect(dialog.locator('mat-dialog-content')).toHaveCSS('font-family', /Public Sans/);
    }
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

for (const theme of ['nasa-light', 'nasa-dark']) {
  test(`${theme}: bundled typography, grid insignia and theme reset`, async ({ page }) => {
    const externalRequests: string[] = [];
    page.on('request', (request) => {
      if (!request.url().startsWith('http://127.0.0.1:6007') && !request.url().startsWith('data:'))
        externalRequests.push(request.url());
    });
    await page.goto(
      `/iframe.html?id=foundations-nasa--${theme === 'nasa-light' ? 'light' : 'dark'}&viewMode=story&globals=theme:${theme}`,
    );
    const grid = page.locator('ngx-panel[data-background="grid"]');
    await expect(grid.getByText('Mission overview')).toBeVisible();
    const fonts = await page.evaluate(async () => {
      await Promise.all([
        document.fonts.load('700 32px Inter'),
        document.fonts.load('400 16px "Public Sans"'),
        document.fonts.load('500 12px "DM Mono"'),
      ]);
      return [...document.fonts]
        .filter((font) => font.status === 'loaded')
        .map((font) => font.family.replaceAll('"', ''));
    });
    expect(fonts).toEqual(expect.arrayContaining(['Inter', 'Public Sans', 'DM Mono']));
    await expect(page.locator('main h1')).toHaveCSS('font-family', /Inter/);
    await expect(page.locator('body')).toHaveCSS('font-family', /Public Sans/);
    await expect(grid.locator('mat-card-title')).toHaveCSS('font-family', /Inter/);
    await expect(grid.locator('mat-card-subtitle')).toHaveCSS('font-family', /DM Mono/);
    const background = (surface: string) =>
      page
        .locator(`ngx-panel[data-background="${surface}"] .frame`)
        .evaluate((el) => getComputedStyle(el, '::after').backgroundImage);
    expect(await background('grid')).toContain('data:image/svg+xml');
    expect(await background('solid')).toBe('none');
    expect(await background('glass')).toBe('none');
    const pattern = await grid.locator('.frame').evaluate((el) => {
      const css = getComputedStyle(el);
      const image = css.getPropertyValue('--ngx-panel-grid-image');
      const source = decodeURIComponent(
        image.slice(image.indexOf('data:image/svg+xml,') + 19).replace(/["')]+$/, ''),
      );
      const tile = new DOMParser().parseFromString(source, 'image/svg+xml');
      return {
        lineColor: css.getPropertyValue('--ngx-panel-grid-color').trim(),
        size: getComputedStyle(el, '::after').backgroundSize,
        opacity: Number(tile.querySelector('g[opacity]')?.getAttribute('opacity')),
        rows: [...tile.querySelectorAll('use')].map((use) => [
          Number(use.getAttribute('x')),
          Number(use.getAttribute('y')),
        ]),
      };
    });
    expect(pattern.lineColor).toBe('transparent');
    expect(pattern.size).toContain('144px 240px');
    expect(pattern.opacity).toBe(theme === 'nasa-light' ? 0.14 : 0.18);
    expect(pattern.rows).toEqual([
      [28, 23],
      [-44, 143],
      [100, 143],
    ]);
    const glass = page.locator('ngx-panel[data-background="glass"]');
    const glassStyle = await glass.locator('.frame').evaluate((el) => ({
      blur: getComputedStyle(el, '::after').backdropFilter,
      opacity: getComputedStyle(el).getPropertyValue('--ngx-panel-glass-opacity').trim(),
    }));
    expect(glassStyle.blur).toContain('blur(16px)');
    expect(glassStyle.opacity).toBe(theme === 'nasa-light' ? '45%' : '65%');
    const frosted = await glass.screenshot();
    const noBlur = await page.addStyleTag({
      content:
        'ngx-panel[data-background="glass"] .frame::after { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }',
    });
    const unfiltered = await glass.screenshot();
    expect(
      Buffer.compare(frosted, unfiltered),
      'Blur must visibly change the rendered backdrop',
    ).not.toBe(0);
    await noBlur.evaluate((el) => el.remove());

    expect(externalRequests).toEqual([]);
    await page.screenshot({ path: `test-results/${theme}-brand.png`, fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.screenshot({ path: `test-results/${theme}-brand-mobile.png`, fullPage: true });
    await page.evaluate(() => document.documentElement.setAttribute('data-ngx-theme', 'neon'));
    await expect(page.locator('main h1')).not.toHaveCSS('font-family', /Inter/);
    await expect(page.locator('body')).not.toHaveCSS('font-family', /Public Sans/);
    expect(await background('grid')).not.toContain('data:image/svg+xml');
  });
}
