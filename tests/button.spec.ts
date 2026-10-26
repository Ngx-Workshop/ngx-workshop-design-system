import { test, expect } from '@playwright/test';
const url = (story = 'scan-command', theme = 'neon') =>
  `/iframe.html?id=components-button-interaction-lab--${story}&viewMode=story&globals=theme:${theme}`;

test('six button silhouettes preserve label, hit area and keyboard focus', async ({ page }) => {
  await page.goto(url('shapes'));
  const filled = page.locator('button[ngxButton][data-ngx-surface="filled"]');
  await expect(filled).toHaveCount(6);
  const paths = await filled.evaluateAll((els) =>
    els.map(
      (el) => getComputedStyle(el.querySelector('.ngx-button-decoration')!, '::before').clipPath,
    ),
  );
  expect(new Set(paths).size).toBe(6);
  expect(paths.every((p) => p.startsWith('polygon('))).toBe(true);
  const button = page.getByRole('button', { name: 'Notched command', exact: true });
  await button.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(button).toBeFocused();
  const style = await button.evaluate((el) => ({
    clip: getComputedStyle(el).clipPath,
    outline: getComputedStyle(el).outlineStyle,
    width: getComputedStyle(el).outlineWidth,
  }));
  expect(style.clip).toBe('none');
  expect(style.outline).toBe('solid');
  expect(parseFloat(style.width)).toBeGreaterThanOrEqual(2);
  await expect(button.locator('.ngx-button-decoration')).toHaveAttribute('aria-hidden', 'true');
});

test('pointer, Enter and Space each activate once; click animations cancel and replay', async ({
  page,
}) => {
  await page.goto(url());
  const button = page.locator('.button-stage button');
  await button.evaluate((el) =>
    (el as HTMLElement).style.setProperty('--ngx-button-press-duration', '1000ms'),
  );
  await button.click();
  await expect(page.locator('.event-console>span')).toHaveText('001 ACTIVATIONS');
  expect(
    await button.evaluate(
      (el) => el.getAnimations().filter((a) => a.id === 'ngx-button-press').length,
    ),
  ).toBe(1);
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.event-console>span')).toHaveText('002 ACTIVATIONS');
  expect(
    await button.evaluate(
      (el) => el.getAnimations().filter((a) => a.id === 'ngx-button-press').length,
    ),
  ).toBe(1);
  await page.keyboard.press('Space');
  await expect(page.locator('.event-console>span')).toHaveText('003 ACTIVATIONS');
  await expect
    .poll(() =>
      button.evaluate((el) => el.getAnimations().filter((a) => a.id === 'ngx-button-press').length),
    )
    .toBe(0);
});

test('scan and glitch hover/focus effects run; pulse hover lifts the control', async ({ page }) => {
  for (const [story, animation] of [
    ['scan-command', 'ngx-button-scan'],
    ['glitch-command', 'ngx-button-glitch'],
  ]) {
    await page.goto(url(story));
    const button = page.locator('.button-stage button');
    await button.evaluate((el) =>
      el.addEventListener('animationstart', (event) =>
        el.setAttribute('data-test-animation', (event as AnimationEvent).animationName),
      ),
    );
    await button.hover();
    await expect(button).toHaveAttribute('data-test-animation', animation);
    await page.mouse.move(0, 0);
    await button.evaluate((el) => el.removeAttribute('data-test-animation'));
    await button.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(button).toHaveAttribute('data-test-animation', animation);
    await expect(button).toBeFocused();
  }
  await page.goto(url('pulse-command'));
  const pulse = page.locator('.button-stage button');
  await pulse.hover();
  await expect.poll(() => pulse.evaluate((el) => getComputedStyle(el).transform)).not.toBe('none');
});

