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

test('connected-overlay transparent backdrops are visibly frosted in both palettes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const theme of ['neon', 'neutral']) {
    await page.goto(overview + '&globals=theme:' + theme);
    const select = page.getByRole('combobox', { name: 'Experience level' });
    await select.click();
    await expect(page.getByRole('option', { name: 'Advanced', exact: true })).toBeVisible();
    await assertGlass(page);
    await page.getByRole('option', { name: 'Advanced', exact: true }).click();
    await expect(select).toContainText('Advanced');
    await expect(page.locator(activeBackdrop)).toHaveCount(0);
  }
});

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
