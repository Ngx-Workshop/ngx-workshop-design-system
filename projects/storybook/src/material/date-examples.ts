import { ChangeDetectionStrategy, Component, input, signal, computed, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialDemo } from './demo-shell';
@Component({
  selector: 'ngx-date-examples',
  imports: [
    MaterialDemo,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    MatDatepickerModule,
    MatTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ngx-material-demo
    [heading]="heading()"
    description="Native date adapter. Local calendar dates. Themed calendar and time overlays."
    ><div class="demo-stack">
      @if (view() === 'timepicker') {
        <mat-form-field subscriptSizing="dynamic" appearance="outline"
          ><mat-label>Session start time</mat-label
          ><input
            matInput
            [matTimepicker]="timepicker"
            [formControl]="time"
            [min]="minTime"
            [max]="maxTime"
          /><mat-timepicker-toggle matIconSuffix [for]="timepicker" /><mat-timepicker
            #timepicker
            interval="30m"
          /><mat-hint>Available from 09:00 to 17:00.</mat-hint>
          @if (time.invalid) {
            <mat-error>Choose a time between 09:00 and 17:00.</mat-error>
          }
        </mat-form-field>
        <p class="demo-result" aria-live="polite">
          Start time: {{ time.value ? (time.value | date: 'shortTime') : 'not selected' }}
        </p>
      } @else if (range()) {
        <mat-form-field subscriptSizing="dynamic" appearance="outline"
          ><mat-label>Workshop date range</mat-label
          ><mat-date-range-input [rangePicker]="rangePicker" [formGroup]="dates"
            ><input matStartDate formControlName="start" placeholder="Start date" /><input
              matEndDate
              formControlName="end"
              placeholder="End date" /></mat-date-range-input
          ><mat-datepicker-toggle matIconSuffix [for]="rangePicker" /><mat-date-range-picker
            #rangePicker
          /><mat-hint>Select a start and end date.</mat-hint>
          @if (dates.invalid) {
            <mat-error>A valid start and end date are required.</mat-error>
          }
        </mat-form-field>
        <p class="demo-result">
          {{ dates.value.start | date: 'mediumDate' }} → {{ dates.value.end | date: 'mediumDate' }}
        </p>
      } @else {
        <mat-form-field subscriptSizing="dynamic" appearance="outline"
          ><mat-label>Workshop date</mat-label
          ><input
            matInput
            [matDatepicker]="picker"
            [formControl]="date"
            [min]="minDate"
            [max]="maxDate"
          /><mat-datepicker-toggle matIconSuffix [for]="picker" /><mat-datepicker
            #picker
            [startAt]="initialDate"
          /><mat-hint>Available during October 2026.</mat-hint>
          @if (date.invalid) {
            <mat-error>Select a date during October 2026.</mat-error>
          }
        </mat-form-field>
        <p class="demo-result" aria-live="polite">
          Selected date: {{ date.value ? (date.value | date: 'mediumDate') : 'not selected' }}
        </p>
      }
    </div></ngx-material-demo
  >`,
})
export class DateExamples {
  readonly view = input('datepicker');
  readonly heading = input('Datepicker');
  readonly state = input<'default' | 'disabled' | 'error' | 'empty'>('default');
  readonly range = input(false);
  readonly initialDate = new Date(2026, 9, 25);
  readonly minDate = new Date(2026, 9, 1);
  readonly maxDate = new Date(2026, 9, 31);
  readonly minTime = new Date(2026, 9, 25, 9);
  readonly maxTime = new Date(2026, 9, 25, 17);
  readonly date = new FormControl<Date | null>(this.initialDate, Validators.required);
  readonly time = new FormControl<Date | null>(new Date(2026, 9, 25, 10), Validators.required);
  readonly dates = new FormGroup({
    start: new FormControl<Date | null>(new Date(2026, 9, 25), Validators.required),
    end: new FormControl<Date | null>(new Date(2026, 9, 27), Validators.required),
  });
  constructor() {
    effect(() => {
      const state = this.state();
      this.date.reset(new Date(2026, 9, 25));
      this.time.reset(new Date(2026, 9, 25, 10));
      this.dates.reset({ start: new Date(2026, 9, 25), end: new Date(2026, 9, 27) });
      for (const control of [this.date, this.time, this.dates]) {
        state === 'disabled' ? control.disable() : control.enable();
      }
      if (state === 'empty' || state === 'error') {
        this.date.setValue(null);
        this.time.setValue(null);
        this.dates.reset();
      }
      if (state === 'error') {
        this.date.markAsTouched();
        this.time.markAsTouched();
        this.dates.markAllAsTouched();
      }
    });
  }
}
