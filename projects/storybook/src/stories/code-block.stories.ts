import type { Meta, StoryObj } from '@storybook/angular';
import { NgxCodeBlock } from '@tmdjr/ngx-workshop-design-system';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TYPESCRIPT_SAMPLE, HTML_SAMPLE, CSS_SAMPLE, JSON_SAMPLE } from '../code-samples';
const meta: Meta<NgxCodeBlock> = {
  title: 'Components/Code block',
  component: NgxCodeBlock,
  tags: ['autodocs'],
  args: {
    label: 'Terminal',
    code: 'npm run build',
    language: 'text',
    contrast: 'readable',
    wrap: false,
    copyComplete: fn(),
  },
  argTypes: {
    language: {
      control: 'select',
      options: ['text', 'typescript', 'javascript', 'html', 'css', 'json'],
    },
    contrast: { control: 'select', options: ['readable', 'original'] },
    wrap: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Synthwave ’84 pre/code renderer with optional lazy syntax highlighting. Plain text is the compatible default. Readable contrast brightens comments/diagnostics; original restores upstream colors. Source is always text; clipboard returns the original string. No CodeMirror editor is loaded by this component.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<NgxCodeBlock>;
export const Terminal: Story = {};
export const Multiline: Story = {
  args: {
    label: 'styles.scss',
    code: '@use "@tmdjr/ngx-workshop-design-system/theme" as ngx;\n@include ngx.theme();',
  },
};
export const EscapedContent: Story = {
  args: { code: '<script>alert("This stays plain text")</script>' },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText('<script>alert("This stays plain text")</script>'),
    ).toBeVisible();
  },
};
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Copy code' })).toHaveFocus();
  },
};

export const TypeScript: Story = {
  args: { code: TYPESCRIPT_SAMPLE, label: 'workshop.ts', language: 'typescript' },
};
export const JavaScript: Story = {
  args: {
    code: "// Keep the original source intact.\nconst workshop = { title: 'Signals', seats: 24 };\nconsole.log(workshop.title);",
    label: 'workshop.js',
    language: 'javascript',
  },
};
export const Html: Story = {
  args: { code: HTML_SAMPLE, label: 'workshop.html', language: 'html' },
};
export const Css: Story = { args: { code: CSS_SAMPLE, label: 'workshop.css', language: 'css' } };
export const Json: Story = {
  args: { code: JSON_SAMPLE, label: 'workshop.json', language: 'json' },
};
export const Empty: Story = { args: { code: '', label: 'Empty snippet' } };
export const Wrapped: Story = {
  args: {
    code: "const message = 'A shared code frequency across Angular applications, editors, documentation, terminal samples and lightweight snippets.';",
    language: 'javascript',
    wrap: true,
    label: 'Wrapped long line',
  },
};
export const OriginalContrast: Story = {
  args: {
    code: TYPESCRIPT_SAMPLE,
    label: 'Exact upstream colors',
    language: 'typescript',
    contrast: 'original',
  },
};
export const LargePlainFallback: Story = {
  args: {
    code:
      '// Long snippets keep their exact text without parsing.\n' +
      'const value = 24;\n'.repeat(3000),
    label: 'Large source / plain fallback',
    language: 'typescript',
  },
};
