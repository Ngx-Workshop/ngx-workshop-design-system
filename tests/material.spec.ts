import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';
const url = (group: string, name: string, state = 'default', theme = 'neon') =>
  `/iframe.html?id=material-${group}-${name}--${state}&viewMode=story&globals=theme:${theme}`;

test('catalog inventories all installed Material UI entry points and searches', async ({
  page,
  request,
}) => {
  const installed = readdirSync('node_modules/@angular/material', { withFileTypes: true })
    .filter(
      (d) =>
        d.isDirectory() &&
        !['core', 'schematics', 'prebuilt-themes', 'fesm2022', 'types'].includes(d.name),
    )
    .map((d) => d.name);
  const index = await (await request.get('/index.json')).json();
  const imports = new Set(
    Object.values(index.entries)
      .filter((e: any) => e.type === 'story')
      .map((e: any) => e.importPath),
  );
  for (const name of [...installed, 'ripple'])
    expect(
      [...imports].some((path) => String(path).endsWith(`/material/${name}.stories.ts`)),
      name,
    ).toBe(true);
  await page.goto('/iframe.html?id=material-catalog--overview&viewMode=story');
  await expect(page.locator('.catalog-card')).toHaveCount(36);
  await page.getByRole('textbox', { name: 'Find a Material component' }).fill('timepicker');
  await expect(page.locator('.catalog-card')).toHaveCount(1);
  await expect(page.locator('.catalog-card')).toContainText('Timepicker');
});