test('disabled/loading states cannot activate or animate; motion none and reduced motion retain activation', async ({
  page,
}) => {
  for (const story of ['disabled', 'loading']) {
    await page.goto(url(story));
    const button = page.locator('.button-stage button');
    await expect(button).toBeDisabled();
    await button.evaluate((el) => (el as HTMLButtonElement).click());
    await expect(page.locator('.event-console>span')).toHaveText('000 ACTIVATIONS');
    if (story === 'disabled') {
      const link = page.locator('.reference-states a');
      await expect(link).toHaveAttribute('aria-disabled', 'true');
      await link.evaluate((el) => (el as HTMLAnchorElement).click());
      await expect(page).not.toHaveURL(/#button-destination$/);
      await expect(page.locator('.event-console>span')).toHaveText('000 ACTIVATIONS');
    }
    expect(
      await button.evaluate(
        (el) => el.getAnimations().filter((a) => a.id === 'ngx-button-press').length,
      ),
    ).toBe(0);
  }
  await page.goto(url('no-motion'));
  const noMotion = page.locator('.button-stage button');
  await noMotion.click();
  expect(
    await noMotion.evaluate(
      (el) => el.getAnimations().filter((a) => a.id === 'ngx-button-press').length,
    ),
  ).toBe(0);
  await expect(page.locator('.event-console>span')).toHaveText('001 ACTIVATIONS');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(url('glitch-command'));
  const reduced = page.locator('.button-stage button');
  await reduced.click();
  await expect(page.locator('.event-console>span')).toHaveText('001 ACTIVATIONS');
  expect(
    await reduced.evaluate(
      (el) => el.getAnimations().filter((a) => a.id === 'ngx-button-press').length,
    ),
  ).toBe(0);
  expect(await reduced.evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
});

test('native anchor navigation and form submission remain intact', async ({ page }) => {
  await page.goto(url());
  const link = page.getByRole('link', { name: 'Open resources ↗' });
  await link.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#button-destination$/);
  await expect(page.locator('.event-console>span')).toHaveText('001 ACTIVATIONS');
  await page.getByRole('button', { name: 'Submit configuration' }).click();
  await expect(page.getByRole('status')).toContainText('Configuration submitted locally');
});

test('surface/tone matrix has readable contrast in both palettes; glass is actually blurred', async ({
  page,
}) => {
  for (const theme of ['neon', 'neutral']) {
    await page.goto(url('surfaces', theme));
    await expect(page.locator('button[ngxButton]')).toHaveCount(9);
    const glass = page.locator(
      'button[data-ngx-tone="primary"][data-ngx-surface="glass"] .ngx-button-decoration',
    );
    expect(await glass.evaluate((el) => getComputedStyle(el, '::after').backdropFilter)).toContain(
      'blur(12px)',
    );
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => {
      const result = await (window as any).axe.run(document.body);
      return result.violations
        .filter((v: any) => ['serious', 'critical'].includes(v.impact))
        .map((v: any) => ({
          id: v.id,
          nodes: v.nodes.map((n: any) => ({ target: n.target, summary: n.failureSummary })),
        }));
    });
    expect(violations, theme).toEqual([]);
  }
});

test('button lab and galleries fit a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const story of ['scan-command', 'shapes', 'surfaces']) {
    await page.goto(url(story));
    await expect(page.locator('button[ngxButton]').first()).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      story,
    ).toBe(true);
  }
});

// Public tokens suppress Material's rectangular hover/ripple; only owned art glows.
test('hover feedback follows every silhouette without painting rectangular corners', async ({
  page,
}) => {
  await page.goto(url('shapes'));
  for (const button of await page.locator('button[ngxButton]').all()) {
    await button.hover();
    await expect
      .poll(() =>
        button.locator('.ngx-button-decoration').evaluate((el) => getComputedStyle(el).filter),
      )
      .toContain('drop-shadow');
    const style = await button.evaluate((el) => {
      const css = getComputedStyle(el);
      return {
        shadow: css.boxShadow,
        background: css.backgroundColor,
        state: css.getPropertyValue('--mat-button-filled-state-layer-color').trim(),
        ripple: css.getPropertyValue('--mat-button-filled-ripple-color').trim(),
        clip: css.clipPath,
      };
    });
    expect(style).toEqual({
      shadow: 'none',
      background: 'rgba(0, 0, 0, 0)',
      state: 'transparent',
      ripple: 'transparent',
      clip: 'none',
    });
  }
});
