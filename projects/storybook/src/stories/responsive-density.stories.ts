import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import {
  NgxActionBar,
  NgxButton,
  NgxInlineStatus,
  NgxPanel,
  NgxSaveFeedback,
} from '@tmdjr/ngx-workshop-design-system';

const meta: Meta = {
  title: 'Components/Responsive density',
  decorators: [
    moduleMetadata({
      imports: [
        MatButtonModule,
        NgxActionBar,
        NgxButton,
        NgxInlineStatus,
        NgxPanel,
        NgxSaveFeedback,
      ],
    }),
  ],
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Workspace: StoryObj = {
  render: () => ({
    props: { actions: false, saved: false },
    template: `
      <ngx-action-bar heading="MFE Orchestrator" [sticky]="false">
        <ngx-inline-status ngxActionBarIndicators label="0 MFEs in dev mode" />
        <ngx-save-feedback ngxActionBarFeedback [state]="saved ? 'saved' : 'idle'" name="Seed MFE" />
        <button mat-flat-button ngxButton shape="chevron" (click)="actions = !actions">Toggle panel actions</button>
      </ngx-action-bar>
      <main style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:16px;padding:16px">
        <ngx-panel heading="All remotes" eyebrow="CATALOG / SELECT" background="solid">
          <p>A panel with no actions supplied.</p>
          <button mat-flat-button ngxButton surface="outline">Select remote</button>
        </ngx-panel>
        <ngx-panel heading="Seed MFE" eyebrow="REMOTE CONFIGURATION" background="solid">
          <p>Panel actions follow the projected content, including conditional buttons inside a wrapper.</p>
          <ngx-panel heading="Remote details" background="solid"><p>Nested configuration content.</p></ngx-panel>
          <div ngxPanelActions>
            @if (actions) {
              <button mat-flat-button ngxButton (click)="saved = true">Save remote</button>
            }
          </div>
        </ngx-panel>
      </main>`,
  }),
};