test('autocomplete, multiple select, editable chips and keyboard slider update local state', async ({
  page,
}) => {
  await page.goto(url('forms', 'autocomplete'));
  const topic = page.getByRole('combobox', { name: 'Find a topic' });
  await topic.fill('Signals');
  await page.getByRole('option', { name: 'Signals', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Selected topic: Signals');
  await page.goto(url('forms', 'select'));
  await page.getByRole('combobox', { name: 'Workshop tracks' }).click();
  await page.getByRole('option', { name: 'Material', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(page.locator('.demo-result')).toContainText('Angular, Material');
  await page.goto(url('forms', 'chips'));
  await page.getByRole('textbox', { name: 'Workshop tags' }).fill('CDK');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Remove CDK', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Remove CDK', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Remove CDK', exact: true })).toHaveCount(0);
  await page.goto(url('forms', 'slider'));
  const slider = page.getByRole('slider', { name: 'Session capacity' });
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByText('Session capacity: 45 seats')).toBeVisible();
});

test('nested menu and Material overlays return results, inherit neutral theme and restore focus', async ({
  page,
}) => {
  await page.goto(url('navigation', 'menu', 'default', 'neutral'));
  const trigger = page.getByRole('button', { name: 'Workshop actions' });
  await trigger.click();
  await page.getByRole('menuitem', { name: 'Export', exact: true }).hover();
  await page.getByRole('menuitem', { name: 'Markdown', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Markdown export selected');
  await expect(trigger).toBeFocused();
  await page.goto(url('overlays', 'dialog', 'default', 'neutral'));
  const open = page.getByRole('button', { name: 'Open confirmation dialog' });
  await open.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(
    await dialog.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--ngx-color-primary').trim(),
    ),
  ).toBe('#b6c8e0');
  await page.getByRole('button', { name: 'Confirm registration' }).click();
  await expect(page.getByRole('status')).toContainText('Seat reserved');
  await expect(open).toBeFocused();
  await page.goto(url('overlays', 'bottom-sheet'));
  await page.getByRole('button', { name: 'Open share sheet' }).click();
  await page.getByRole('button', { name: 'Export JSON' }).click();
  await expect(page.getByRole('status')).toContainText('JSON export selected');
  await page.goto(url('overlays', 'snackbar', 'success'));
  await page.getByRole('button', { name: 'Show notification' }).click();
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await expect(page.locator('.demo-result')).toContainText('Save undone');
});

test('date, date range and time overlays select actual values', async ({ page }) => {
  await page.goto(url('date-and-time', 'datepicker'));
  await page.getByRole('button', { name: 'Open calendar' }).click();
  await page.getByRole('button', { name: 'October 28, 2026', exact: true }).click();
  await expect(page.locator('.demo-result')).toContainText('Oct 28, 2026');
  await page.goto(url('date-and-time', 'datepicker', 'date-range'));
  await page.getByRole('button', { name: 'Open calendar' }).click();
  await page.getByRole('button', { name: 'October 20, 2026', exact: true }).click();
  await page.getByRole('button', { name: 'October 23, 2026', exact: true }).click();
  await expect(page.locator('.demo-result')).toContainText('Oct 20, 2026 → Oct 23, 2026');
  await page.goto(url('date-and-time', 'timepicker'));
  await page.getByRole('button', { name: 'Open timepicker' }).click();
  await page.getByRole('option', { name: '11:00 AM', exact: true }).click();
  await expect(page.locator('.demo-result')).toContainText('11:00 AM');
});

test('table sorts numerically, filters, paginates and reports empty results', async ({ page }) => {
  await page.goto(url('data', 'table'));
  await page.getByRole('button', { name: 'Seats', exact: true }).click();
  await expect(page.locator('.demo-table-scroll tbody tr').first()).toContainText(
    'Performance lab',
  );
  await expect(page.locator('.demo-result')).toContainText('Sorted seats asc');
  await page.getByRole('button', { name: 'Next page' }).click();
  await expect(page.locator('.demo-table-scroll tbody tr').first()).toContainText(
    'Testing components',
  );
  await page.getByRole('textbox', { name: 'Filter workshops' }).fill('Material');
  await expect(page.locator('.demo-table-scroll tbody tr')).toHaveCount(1);
  await expect(page.locator('.demo-table-scroll tbody tr')).toContainText('Material theming');
  await page.getByRole('textbox', { name: 'Filter workshops' }).fill('not-a-workshop');
  await expect(page.getByText('No workshops match your filter.')).toBeVisible();
});

test('tree expansion, tabs, selection and validation-gated stepper work', async ({ page }) => {
  await page.goto(url('data', 'tree'));
  await page.getByRole('button', { name: 'Toggle Components', exact: true }).click();
  await page.getByRole('button', { name: 'Toggle Panels', exact: true }).click();
  await page.getByRole('button', { name: 'Transitions', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Transitions');
  await page.goto(url('navigation', 'tabs'));
  await page.getByRole('tab', { name: 'Resources', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Workshop resources' })).toBeVisible();
  await page.goto(url('layout', 'stepper', 'linear'));
  await page.getByRole('button', { name: 'Continue to resources' }).click();
  await expect(page.getByRole('textbox', { name: 'Workshop title' })).toBeVisible();
  await expect(page.getByText('A workshop title is required.')).toBeVisible();
  await page.getByRole('textbox', { name: 'Workshop title' }).fill('Angular signals');
  await page.getByRole('button', { name: 'Continue to resources' }).click();
  await page.getByRole('button', { name: 'Continue to review' }).click();
  await page.getByRole('button', { name: 'Create workshop' }).click();
  await expect(page.getByRole('status')).toContainText('Workshop created locally');
});

test('representative controls and overlays have no serious accessibility violations in both palettes', async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const theme of ['neon', 'neutral'])
    for (const [group, name, state] of [
      ['forms', 'input', 'invalid'],
      ['forms', 'chips', 'default'],
      ['actions', 'buttons', 'default'],
      ['data', 'table', 'default'],
      ['layout', 'stepper', 'vertical'],
      ['overlays', 'dialog', 'default'],
    ]) {
      await page.goto(url(group, name, state, theme));
      await expect(page.locator('ngx-material-demo')).toBeVisible();
      if (name === 'dialog')
        await page.getByRole('button', { name: 'Open confirmation dialog' }).click();
      await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
      const violations = await page.evaluate(async () => {
        const result = await (window as any).axe.run(document.body);
        return result.violations
          .filter((v: any) => ['serious', 'critical'].includes(v.impact))
          .map((v: any) => ({ id: v.id, nodes: v.nodes.map((n: any) => n.target) }));
      });
      expect(violations, `${theme}/${name}`).toEqual([]);
    }
});

test('representative Material stories fit a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [group, name, state] of [
    ['navigation', 'toolbar', 'default'],
    ['navigation', 'sidenav', 'open'],
    ['layout', 'stepper', 'vertical'],
    ['data', 'table', 'default'],
    ['data', 'paginator', 'default'],
    ['forms', 'chips', 'default'],
    ['date-and-time', 'datepicker', 'date-range'],
    ['actions', 'button-toggle', 'default'],
  ]) {
    await page.goto(url(group, name, state));
    await expect(page.locator('ngx-material-demo')).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      name,
    ).toBe(true);
  }
});
