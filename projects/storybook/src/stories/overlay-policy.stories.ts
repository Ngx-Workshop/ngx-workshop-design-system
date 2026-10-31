import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { OVERLAY_DEFAULT_CONFIG } from '@angular/cdk/overlay';
import { OverlayPolicyExample } from '../overlay-policy-example';
const meta: Meta<OverlayPolicyExample> = {
  title: 'Foundations/Overlay policy',
  component: OverlayPolicyExample,
};
export default meta;
export const NativeOverlays: StoryObj<OverlayPolicyExample> = {};

// Exercise the public container fallback used by hosts that disable native popovers.
export const ContainerOverlays: StoryObj<OverlayPolicyExample> = {
  decorators: [
    applicationConfig({
      providers: [{ provide: OVERLAY_DEFAULT_CONFIG, useValue: { usePopover: false } }],
    }),
  ],
};
