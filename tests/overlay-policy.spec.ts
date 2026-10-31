import { expect, test, type Locator } from '@playwright/test';
const story = '/iframe.html?id=foundations-overlay-policy--native-overlays&viewMode=story';

async function finishEntrance(panel: Locator) {
  await panel.evaluate(async (node) => {
    node.getAnimations().forEach((animation) => animation.finish());
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  });
}

for (const dismissal of ['selection', 'outside click', 'Escape']) {
  test(`marked select retains its final closing frame on ${dismissal}, detaches and reopens`, async ({
    page,
  }) => {
    await page.goto(story);
    const trigger = page.getByRole('combobox', { name: 'Domain', exact: true });
    await trigger.click();
    const panel = page.getByRole('listbox');
    await expect(panel).toHaveClass(/ngx-select-panel/);
    await expect(panel).toHaveClass(/overlay-policy-example__domain/);
    await finishEntrance(panel);
    const result = await panel.evaluate((node, dismissal) => {
      if (dismissal === 'selection')
        (node.querySelectorAll('mat-option')[1] as HTMLElement).click();
      else if (dismissal === 'outside click')
        document.querySelector<HTMLElement>('.cdk-overlay-backdrop')!.click();
      else
        node.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }),
        );
      const animation = node
        .getAnimations()
        .find((a) => a instanceof CSSAnimation && a.animationName === '_mat-select-exit');
      if (!animation) throw new Error('Expected real Material exit animation');
      animation.finish();
      return { opacity: getComputedStyle(node).opacity, connected: node.isConnected };
    }, dismissal);
    expect(result.connected).toBe(true);
    expect(result.opacity).toBe('0');
    await expect(panel).toHaveCount(0);
    await expect(trigger).toContainText(dismissal === 'selection' ? 'Workshop' : 'Admin');
    await expect(trigger).toBeFocused();
    await trigger.click();
    await finishEntrance(page.getByRole('listbox'));
    await expect(page.getByRole('listbox')).toHaveCSS('opacity', '1');
    await trigger.press('Escape');
    await expect(panel).toHaveCount(0);
  });
}

test('unmarked select demonstrates the underlying flash; the opt-in policy fixes the same native control', async ({
  page,
}) => {
  await page.goto(story);
  await page.getByRole('combobox', { name: 'Unmarked comparison' }).click();
  const panel = page.getByRole('listbox');
  await expect(panel).not.toHaveClass(/ngx-select-panel/);
  await finishEntrance(panel);
  const opacity = await panel.evaluate((node) => {
    node.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
    const exit = node
      .getAnimations()
      .find((a) => a instanceof CSSAnimation && a.animationName === '_mat-select-exit');
    if (!exit) throw new Error('Expected real Material exit animation');
    exit.finish();
    return getComputedStyle(node).opacity;
  });
  // Regression sensitivity: without the marker, the completed native fade returns to 1.
  expect(opacity).toBe('1');
  await expect(panel).toHaveCount(0);
});

