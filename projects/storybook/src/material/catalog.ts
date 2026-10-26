import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MaterialDemo } from './demo-shell';
import { MATERIAL_CATALOG } from './catalog-data';
@Component({
  selector: 'ngx-material-catalog',
  imports: [MaterialDemo, FormsModule, MatFormFieldModule, MatInputModule, MatChipsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ngx-material-demo
    heading="Material / full spectrum"
    description="Every installed Material UI family, at the Workshop frequency. Open a component to explore state stories and working examples."
    ><div class="catalog-summary">
      <span>{{ entries.length }} COMPONENT FAMILIES</span
      ><span>{{ storyCount }} NEW STATE STORIES</span><span>ANGULAR MATERIAL 21.1.0</span>
    </div>
    <mat-form-field appearance="outline"
      ><mat-label>Find a Material component</mat-label
      ><input
        matInput
        [ngModel]="query()"
        (ngModelChange)="query.set($event)"
        placeholder="Try table, tooltip or validation"
    /></mat-form-field>
    <div class="catalog-grid">
      @for (item of filtered(); track item.key) {
        <a class="catalog-card" [href]="'/?path=/story/' + item.storyId" target="_top"
          ><span>{{ item.group }} / {{ item.states.length }} states</span>
          <h2>{{ item.name }} <span aria-hidden="true">↗</span></h2>
          <p>{{ item.description }}</p>
          <div class="catalog-tags">
            @for (state of item.states; track state) {
              <span>{{ state }}</span>
            }
          </div></a
        >
      } @empty {
        <p class="demo-empty">No component matches “{{ query() }}”.</p>
      }
    </div>
    <p class="demo-help">
      Catalog covers the public UI entry points installed in Material 21.1.0. Core is represented by
      ripples. Date adapters, helpers, schematics and prebuilt themes are not separate components.
    </p></ngx-material-demo
  >`,
})
export class MaterialCatalog {
  readonly entries = MATERIAL_CATALOG;
  readonly storyCount = MATERIAL_CATALOG.reduce((n, item) => n + item.states.length, 0);
  readonly query = signal('');
  readonly filtered = computed(() =>
    this.entries.filter((item) =>
      (item.name + ' ' + item.group + ' ' + item.description + ' ' + item.states.join(' '))
        .toLowerCase()
        .includes(this.query().toLowerCase()),
    ),
  );
}
