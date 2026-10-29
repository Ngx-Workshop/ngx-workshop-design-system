import type { Meta, StoryObj } from '@storybook/angular';
import { NgxBackground, NgxPanel } from '@tmdjr/ngx-workshop-design-system';

const meta: Meta = {
  title: 'Foundations/Backgrounds/Theme aware',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Use one <ngx-background /> inside an isolated scene. The theme toolbar switches between the animated lattice and NASA/Reese’s branded patterns without replacing the component. Container/viewport placement, still mode and reduced motion remain supported. Set design="lattice" to keep the geometric design in every palette.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [NgxBackground, NgxPanel] },
    template: `<main style="position:relative;isolation:isolate;min-height:100vh;padding:clamp(24px,5vw,64px);--ngx-background-height:100%">
      <ngx-background />
      <div style="max-width:740px">
        <p style="font:var(--ngx-font-label);color:var(--ngx-color-primary)">ONE COMPONENT / EVERY THEME</p>
        <h1 style="font-size:clamp(32px,5vw,64px);letter-spacing:-.04em;margin:24px 0">A background that belongs.</h1>
        <p style="max-width:560px;color:var(--ngx-color-muted);line-height:1.8">Choose a theme from the toolbar. The background follows automatically, with NASA insignias, Reese’s wordmarks, or the original lattice in your theme’s colors.</p>
        <a href="#background-content" style="display:inline-block;padding:16px 0;color:var(--ngx-color-primary)">Explore the scene</a>
      </div>
      <section id="background-content" style="max-width:480px;margin-top:40px">
        <ngx-panel heading="Make yourself at home" eyebrow="THEME / AUTOMATIC" background="glass"><p>Content and controls stay in place while the background changes with the selected theme.</p></ngx-panel>
      </section>
    </main>`,
  }),
};
export default meta;
export const Neon: StoryObj = { globals: { theme: 'neon' } };
export const NasaLight: StoryObj = { globals: { theme: 'nasa-light' } };
export const NasaDark: StoryObj = { globals: { theme: 'nasa-dark' } };
export const ReesesLight: StoryObj = { globals: { theme: 'reeses-light' } };
export const ReesesDark: StoryObj = { globals: { theme: 'reeses-dark' } };
export const MultipleScenes: StoryObj = {
  globals: { theme: 'nasa-light' },
  render: () => ({
    moduleMetadata: { imports: [NgxBackground] },
    template: `<main style="padding:24px;display:grid;gap:24px;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))">
      <section style="position:relative;isolation:isolate;min-height:500px;padding:24px;--ngx-background-height:100%;border:1px solid var(--ngx-color-border)"><ngx-background [animated]="false"/><h1>Follows your theme</h1><p>The default component picks its design from the selected palette.</p></section>
      <section style="position:relative;isolation:isolate;min-height:500px;padding:24px;--ngx-background-height:100%;border:1px solid var(--ngx-color-border)"><ngx-background design="lattice" [animated]="false"/><h2>Always geometric</h2><p>An optional design override keeps the lattice while its colors follow the theme.</p></section>
    </main>`,
  }),
};
