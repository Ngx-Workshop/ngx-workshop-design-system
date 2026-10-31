import { expect, test } from '@playwright/test';
const workspace = '/iframe.html?id=components-action-bar--workspace&viewMode=story';

test('save transitions retain the live region and form; keyboard retry emits one intent', async ({
  page,
}) => {
  await page.goto(workspace);
  const feedback = page.locator('ngx-save-feedback');
  const live = feedback.getByRole('status');
  await expect(live).toBeAttached();
  await live.evaluate((node) => node.setAttribute('data-original', 'true'));
  const draft = page.getByLabel('Retained draft');
  await draft.fill('Unsaved local edits');
  await page.getByRole('button', { name: 'Simulate saving', exact: true }).click();
  await expect(live).toHaveText('Saving Reports…');
  await expect(live).toHaveAttribute('aria-live', 'polite');
  await expect(live).toHaveAttribute('aria-atomic', 'true');
  await page.getByRole('button', { name: 'Simulate success' }).click();
  await expect(live).toHaveText('Changes saved · Reports');
  // Lifetime belongs to the caller, even beyond the apps' former three-second timeout.
  await page.clock.install();
  await page.clock.fastForward(10000);
  await expect(live).toHaveText('Changes saved · Reports');
  await page.getByRole('button', { name: 'Simulate failure' }).click();
  await expect(live).toHaveText('Could not save Reports.');
  const retry = feedback.getByRole('button', { name: 'Retry save' });
  await retry.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByTestId('retry-count')).toHaveText('Retry requests: 1');
  await expect(live).toHaveText('Saving Reports…');
  await expect(retry).toHaveCount(0);
  await page.getByRole('button', { name: 'Clear feedback' }).click();
  await expect(live).toHaveText('');
  await expect(live).toHaveAttribute('data-original', 'true');
  await expect(draft).toHaveValue('Unsaved local edits');
});

test('sticky offset is caller-owned and can be disabled; indicators update independently', async ({
  page,
}) => {
  await page.goto(workspace);
  const bar = page.locator('ngx-action-bar');
  const indicator = bar.locator('ngx-inline-status');
  await expect(indicator).toHaveText('Unplaced destinations: —');
  await expect(indicator).toHaveAttribute('data-tone', 'neutral');
  await expect(indicator).toHaveAttribute('aria-atomic', 'true');
  await bar.getByRole('button', { name: 'New destination' }).click();
  await expect(indicator).toHaveText('1 unplaced destination');
  await expect(indicator).toHaveAttribute('data-tone', 'warning');
  await expect(indicator.locator('[aria-hidden=true]')).toHaveCount(1);
  await page.evaluate(() => scrollTo(0, 500));
  await expect
    .poll(() => bar.evaluate((node) => Math.round(node.getBoundingClientRect().top)))
    .toBe(24);
  await page.evaluate(() => scrollTo(0, 0));
  await page.getByRole('button', { name: 'Toggle sticky' }).click();
  await expect(bar).toHaveCSS('position', 'relative');
  await expect(bar).toHaveCSS('top', '0px');
});

test('wrapped feedback reports current height, stays within mobile viewport and cleans up on removal', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const Original = ResizeObserver;
    (window as any).barDisconnected = 0;
    window.ResizeObserver = class extends Original {
      private bar = false;
      override observe(target: Element, options?: ResizeObserverOptions) {
        if (target.tagName === 'NGX-ACTION-BAR') this.bar = true;
        super.observe(target, options);
      }
      override disconnect() {
        if (this.bar) (window as any).barDisconnected++;
        super.disconnect();
      }
    };
  });
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto(workspace);
  const bar = page.locator('ngx-action-bar');
  await expect(bar).toBeVisible();
  await page.getByRole('button', { name: 'Simulate saving', exact: true }).click();
  const initial = await bar.evaluate((node) => Math.ceil(node.getBoundingClientRect().height));
  await page.getByRole('button', { name: 'Toggle long name' }).click();
  await expect
    .poll(() => bar.evaluate((node) => Math.ceil(node.getBoundingClientRect().height)))
    .toBeGreaterThan(initial);
  await expect
    .poll(async () => {
      const height = await bar.evaluate((node) => Math.ceil(node.getBoundingClientRect().height));
      return (
        (await page.getByTestId('measured-height').textContent()) ===
        `Action bar height: ${height}px`
      );
    })
    .toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: '/tmp/ngx-workspace-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Toggle action bar' }).click();
  await expect(bar).toHaveCount(0);
  expect(await page.evaluate(() => (window as any).barDisconnected)).toBe(1);
  await page.getByRole('button', { name: 'Toggle action bar' }).click();
  await expect(bar).toBeVisible();
});

for (const theme of ['neon', 'light']) {
  test(`${theme}: composed feedback uses theme colors with no serious accessibility issues`, async ({
    page,
  }) => {
    await page.goto(`${workspace}&globals=theme:${theme}`);
    await page.getByRole('button', { name: 'Simulate failure' }).click();
    const feedback = page.locator('ngx-save-feedback');
    await expect(feedback).toHaveAttribute('data-state', 'error');
    expect(
      await feedback.evaluate((node) => {
        const probe = document.createElement('span');
        probe.style.color = 'var(--ngx-color-error)';
        node.append(probe);
        const match = getComputedStyle(node).color === getComputedStyle(probe).color;
        probe.remove();
        return match;
      }),
    ).toBe(true);
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => {
      const result = await (window as any).axe.run(document.querySelector('ngx-workspace-example'));
      return result.violations.filter((v: any) => ['serious', 'critical'].includes(v.impact));
    });
    expect(violations).toEqual([]);
    await page.screenshot({ path: `/tmp/ngx-workspace-${theme}.png`, fullPage: true });
  });
}

test('independent stories support localized messages and opt-in announcements', async ({
  page,
}) => {
  await page.goto('/iframe.html?id=components-save-feedback--localized&viewMode=story');
  await expect(page.getByRole('status')).toHaveText('Impossible de sauvegarder les modifications.');
  await expect(page.getByRole('button', { name: 'Réessayer' })).toBeVisible();
  await page.goto('/iframe.html?id=components-save-feedback--error&viewMode=story');
  await expect(page.getByRole('button')).toHaveCount(0);
  await page.goto('/iframe.html?id=components-inline-status--zero&viewMode=story');
  await expect(page.locator('ngx-inline-status')).toHaveText('0 MFEs in dev mode');
  await expect(page.locator('ngx-inline-status')).not.toHaveAttribute('role', 'status');
  await page.goto('/iframe.html?id=components-inline-status--warning&viewMode=story');
  await expect(page.getByRole('status')).toHaveText('2 MFEs in dev mode');
});