for (const theme of ['neon', 'light']) {
  test(`${theme}: detached native overlays inherit scheme and tokens, preserving dismissal and focus`, async ({
    page,
  }) => {
    await page.goto(
      `${story.replace('--native-overlays', '--container-overlays')}&globals=theme:${theme}`,
    );
    await page.getByRole('combobox', { name: 'Domain', exact: true }).click();
    const panel = page.getByRole('listbox');
    expect(
      await panel.evaluate((node) => {
        const css = getComputedStyle(node);
        const root = getComputedStyle(document.documentElement);
        return {
          detached: !node.closest('ngx-overlay-policy-example'),
          scheme: css.colorScheme,
          primary: css.getPropertyValue('--mat-sys-primary').trim(),
          rootPrimary: root.getPropertyValue('--mat-sys-primary').trim(),
        };
      }),
    ).toEqual({
      detached: true,
      scheme: theme === 'light' ? 'light' : 'dark',
      primary: theme === 'light' ? '#006b70' : '#27f5ef',
      rootPrimary: theme === 'light' ? '#006b70' : '#27f5ef',
    });
    await expect(page.locator('.cdk-overlay-backdrop')).toHaveCSS('backdrop-filter', 'none');
    await page.keyboard.press('Escape');
    await expect(panel).toHaveCount(0);
    const dialogTrigger = page.getByRole('button', { name: 'Open policy dialog' });
    await dialogTrigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const backdrop = page.locator('.ngx-design-system-backdrop');
    await expect(backdrop).toHaveCSS('backdrop-filter', 'blur(12px) saturate(1.2)');
    await expect(page.locator('.cdk-overlay-pane.ngx-design-system-overlay')).toHaveCSS(
      'color-scheme',
      theme === 'light' ? 'light' : 'dark',
    );
    await dialog.evaluate(async (node) => {
      node.getAnimations({ subtree: true }).forEach((animation) => animation.finish());
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
    });
    await page.screenshot({ path: `/tmp/ngx-overlay-policy-${theme}.png` });
    await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
    await expect(dialog).toHaveCount(0);
    await expect(dialogTrigger).toBeFocused();
    await page.getByRole('button', { name: 'Open policy sheet' }).click();
    await expect(page.getByRole('heading', { name: 'Policy share sheet' })).toBeVisible();
    await expect(page.locator('.ngx-design-system-backdrop')).toHaveCSS(
      'backdrop-filter',
      'blur(12px) saturate(1.2)',
    );
    await page.getByRole('button', { name: 'Close sheet' }).click();
    await expect(page.locator('.ngx-design-system-backdrop')).toHaveCount(0);
    await page.getByRole('button', { name: 'Policy actions' }).click();
    await expect(page.getByRole('menu')).toHaveClass(/ngx-design-system-overlay/);
    await expect(page.locator('.cdk-overlay-backdrop')).toHaveCSS('backdrop-filter', 'none');
    await page.getByRole('menuitem', { name: 'Export' }).click();
    await expect(page.getByText('Export selected', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Policy tooltip', exact: true }).hover();
    await expect(
      page.locator('.ngx-design-system-overlay').filter({ hasText: 'Shared tooltip' }).last(),
    ).toBeVisible();
    await expect(page.locator('.cdk-overlay-backdrop')).toHaveCount(0);
    await page.getByRole('button', { name: 'Policy notification', exact: true }).click();
    await expect(page.getByText('Policy notification visible', { exact: true })).toBeVisible();
    await expect(page.locator('.cdk-overlay-backdrop')).toHaveCount(0);
    await page.getByRole('button', { name: 'Dismiss', exact: true }).click();
    await expect(page.getByText('Policy notification visible', { exact: true })).toHaveCount(0);
    await page.getByRole('heading', { name: 'Shared overlay policy', exact: true }).click();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.getAnimations().filter((a) => a.playState === 'running').length,
        ),
      )
      .toBe(0);
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    const violations = await page.evaluate(async () => {
      const result = await (window as any).axe.run(
        document.querySelector('ngx-overlay-policy-example'),
      );
      return result.violations.filter((v: any) => ['serious', 'critical'].includes(v.impact));
    });
    expect(violations).toEqual([]);
  });
}

test('multiple select retains edits without premature close; reduced motion still dismisses and reopens', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto(story);
  const trigger = page.getByRole('combobox', { name: 'Membership' });
  await trigger.click();
  await page.getByRole('option', { name: 'Workshop', exact: true }).click();
  await expect(page.getByRole('listbox')).toBeVisible();
  await expect(page.getByRole('option', { name: 'Workshop', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await page.keyboard.press('Escape');
  await expect(page.getByRole('listbox')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(trigger).toContainText('Admin, Workshop');
  await trigger.click();
  await expect(page.getByRole('listbox')).toBeVisible();
  await page.keyboard.press('Escape');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: '/tmp/ngx-overlay-policy-mobile.png' });
});

for (const mode of ['reduced transparency', 'forced colors']) {
  test(`${mode}: scoped scrim falls back and a marked transparent backdrop remains invisible`, async ({
    page,
  }) => {
    if (mode === 'forced colors')
      await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
    else {
      const session = await page.context().newCDPSession(page);
      await session.send('Emulation.setEmulatedMedia', {
        features: [
          { name: 'prefers-reduced-transparency', value: 'reduce' },
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ],
      });
    }
    await page.goto(story);
    await page.getByRole('button', { name: 'Open policy dialog' }).click();
    const backdrop = page.locator('.ngx-design-system-backdrop');
    await expect(backdrop).toHaveCSS('backdrop-filter', 'none');
    if (mode === 'reduced transparency')
      await expect(backdrop).toHaveCSS('background-color', 'rgb(6, 7, 20)');
    else {
      expect(
        await backdrop.evaluate((node) => {
          const probe = document.createElement('div');
          probe.style.backgroundColor = 'Canvas';
          document.body.append(probe);
          const match =
            getComputedStyle(probe).backgroundColor === getComputedStyle(node).backgroundColor;
          probe.remove();
          return match;
        }),
      ).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(backdrop).toHaveCount(0);
    await page.getByRole('combobox', { name: 'Domain', exact: true }).click();
    await page
      .locator('.cdk-overlay-transparent-backdrop')
      .evaluate((node) => node.classList.add('ngx-design-system-backdrop'));
    await expect(page.locator('.cdk-overlay-transparent-backdrop')).toHaveCSS(
      'backdrop-filter',
      'none',
    );
    await expect(page.locator('.cdk-overlay-transparent-backdrop')).toHaveCSS(
      'background-color',
      /^rgba\(\d+, \d+, \d+, 0\)$/,
    );
    await page.keyboard.press('Escape');
    await expect(page.getByRole('listbox')).toHaveCount(0);
  });
}
