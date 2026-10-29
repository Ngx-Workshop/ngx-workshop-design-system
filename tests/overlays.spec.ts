import { test, expect } from '@playwright/test';
const overview = '/iframe.html?id=start-here-workshop-frequency--overview&viewMode=story';
const activeBackdrop = '.cdk-overlay-backdrop.cdk-overlay-backdrop-showing';
async function assertGlass(page: import('@playwright/test').Page) {
  const backdrop = page.locator(activeBackdrop).last();
  await expect(backdrop).toBeVisible();
  const style = await backdrop.evaluate((el) => ({
    filter: getComputedStyle(el).backdropFilter,
    opacity: getComputedStyle(el).opacity,
    color: getComputedStyle(el).backgroundColor,
  }));
  expect(style.filter).toContain('blur(12px)');
  expect(style.filter).toContain('saturate(1.2)');
  expect(Number(style.opacity)).toBeGreaterThan(0);
  expect(style.color).not.toBe('rgba(0, 0, 0, 0)');
}

test('overview previews glass dialog and share sheet with dismissal, result and focus restoration', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(overview);
  const dialogTrigger = page.getByRole('button', { name: 'Preview glass dialog' });
  await dialogTrigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await assertGlass(page);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(dialogTrigger).toBeFocused();
  await page.getByRole('button', { name: 'Preview share sheet' }).click();
  await expect(page.getByRole('heading', { name: 'Take the signal with you.' })).toBeVisible();
  await assertGlass(page);
  await page.getByRole('button', { name: 'Export JSON', exact: true }).click();
  await expect(page.locator('.overlay-feedback')).toHaveText('JSON export selected');
  await expect(page.getByRole('button', { name: 'Preview share sheet' })).toBeFocused();
  await dialogTrigger.click();
  await assertGlass(page);
  await page
    .locator(activeBackdrop)
    .last()
    .click({ position: { x: 10, y: 10 } });
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(dialogTrigger).toBeFocused();
});

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
];

for (const theme of themes) {
  test(`${theme}: selects and menus keep transparent dismissal backdrops`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const kind of ['select', 'menu']) {
      await page.goto(
        `/iframe.html?id=${kind === 'select' ? 'material-forms-select' : 'material-navigation-menu'}--default&viewMode=story&globals=theme:${theme}`,
      );
      const trigger =
        kind === 'select'
          ? page.getByRole('combobox', { name: 'Experience level' })
          : page.getByRole('button', { name: 'Workshop actions' });
      await trigger.click();
      const backdrop = page.locator(activeBackdrop);
      await expect(backdrop).toHaveCount(1);
      const styles = await backdrop.evaluate((el) => ({
        color: getComputedStyle(el).backgroundColor,
        filter: getComputedStyle(el).backdropFilter,
        opacity: getComputedStyle(el).opacity,
      }));
      expect(styles.filter).toBe('none');
      expect(styles.color === 'rgba(0, 0, 0, 0)' || Number(styles.opacity) === 0).toBe(true);
      if (theme === 'light' && kind === 'select') {
        await page
          .getByRole('option', { name: 'Advanced', exact: true })
          .waitFor({ state: 'visible' });
        await page.screenshot({ path: 'test-results/light-select-transparent-backdrop.png' });
      }
      if (kind === 'select') {
        await page.getByRole('option', { name: 'Advanced', exact: true }).click();
        await expect(trigger).toContainText('Advanced');
      } else {
        await page.getByRole('menuitem', { name: 'Export', exact: true }).click();
        await page.getByRole('menuitem', { name: 'JSON', exact: true }).click();
        await expect(page.getByRole('status')).toContainText('JSON export selected');
      }
      await expect(page.locator(activeBackdrop)).toHaveCount(0);
      await expect(trigger).toBeFocused();
      if (kind === 'menu') {
        await trigger.press('Enter');
        const item = page.getByRole('menuitem', { name: 'Open workshop' });
        await expect(item).toBeFocused();
        await item.press('Escape');
      } else {
        await trigger.click();
        await page
          .getByRole('option', { name: 'Advanced', exact: true })
          .waitFor({ state: 'visible' });
        await trigger.press('Escape');
      }
      await expect(trigger).toBeFocused();
      await trigger.click();
      await page.locator(activeBackdrop).click({ position: { x: 1, y: 1 } });
      await expect(page.locator(activeBackdrop)).toHaveCount(0);
    }
  });
}

