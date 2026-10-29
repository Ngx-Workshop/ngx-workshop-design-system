import { test, expect } from '@playwright/test';

for (const mode of ['light', 'dark']) {
  test(`Reese’s ${mode}: staggered wordmarks, native typography, visible glass blur and reset`, async ({
    page,
  }) => {
    const externalRequests: string[] = [];
    page.on('request', (request) => {
      if (!request.url().startsWith('http://127.0.0.1:6007') && !request.url().startsWith('data:'))
        externalRequests.push(request.url());
    });
    await page.goto(
      `/iframe.html?id=foundations-reeses--${mode}&viewMode=story&globals=theme:reeses-${mode}`,
    );
    const grid = page.locator('ngx-panel[data-background="grid"]');
    const glass = page.locator('ngx-panel[data-background="glass"]');
    await expect(grid.getByText('The perfect pairing')).toBeVisible();
    const inspect = () =>
      grid.locator('.frame').evaluate((el) => {
        const css = getComputedStyle(el);
        const token = (name: string) => css.getPropertyValue(name).trim();
        const image = token('--ngx-panel-grid-image');
        const source = decodeURIComponent(
          image.slice(image.indexOf('data:image/svg+xml,') + 19).replace(/["')]+$/, ''),
        );
        const tile = new DOMParser().parseFromString(source, 'image/svg+xml');
        return {
          refs: ['orange', 'yellow', 'chocolate'].map((name) => token(`--ngx-reeses-${name}`)),
          lineColor: token('--ngx-panel-grid-color'),
          size: getComputedStyle(el, '::after').backgroundSize,
          opacity: Number(tile.querySelector('g[opacity]')?.getAttribute('opacity')),
          rows: [...tile.querySelectorAll('use')].map((use) => [
            Number(use.getAttribute('x')),
            Number(use.getAttribute('y')),
          ]),
          body: getComputedStyle(document.body).fontFamily,
          heading: getComputedStyle(el.querySelector('mat-card-title')!).fontFamily,
          label: getComputedStyle(el.querySelector('mat-card-subtitle')!).fontFamily,
        };
      });
    const style = await inspect();
    expect(style.refs).toEqual(['#ff5d00', '#ffc000', '#2f1c0b']);
    expect(style.lineColor).toBe('transparent');
    expect(style.size).toContain('144px 192px');
    expect(style.opacity).toBe(mode === 'light' ? 0.22 : 0.14);
    expect(style.rows).toEqual([
      [18, 25],
      [-54, 121],
      [90, 121],
    ]);
    for (const font of [style.body, style.heading, style.label])
      expect(font).not.toMatch(/Inter|Public Sans|DM Mono/);
    for (const surface of ['solid', 'glass']) {
      expect(
        await page
          .locator(`ngx-panel[data-background="${surface}"] .frame`)
          .evaluate((el) => getComputedStyle(el, '::after').backgroundImage),
      ).toBe('none');
    }
    expect(
      await glass
        .locator('.frame')
        .evaluate((el) => getComputedStyle(el, '::after').backdropFilter),
    ).toContain('blur(16px)');
    const frosted = await glass.screenshot();
    const noBlur = await page.addStyleTag({
      content:
        'ngx-panel[data-background="glass"] .frame::after { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }',
    });
    expect(
      Buffer.compare(frosted, await glass.screenshot()),
      'Blur must visibly affect the rendered backdrop',
    ).not.toBe(0);
    await noBlur.evaluate((el) => el.remove());
    expect(externalRequests).toEqual([]);
    await page.screenshot({ path: `test-results/reeses-${mode}-brand.png`, fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.screenshot({ path: `test-results/reeses-${mode}-brand-mobile.png`, fullPage: true });
    await page.evaluate(() =>
      document.documentElement.setAttribute('data-ngx-theme', 'nasa-light'),
    );
    await expect(page.locator('body')).toHaveCSS('font-family', /Public Sans/);
    await page.evaluate(
      (theme) => document.documentElement.setAttribute('data-ngx-theme', theme),
      `reeses-${mode}`,
    );
    expect(await inspect()).toEqual(style);
    await page.evaluate(() => document.documentElement.setAttribute('data-ngx-theme', 'neon'));
    expect(
      await grid
        .locator('.frame')
        .evaluate((el) => getComputedStyle(el, '::after').backgroundImage),
    ).not.toContain('data:image/svg+xml');
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
    await page.evaluate(
      (theme) => document.documentElement.setAttribute('data-ngx-theme', theme),
      `reeses-${mode}`,
    );
    const violations = await page.evaluate(async () => {
      const { violations } = await (window as any).axe.run(document.querySelector('main'));
      return violations
        .filter((v: any) => ['serious', 'critical'].includes(v.impact))
        .map((v: any) => ({ id: v.id, nodes: v.nodes.map((n: any) => n.target) }));
    });
    expect(violations).toEqual([]);
  });
}
