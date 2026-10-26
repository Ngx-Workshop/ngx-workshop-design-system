import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MaterialDemo } from './demo-shell';
@Component({
  selector: 'ngx-navigation-examples',
  imports: [
    MaterialDemo,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ngx-material-demo [heading]="heading()">
    @switch (view()) {
      @case ('menu') {
        <button mat-stroked-button [matMenuTriggerFor]="actions" [disabled]="disabled()">
          Workshop actions</button
        ><mat-menu #actions="matMenu"
          ><button mat-menu-item (click)="action.set('Workshop opened')">
            <mat-icon svgIcon="ngx:folder" />Open workshop</button
          ><button mat-menu-item [matMenuTriggerFor]="exports">
            <mat-icon svgIcon="ngx:download" />Export</button
          ><button mat-menu-item disabled>Publish (no permission)</button
          ><button mat-menu-item (click)="action.set('Workshop archived')">
            Archive
          </button></mat-menu
        ><mat-menu #exports="matMenu"
          ><button mat-menu-item (click)="action.set('JSON export selected')">JSON</button
          ><button mat-menu-item (click)="action.set('Markdown export selected')">
            Markdown
          </button></mat-menu
        >
        <p class="demo-result" role="status">
          {{ action() || 'Open the menu; explore nested exports and disabled actions.' }}
        </p>
      }
      @case ('sidenav') {
        <div class="demo-row">
          <button mat-stroked-button (click)="drawer.toggle()">Toggle navigation</button
          ><button mat-button (click)="over.set(!over())">
            Use {{ over() ? 'side' : 'overlay' }} mode
          </button>
        </div>
        <mat-sidenav-container class="demo-drawer"
          ><mat-sidenav
            #drawer
            [mode]="over() ? 'over' : 'side'"
            [opened]="expanded()"
            aria-label="Workshop navigation"
            ><mat-nav-list>
              @for (item of ['Overview', 'Sessions', 'Resources']; track item) {
                <a
                  mat-list-item
                  href="#"
                  (click)="$event.preventDefault(); action.set(item); over() && drawer.close()"
                  >{{ item }}</a
                >
              }
            </mat-nav-list></mat-sidenav
          ><mat-sidenav-content
            ><h2>{{ action() || 'Overview' }}</h2>
            <p>
              A contained navigation example. Overlay mode demonstrates the backdrop and Escape
              behavior.
            </p>
            <button mat-flat-button (click)="drawer.open()">
              Open navigation
            </button></mat-sidenav-content
          ></mat-sidenav-container
        >
      }
      @case ('toolbar') {
        <mat-toolbar
          ><button
            mat-icon-button
            aria-label="Toggle workshop menu"
            (click)="toolbarOpen.set(!toolbarOpen())"
          >
            <mat-icon svgIcon="ngx:menu" /></button
          ><span>Workshop console</span><span class="demo-spacer"></span
          ><button
            mat-icon-button
            aria-label="View notifications"
            [disabled]="disabled()"
            (click)="action.set('No new notifications')"
          >
            <mat-icon svgIcon="ngx:notifications" /></button
        ></mat-toolbar>
        @if (toolbarOpen()) {
          <mat-nav-list
            ><a
              mat-list-item
              href="#"
              (click)="$event.preventDefault(); action.set('Overview selected')"
              >Overview</a
            ><a
              mat-list-item
              href="#"
              (click)="$event.preventDefault(); action.set('Resources selected')"
              >Resources</a
            ></mat-nav-list
          >
        }
        <p class="demo-result" role="status">
          {{ action() || 'Activate the menu or notification action.' }}
        </p>
      }
      @case ('tabs') {
        <mat-tab-group
          [selectedIndex]="selected()"
          (selectedIndexChange)="selected.set($event)"
          animationDuration="0ms"
          ><mat-tab label="Overview"
            ><div class="demo-tab-content">
              <h2>Session overview</h2>
              <p>Reactive Angular interfaces, built on shared foundations.</p>
            </div></mat-tab
          ><mat-tab label="Resources"
            ><div class="demo-tab-content">
              <h2>Workshop resources</h2>
              <p>Source code, exercises and component references.</p>
            </div></mat-tab
          ><mat-tab label="Analytics" [disabled]="disabled()"
            ><div class="demo-tab-content">
              <h2>Session analytics</h2>
              <p>24 registrations, 18 active participants.</p>
            </div></mat-tab
          ></mat-tab-group
        >
        <p class="demo-result" aria-live="polite">Active tab: {{ selected() + 1 }}</p>
      }
    }
  </ngx-material-demo>`,
})
export class NavigationExamples {
  readonly view = input('menu');
  readonly heading = input('Menu');
  readonly disabled = input(false);
  readonly expanded = input(false);
  readonly action = signal('');
  readonly over = signal(false);
  readonly toolbarOpen = signal(false);
  readonly selected = signal(0);
}
