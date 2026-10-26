import { Injectable, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
/** Original, local SVG examples. No icon fonts or external requests. */
@Injectable({ providedIn: 'root' })
export class DemoIcons {
  private readonly registry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);
  register(): void {
    const paths: Record<string, string> = {
      menu: 'M4 6h16M4 12h16M4 18h16',
      close: 'M6 6l12 12M18 6L6 18',
      arrow: 'M5 12h14M13 6l6 6-6 6',
      check: 'M4 12l5 5L20 6',
      add: 'M12 4v16M4 12h16',
      delete: 'M4 6h16M9 6V3h6v3M7 6l1 15h8l1-15',
      code: 'M8 6l-6 6 6 6M16 6l6 6-6 6M14 3l-4 18',
      star: 'M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z',
      folder: 'M3 6h7l2 3h9v11H3z',
      chevron: 'M9 5l7 7-7 7',
      download: 'M12 3v12M7 10l5 5 5-5M4 17v4h16v-4',
      info: 'M12 10v7M12 6v1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
      settings: 'M4 7h16M4 17h16M8 4v6M16 14v6',
      notifications: 'M6 17V9a6 6 0 0 1 12 0v8l2 2H4zM10 22h4',
    };
    for (const [name, d] of Object.entries(paths))
      this.registry.addSvgIconLiteralInNamespace(
        'ngx',
        name,
        this.sanitizer.bypassSecurityTrustHtml(
          `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`,
        ),
      );
  }
}
