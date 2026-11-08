import { expect, test } from '@playwright/test';
const story = '/iframe.html?id=components-responsive-density--workspace&viewMode=story';

for (const width of [390, 599, 600, 768, 951, 1024, 1366, 1367]) {
  test(`workspace density at ${width}px retains usable actions and contains content`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 585 });
    await page.goto(story);
    const compact = width >= 600 && width <= 1366;
    const bar = page.locator('ngx-action-bar');
    const toggle = bar.getByRole('button', { name: 'Toggle panel actions' });
    await expect(toggle).toHaveCSS('height', compact ? '40px' : '52px');
    await expect(toggle).toHaveCSS('padding-left', compact ? '20px' : '30px');
    await expect(toggle).toHaveCSS('font-size', compact ? '12px' : '14px');
    await expect(bar.locator('ngx-inline-status')).toHaveCSS(
      'font-size',
      compact ? '11px' : '12px',
    );
    await expect(bar.locator('ngx-save-feedback')).toHaveCSS(
      'font-size',
      compact ? '12px' : '12.8px',
    );
    const frame = page.locator('ngx-panel .frame').first();
    await expect(frame).toHaveCSS('padding-top', compact ? '14px' : '18px');
    await expect(page.locator('ngx-panel mat-card-title').first()).toHaveCSS(
      'font-size',
      compact ? '16px' : '18.4px',
    );
    // Missing slots, nested missing slots and an empty marked wrapper all collapse.
    const actions = page.locator('mat-card-actions');
    await expect(actions).toHaveCount(3);
    for (const action of await actions.all()) await expect(action).toBeHidden();
    const live = bar.getByRole('status');
    await live.evaluate((node) => node.setAttribute('data-original', 'true'));
    await toggle.focus();
    await page.keyboard.press('Enter');
    const save = page.getByRole('button', { name: 'Save remote' });
    await expect(save).toBeVisible();
    await save.focus();
    await page.keyboard.press('Enter');
    await expect(live).toHaveText('Changes saved · Seed MFE');
    await expect(live).toHaveAttribute('data-original', 'true');
    await toggle.click();
    await expect(save).toHaveCount(0);
    for (const action of await actions.all()) await expect(action).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}

test('density follows resize and restores desktop sizes', async ({ page }) => {
  await page.setViewportSize({ width: 1512, height: 982 });
  await page.goto(story);
  const button = page.getByRole('button', { name: 'Toggle panel actions' });
  await expect(button).toHaveCSS('height', '52px');
  await page.setViewportSize({ width: 951, height: 585 });
  await expect(button).toHaveCSS('height', '40px');
  await page.setViewportSize({ width: 1512, height: 982 });
  await expect(button).toHaveCSS('height', '52px');
});
