import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  effect,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialDemo } from './demo-shell';
interface Workshop {
  name: string;
  level: string;
  seats: number;
  status: string;
}
interface ResourceNode {
  name: string;
  children?: ResourceNode[];
}
const WORKSHOPS: Workshop[] = [
  { name: 'Angular foundations', level: 'Beginner', seats: 24, status: 'Open' },
  { name: 'Signals in motion', level: 'Intermediate', seats: 18, status: 'Open' },
  { name: 'CDK overlays', level: 'Advanced', seats: 12, status: 'Waitlist' },
  { name: 'Material theming', level: 'Intermediate', seats: 32, status: 'Open' },
  { name: 'Testing components', level: 'Intermediate', seats: 20, status: 'Open' },
  { name: 'Reactive forms', level: 'Beginner', seats: 16, status: 'Closed' },
  { name: 'Performance lab', level: 'Advanced', seats: 8, status: 'Open' },
  { name: 'Accessibility audit', level: 'Advanced', seats: 14, status: 'Open' },
];
@Component({
  selector: 'ngx-data-examples',
  imports: [
    MaterialDemo,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ngx-material-demo [heading]="heading()">
    @if (view() === 'tree') {
      @if (empty()) {
        <p class="demo-empty">No resources in this workspace.</p>
      } @else {
        <div class="demo-row">
          <button mat-button (click)="tree.expandAll()">Expand all resources</button
          ><button mat-button (click)="tree.collapseAll()">Collapse all resources</button>
        </div>
        <mat-tree
          #tree
          [dataSource]="nodes"
          [childrenAccessor]="childrenAccessor"
          aria-label="Workshop resource tree"
          ><mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding
            ><button mat-button (click)="selected.set(node.name)">
              <mat-icon svgIcon="ngx:code" />{{ node.name }}
            </button></mat-tree-node
          ><mat-tree-node
            *matTreeNodeDef="let node; when: hasChildren"
            matTreeNodePadding
            [isExpandable]="true"
            ><button mat-icon-button matTreeNodeToggle [attr.aria-label]="'Toggle ' + node.name">
              <mat-icon [svgIcon]="tree.isExpanded(node) ? 'ngx:close' : 'ngx:chevron'" /></button
            ><span>{{ node.name }}</span></mat-tree-node
          ></mat-tree
        >
      }
      <p class="demo-result" role="status">
        {{ selected() || 'Select a resource to inspect it.' }}
      </p>
    } @else if (view() === 'paginator') {
      <mat-paginator
        [length]="empty() ? 0 : 124"
        [pageSize]="10"
        [pageSizeOptions]="[5, 10, 25, 50]"
        [disabled]="disabled()"
        showFirstLastButtons
        aria-label="Workshop pagination"
        (page)="pageChanged($event)"
      />
      <p class="demo-result" aria-live="polite">
        Page {{ page() + 1 }} / {{ pageSize() }} items per page
      </p>
    } @else {
      <mat-form-field subscriptSizing="dynamic" appearance="outline"
        ><mat-label>Filter workshops</mat-label
        ><input
          matInput
          [ngModel]="filter()"
          (ngModelChange)="applyFilter($event)"
          [disabled]="loading()"
        /><mat-hint>Filter by title, level or status.</mat-hint></mat-form-field
      >
      @if (loading()) {
        <mat-progress-bar mode="indeterminate" aria-label="Loading workshop rows" />
      }
      <div
        class="demo-table-scroll"
        role="region"
        tabindex="0"
        aria-label="Scrollable workshop table"
      >
        <table
          mat-table
          [dataSource]="data"
          matSort
          [matSortDisabled]="disabled()"
          (matSortChange)="sortChanged($event)"
          aria-label="Workshops"
        >
          <ng-container matColumnDef="name"
            ><th mat-header-cell *matHeaderCellDef mat-sort-header>Workshop</th>
            <td mat-cell *matCellDef="let row">{{ row.name }}</td></ng-container
          ><ng-container matColumnDef="level"
            ><th mat-header-cell *matHeaderCellDef mat-sort-header>Level</th>
            <td mat-cell *matCellDef="let row">{{ row.level }}</td></ng-container
          ><ng-container matColumnDef="seats"
            ><th mat-header-cell *matHeaderCellDef mat-sort-header>Seats</th>
            <td mat-cell *matCellDef="let row">{{ row.seats }}</td></ng-container
          ><ng-container matColumnDef="status"
            ><th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let row">{{ row.status }}</td></ng-container
          >
          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns"></tr>
          <tr class="mat-row" *matNoDataRow>
            <td [attr.colspan]="columns.length" class="demo-empty">
              {{ loading() ? 'Loading local example…' : 'No workshops match your filter.' }}
            </td>
          </tr>
        </table>
      </div>
      <mat-paginator
        [pageSize]="5"
        [pageSizeOptions]="[5, 10, 25]"
        [disabled]="loading()"
        showFirstLastButtons
        aria-label="Workshop table pages"
      />
      <p class="demo-result" role="status">
        {{ sortMessage() || 'Sort column headers, filter rows or change pages.' }}
      </p>
    }
  </ngx-material-demo>`,
})
export class DataExamples implements AfterViewInit {
  readonly view = input('table');
  readonly heading = input('Data table');
  readonly empty = input(false);
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly data = new MatTableDataSource<Workshop>(WORKSHOPS);
  readonly columns = ['name', 'level', 'seats', 'status'];
  readonly filter = signal('');
  readonly sortMessage = signal('');
  readonly selected = signal('');
  readonly page = signal(0);
  readonly pageSize = signal(10);
  readonly paginator = viewChild(MatPaginator);
  readonly sort = viewChild(MatSort);
  readonly nodes: ResourceNode[] = [
    { name: 'Foundations', children: [{ name: 'Tokens' }, { name: 'Typography' }] },
    {
      name: 'Components',
      children: [
        { name: 'Panels', children: [{ name: 'Shapes' }, { name: 'Transitions' }] },
        { name: 'Material controls' },
      ],
    },
  ];
  readonly childrenAccessor = (node: ResourceNode) => node.children ?? [];
  readonly hasChildren = (_: number, node: ResourceNode) => !!node.children?.length;
  constructor() {
    effect(() => {
      this.data.data = this.empty() || this.loading() ? [] : WORKSHOPS;
    });
  }
  ngAfterViewInit(): void {
    this.data.paginator = this.paginator() ?? null;
    this.data.sort = this.sort() ?? null;
  }
  applyFilter(value: string): void {
    this.filter.set(value);
    this.data.filter = value.trim().toLowerCase();
    this.data.paginator?.firstPage();
  }
  sortChanged(sort: Sort): void {
    this.sortMessage.set(
      sort.direction ? `Sorted ${sort.active} ${sort.direction}` : 'Sorting cleared',
    );
  }
  pageChanged(event: PageEvent): void {
    this.page.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
