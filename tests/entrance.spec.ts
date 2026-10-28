import { expect, test } from '@playwright/test';
const story = '/iframe.html?id=components-entrance--staged&viewMode=story';

test('growth finishes with natural sizing and keeps the original form node', async ({ page }) => {
  await page.goto(story);
  const growth = page.getByTestId('growth');
  await growth.waitFor();
  const input = page.getByLabel('Draft');
  await input.evaluate((node) => node.setAttribute('data-original', 'true'));
  await expect.poll(() => growth.evaluate((node) => node.getAnimations().length)).toBe(0);
  await expect(growth).toHaveCSS('overflow', 'visible');
  await expect(input).toHaveAttribute('data-original', 'true');
  await expect(input).toHaveValue('Retained draft');
});

test('keyboard focus cancels growth and reveal without hiding controls', async ({ page }) => {
  await page.goto(story);
  const growth = page.getByTestId('growth');
  await growth.waitFor();
  await page.getByLabel('Draft').focus();
  await expect.poll(() => growth.evaluate((node) => node.getAnimations().length)).toBe(0);
  await expect(page.getByTestId('reveal')).toHaveCSS('opacity', '1');
  await expect(growth).toHaveCSS('overflow', 'visible');
});

test('resize, preference changes and removal cancel active animations', async ({ page }) => {
  await page.goto(story);
  const growth = page.getByTestId('growth');
  await growth.waitFor();
  await page.setViewportSize({ width: 800, height: 600 });
  await expect.poll(() => growth.evaluate((node) => node.getAnimations().length)).toBe(0);
  await page.getByRole('button', { name: 'Toggle entrance' }).click();
  await page.getByRole('button', { name: 'Toggle entrance' }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => growth.evaluate((node) => node.getAnimations().length)).toBe(0);
  await page.getByRole('button', { name: 'Toggle entrance' }).click();
  await expect(growth).toHaveCount(0);
});

test('reduced motion renders immediately and public mixins theme real controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(story);
  const growth = page.getByTestId('growth');
  await growth.waitFor();
  expect(await growth.evaluate((node) => node.getAnimations({ subtree: true }).length)).toBe(0);
  await expect(page.getByTestId('reveal')).toHaveCSS('opacity', '1');
  const toggle = page.getByRole('switch');
  await toggle.click();
  await expect(toggle).toBeChecked();
  const colors = await page.locator('mat-slide-toggle').evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      track: style.getPropertyValue('--mat-slide-toggle-selected-track-color').trim(),
      warning: style.getPropertyValue('--ngx-color-warning').trim(),
    };
  });
  expect(colors.track).toBe(colors.warning);
  expect(colors.track).not.toBe('');
  await page.getByRole('button', { name: 'Integration options' }).click();
  await expect(page.getByText('Material retains expansion and focus behavior.')).toBeVisible();
  await page.screenshot({ path: '/tmp/ngx-motion-material-policy.png', fullPage: true });
});


test('destroying an entering view cancels its animations', async ({ page }) => {
  await page.goto(story);
  const growth = page.getByTestId('growth');
  await growth.waitFor();
  const animation = await growth.evaluateHandle((node) => {
    const current = node.getAnimations()[0];
    if (!current) throw new Error('Expected an active entrance');
    current.pause();
    return current;
  });
  await page.getByRole('button', { name: 'Toggle entrance' }).click();
  await expect(growth).toHaveCount(0);
  expect(await animation.evaluate((current) => current.playState)).toBe('idle');
  await animation.dispose();
});
