import { ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
  selector: 'ngx-material-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<main class="material-demo">
    <header>
      <span class="demo-eyebrow">NGX / MATERIAL LAB</span>
      <h1>{{ heading() }}</h1>
      <p>{{ description() }}</p>
    </header>
    <section class="demo-workspace"><ng-content /></section>
  </main>`,
})
export class MaterialDemo {
  readonly heading = input.required<string>();
  readonly description = input(
    'Public Material components. Shared Ngx tokens. Live local interactions.',
  );
}
