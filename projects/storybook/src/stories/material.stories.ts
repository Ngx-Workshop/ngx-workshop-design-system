import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { expect, userEvent, within } from 'storybook/test';
const meta: Meta = {
  title: 'Material/Primitives',
  decorators: [
    moduleMetadata({
      imports: [
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSlideToggleModule,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Use Material controls directly: the shared theme styles them through public override mixins. No duplicate button or form APIs.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;
export const Buttons: Story = {
  render: () => ({
    template: `<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><button mat-flat-button class="ngx-action">Primary action</button><button mat-flat-button class="ngx-action ngx-action--secondary">Secondary action</button><button mat-button>Tertiary action</button><button mat-flat-button disabled>Disabled</button></div>`,
  }),
};
export const Form: Story = {
  render: () => ({
    props: { name: '', level: 'Beginner', enabled: true },
    template: `<div style="display:grid;gap:24px;max-width:400px"><mat-form-field appearance="outline"><mat-label>Workshop name</mat-label><input matInput [(ngModel)]="name" required/><mat-hint>Required workshop title</mat-hint></mat-form-field><mat-form-field appearance="outline"><mat-label>Experience level</mat-label><mat-select [(ngModel)]="level"><mat-option value="Beginner">Beginner</mat-option><mat-option value="Advanced">Advanced</mat-option></mat-select></mat-form-field><mat-checkbox>Hands-on exercises</mat-checkbox><mat-slide-toggle [(ngModel)]="enabled">Notifications</mat-slide-toggle><p aria-live="polite">{{name || 'Untitled workshop'}} / {{level}}</p></div>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox', { name: 'Workshop name' }), 'Angular signals');
    await expect(canvas.getByText('Angular signals / Beginner')).toBeVisible();
  },
};
export const Validation: Story = {
  render: () => ({
    props: { name: '' },
    template: `<mat-form-field appearance="outline"><mat-label>Workshop name</mat-label><input matInput required [(ngModel)]="name" #field="ngModel"/><mat-hint>Blur the empty field to see validation.</mat-hint>@if(field.invalid){<mat-error>A workshop name is required.</mat-error>}</mat-form-field>`,
  }),
};
