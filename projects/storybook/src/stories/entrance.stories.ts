import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxEntrance, NgxPanel } from '@tmdjr/ngx-workshop-design-system';
import type { Meta, StoryObj } from '@storybook/angular';

@Component({
  selector: 'ngx-entrance-example',
  imports: [NgxEntrance, NgxPanel, MatExpansionModule, MatSlideToggleModule],
  template: `<button type="button" (click)="shown.set(!shown())">Toggle entrance</button>
    @if (shown()) {
      <section
        ngxEntrance="grow"
        [entranceDelay]="280"
        [entranceDuration]="420"
        style="display:block"
        data-testid="growth"
      >
        <ngx-panel heading="Shared entrance" background="solid">
          <div
            ngxEntrance="fade"
            [entranceDelay]="820"
            [entranceDuration]="220"
            data-testid="reveal"
          >
            <label>Draft <input value="Retained draft" /></label>
            <mat-accordion
              ><mat-expansion-panel
                ><mat-expansion-panel-header>
                  <mat-panel-title>Integration options</mat-panel-title>
                </mat-expansion-panel-header>
                <p>Material retains expansion and focus behavior.</p></mat-expansion-panel
              ></mat-accordion
            >
            <mat-slide-toggle class="warning-toggle">Warning option</mat-slide-toggle>
            <p style="min-height:180px">Natural content height is restored after growth.</p>
          </div>
        </ngx-panel>
      </section>
    }`,
  host: { class: 'entrance-example' },
})
class EntranceExample {
  readonly shown = signal(true);
}
const meta: Meta<EntranceExample> = {
  title: 'Components/Entrance',
  component: EntranceExample,
};
export default meta;
export const Staged: StoryObj<EntranceExample> = {};
