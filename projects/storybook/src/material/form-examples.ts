import { ChangeDetectionStrategy, Component, input, signal, computed, effect } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialDemo } from './demo-shell';
@Component({
  selector: 'ngx-form-examples',
  imports: [
    MaterialDemo,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ngx-material-demo [heading]="heading()"
    ><div class="demo-stack">
      @switch (view()) {
        @case ('input') {
          <mat-form-field subscriptSizing="dynamic" appearance="outline"
            ><mat-label>Workshop title</mat-label><input matInput [formControl]="title" /><mat-hint
              >At least three characters.</mat-hint
            >
            @if (title.invalid) {
              <mat-error>Enter a title with at least three characters.</mat-error>
            }</mat-form-field
          ><mat-form-field subscriptSizing="dynamic" appearance="fill"
            ><mat-label>Session notes</mat-label
            ><textarea matInput rows="3" [(ngModel)]="notes" [disabled]="disabled()"></textarea
            ><mat-hint align="end">{{ notes().length }} characters</mat-hint></mat-form-field
          >
          <p class="demo-result" aria-live="polite">
            Title: {{ title.value || 'Untitled' }} / {{ title.valid ? 'valid' : 'invalid' }}
          </p>
        }
        @case ('form-field') {
          <div class="demo-grid">
            <mat-form-field subscriptSizing="dynamic" appearance="outline"
              ><mat-label>Outlined field</mat-label
              ><input matInput [formControl]="title" /><mat-icon
                matPrefix
                svgIcon="ngx:code"
              /><mat-hint>Prefix icon and validation.</mat-hint>
              @if (title.invalid) {
                <mat-error>Enter at least three characters.</mat-error>
              }</mat-form-field
            ><mat-form-field subscriptSizing="dynamic" appearance="fill"
              ><mat-label>Seat budget</mat-label><span matTextPrefix>$&nbsp;</span
              ><input matInput type="number" min="0" value="120" [disabled]="disabled()" /><span
                matTextSuffix
                >.00</span
              ><mat-hint>Filled appearance with text affixes.</mat-hint></mat-form-field
            >
          </div>
        }
        @case ('autocomplete') {
          <mat-form-field subscriptSizing="dynamic" appearance="outline"
            ><mat-label>Find a topic</mat-label
            ><input
              matInput
              [matAutocomplete]="topics"
              [ngModel]="query()"
              (ngModelChange)="query.set($event)"
              [disabled]="disabled()"
            /><mat-autocomplete
              #topics="matAutocomplete"
              (optionSelected)="selection.set($event.option.value)"
            >
              @for (topic of filtered(); track topic) {
                <mat-option [value]="topic">{{ topic }}</mat-option>
              } @empty {
                <mat-option disabled>No matching topics</mat-option>
              }</mat-autocomplete
            ><mat-hint>Try typing Angular, Signals, or Material.</mat-hint></mat-form-field
          >
          <p class="demo-result" role="status">Selected topic: {{ selection() || 'none' }}</p>
        }
        @case ('checkbox') {
          <mat-checkbox [(ngModel)]="checked" [disabled]="disabled()"
            >Hands-on exercises</mat-checkbox
          ><mat-checkbox
            [(ngModel)]="checked"
            [indeterminate]="indeterminate()"
            [disabled]="disabled()"
            >All workshop resources</mat-checkbox
          ><mat-checkbox disabled [checked]="true">Managed by workspace policy</mat-checkbox>
          <p class="demo-result" aria-live="polite">
            Exercises: {{ checked() ? 'included' : 'excluded' }}
          </p>
        }
        @case ('radio') {
          <mat-radio-group
            aria-label="Session format"
            class="demo-row"
            [(ngModel)]="format"
            [disabled]="disabled()"
            ><mat-radio-button value="live">Live</mat-radio-button
            ><mat-radio-button value="recorded">Recorded</mat-radio-button
            ><mat-radio-button value="hybrid" disabled
              >Hybrid (coming soon)</mat-radio-button
            ></mat-radio-group
          >
          <p class="demo-result" aria-live="polite">
            Session format: {{ format() || 'not selected' }}
          </p>
        }
        @case ('select') {
          <mat-form-field subscriptSizing="dynamic" appearance="outline"
            ><mat-label>Experience level</mat-label
            ><mat-select [formControl]="level" required
              ><mat-option value="Beginner">Beginner</mat-option
              ><mat-option value="Intermediate">Intermediate</mat-option
              ><mat-option value="Advanced">Advanced</mat-option
              ><mat-option disabled value="Expert">Expert (not available)</mat-option></mat-select
            >
            @if (level.invalid) {
              <mat-error>Select an experience level.</mat-error>
            }</mat-form-field
          ><mat-form-field subscriptSizing="dynamic" appearance="fill"
            ><mat-label>Workshop tracks</mat-label
            ><mat-select multiple [(ngModel)]="tracks" [disabled]="disabled()"
              ><mat-optgroup label="Frontend"
                ><mat-option value="Angular">Angular</mat-option
                ><mat-option value="Material">Material</mat-option></mat-optgroup
              ><mat-optgroup label="Platform"
                ><mat-option value="Testing">Testing</mat-option
                ><mat-option value="Tooling">Tooling</mat-option></mat-optgroup
              ></mat-select
            ></mat-form-field
          >
          <p class="demo-result" aria-live="polite">
            Level: {{ level.value || 'none' }} / Tracks: {{ tracks().join(', ') || 'none' }}
          </p>
        }
        @case ('slider') {
          <label>Session capacity: {{ capacity() }} seats</label
          ><mat-slider min="0" max="100" step="5" discrete showTickMarks [disabled]="disabled()"
            ><input
              matSliderThumb
              aria-label="Session capacity"
              [(ngModel)]="capacity" /></mat-slider
          ><label>Preferred duration: {{ start() }}–{{ end() }} minutes</label
          ><mat-slider min="0" max="180" step="15" discrete [disabled]="disabled()"
            ><input matSliderStartThumb aria-label="Minimum duration" [(ngModel)]="start" /><input
              matSliderEndThumb
              aria-label="Maximum duration"
              [(ngModel)]="end"
          /></mat-slider>
        }
        @case ('slide-toggle') {
          <mat-slide-toggle [(ngModel)]="checked" [disabled]="disabled()"
            >Session notifications</mat-slide-toggle
          ><mat-slide-toggle disabled [checked]="true"
            >Security notifications (required)</mat-slide-toggle
          >
          <p class="demo-result" aria-live="polite">
            Session notifications: {{ checked() ? 'on' : 'off' }}
          </p>
        }
        @case ('chips') {
          <mat-chip-listbox
            aria-label="Selected experience"
            [(ngModel)]="chipLevel"
            [disabled]="disabled()"
            ><mat-chip-option value="Beginner">Beginner</mat-chip-option
            ><mat-chip-option value="Intermediate">Intermediate</mat-chip-option
            ><mat-chip-option value="Advanced">Advanced</mat-chip-option></mat-chip-listbox
          ><mat-form-field subscriptSizing="dynamic" appearance="outline"
            ><mat-label>Workshop tags</mat-label
            ><mat-chip-grid #tagsGrid aria-label="Editable workshop tags" [disabled]="disabled()">
              @for (tag of tags(); track tag) {
                <mat-chip-row (removed)="removeTag(tag)"
                  >{{ tag
                  }}<button matChipRemove [attr.aria-label]="'Remove ' + tag">
                    <mat-icon svgIcon="ngx:close" /></button
                ></mat-chip-row>
              }</mat-chip-grid
            ><input
              placeholder="Add a tag…"
              [matChipInputFor]="tagsGrid"
              (matChipInputTokenEnd)="addTag($event)"
              [disabled]="disabled()"
            /><mat-hint>Press Enter to add a tag.</mat-hint></mat-form-field
          >
          <p class="demo-result" aria-live="polite">
            Level: {{ chipLevel() || 'none' }} / {{ tags().length }} tags
          </p>
        }
      }
    </div></ngx-material-demo
  >`,
})
export class FormExamples {
  readonly view = input('input');
  readonly heading = input('Input');
  readonly state = input<'default' | 'disabled' | 'error' | 'empty'>('default');
  readonly indeterminate = input(false);
  readonly disabled = computed(() => this.state() === 'disabled');
  readonly title = new FormControl('Angular signals', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  readonly level = new FormControl('Intermediate', {
    nonNullable: true,
    validators: [Validators.required],
  });
  readonly notes = signal('Bring your next idea.');
  readonly query = signal('');
  readonly selection = signal('');
  readonly checked = signal(true);
  readonly format = signal('live');
  readonly tracks = signal(['Angular']);
  readonly capacity = signal(40);
  readonly start = signal(30);
  readonly end = signal(90);
  readonly chipLevel = signal('Intermediate');
  readonly tags = signal(['Angular', 'Signals']);
  readonly topics = [
    'Angular',
    'Angular Material',
    'Signals',
    'CDK overlays',
    'Testing',
    'TypeScript',
  ];
  readonly filtered = computed(() =>
    this.topics.filter((t) => t.toLowerCase().includes(this.query().toLowerCase())),
  );
  constructor() {
    effect(() => {
      const state = this.state();
      this.title.reset('Angular signals');
      this.level.reset('Intermediate');
      this.query.set('');
      this.selection.set('');
      this.tags.set(['Angular', 'Signals']);
      this.format.set('live');
      this.tracks.set(['Angular']);
      for (const control of [this.title, this.level]) {
        state === 'disabled' ? control.disable() : control.enable();
      }
      if (state === 'error') {
        this.title.setValue('');
        this.level.setValue('');
        this.title.markAsTouched();
        this.level.markAsTouched();
      }
      if (state === 'empty') {
        this.query.set('No such topic');
        this.tags.set([]);
        this.format.set('');
        this.tracks.set([]);
        this.title.setValue('');
        this.level.setValue('');
      }
    });
  }
  addTag(event: MatChipInputEvent): void {
    const tag = event.value.trim();
    if (tag && !this.tags().includes(tag)) this.tags.update((tags) => [...tags, tag]);
    event.chipInput.clear();
  }
  removeTag(tag: string): void {
    this.tags.update((tags) => tags.filter((t) => t !== tag));
  }
}