for (const theme of ['light', 'amber-light', 'teal-light', 'nasa-light', 'reeses-light']) {
  test(`${theme}: modal scrim is dark and canvas, surface and panel layers differ`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(overview + '&globals=theme:' + theme);
    const depth = await page
      .locator('ngx-panel[data-background="grid"] .frame')
      .first()
      .evaluate((el) => {
        const css = getComputedStyle(el);
        const token = (name: string) => css.getPropertyValue(`--ngx-color-${name}`).trim();
        return {
          canvas: token('canvas'),
          surface: token('surface'),
          high: token('surface-high'),
          panel: getComputedStyle(el, '::after').backgroundColor,
          expectedPanel: `rgb(${token('surface-high')
            .slice(1)
            .match(/../g)!
            .map((v) => parseInt(v, 16))
            .join(', ')})`,
          lowRole: css.getPropertyValue('--mat-sys-surface-container-low').trim(),
          highRole: css.getPropertyValue('--mat-sys-surface-container-high').trim(),
        };
      });
    expect(new Set([depth.canvas, depth.surface, depth.high]).size).toBe(3);
    expect(depth.lowRole).not.toBe(depth.highRole);
    expect(depth.highRole).toBe(depth.high);
    expect(depth.panel).toBe(depth.expectedPanel);
    await page.getByRole('button', { name: 'Open a dialog', exact: true }).click();
    await assertGlass(page);
    expect(
      await page.locator(activeBackdrop).evaluate((el) => getComputedStyle(el).backgroundColor),
    ).toBe('color(srgb 0.0235294 0.027451 0.0784314 / 0.55)');
    if (theme === 'light')
      await page.screenshot({ path: 'test-results/light-modal-dark-scrim.png' });
    await page.keyboard.press('Escape');
    const session = await page.context().newCDPSession(page);
    await session.send('Emulation.setEmulatedMedia', {
      features: [
        { name: 'prefers-reduced-transparency', value: 'reduce' },
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ],
    });
    await page.getByRole('button', { name: 'Open a dialog', exact: true }).click();
    expect(
      await page.locator(activeBackdrop).evaluate((el) => getComputedStyle(el).backgroundColor),
    ).toBe('rgb(6, 7, 20)');
    await page.keyboard.press('Escape');
    await page.getByRole('combobox', { name: 'Experience level' }).click();
    expect(
      await page.locator(activeBackdrop).evaluate((el) => getComputedStyle(el).backdropFilter),
    ).toBe('none');
    await expect(page.locator(activeBackdrop)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await page.keyboard.press('Escape');
  });
}

test('reduced transparency uses a solid fallback without blur', async ({ page }) => {
  const session = await page.context().newCDPSession(page);
  await session.send('Emulation.setEmulatedMedia', {
    features: [
      { name: 'prefers-reduced-transparency', value: 'reduce' },
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ],
  });
  await page.goto(overview);
  expect(
    await page.evaluate(() => matchMedia('(prefers-reduced-transparency: reduce)').matches),
  ).toBe(true);
  await page.getByRole('button', { name: 'Open a dialog', exact: true }).click();
  const backdrop = page.locator(activeBackdrop).last();
  await expect(backdrop).toBeVisible();
  expect(await backdrop.evaluate((el) => getComputedStyle(el).backdropFilter)).toBe('none');
  expect(await backdrop.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(
    'rgb(6, 7, 20)',
  );
});

test('overview demonstrates current panel, button and code treatments and switches surfaces', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(overview);
  const preview = page.locator('.glass-experiment ngx-panel');
  await expect(preview).toHaveAttribute('data-background', 'glass');
  await page.getByRole('button', { name: 'solid', exact: true }).click();
  await expect(preview).toHaveAttribute('data-background', 'solid');
  await page.getByRole('button', { name: 'grid', exact: true }).click();
  await expect(preview).toHaveAttribute('data-background', 'grid');
  await page.getByRole('button', { name: 'glass', exact: true }).click();
  await expect(preview).toHaveAttribute('data-background', 'glass');
  await expect(page.locator('.component-grid ngx-panel[data-shape="stepped"]')).toBeVisible();
  await expect(page.locator('.hero-actions a[ngxButton]')).toHaveAttribute(
    'data-ngx-shape',
    'chamfered',
  );
  await expect(page.locator('ngx-code-block .ngx-syntax-keyword').first()).toBeVisible();
});

test('forced colors leave connected dismissal backdrops transparent and unfiltered', async ({
  page,
}) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.goto(
    '/iframe.html?id=material-forms-select--default&viewMode=story&globals=theme:light',
  );
  await page.getByRole('combobox', { name: 'Experience level' }).click();
  await expect(page.locator(activeBackdrop)).toHaveCSS(
    'background-color',
    /^rgba\(\d+, \d+, \d+, 0\)$/,
  );
  await expect(page.locator(activeBackdrop)).toHaveCSS('backdrop-filter', 'none');
  await page.getByRole('option', { name: 'Advanced', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Experience level' })).toContainText('Advanced');
});
