import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const temp = mkdtempSync(path.join(root, '.consumer-'));
try {
  execFileSync('npm', ['pack', '--pack-destination', temp], {
    cwd: path.join(root, 'dist/ngx-workshop-ui'),
    stdio: 'pipe',
  });
  const { readdirSync } = await import('node:fs');
  const tar = path.join(
    temp,
    readdirSync(temp).find((f) => f.endsWith('.tgz')),
  );
  const target = path.join(temp, 'node_modules/@tmdjr/ngx-workshop-design-system');
  mkdirSync(target, { recursive: true });
  execFileSync('tar', ['-xzf', tar, '--strip-components=1', '-C', target]);
  writeFileSync(
    path.join(temp, 'consumer.ts'),
    `import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {NgxPanel,NgxStatus,NgxCodeBlock,NgxPanelShape,NgxPanelBackground,NgxPanelMotion,NgxButton,NgxButtonShape,NgxCodeLanguage} from '@tmdjr/ngx-workshop-design-system';
@Component({selector:'consumer-test',imports:[NgxPanel,NgxStatus,NgxCodeBlock,NgxButton,MatButtonModule],template:'<ngx-panel heading="Consumer" [shape]="shape" [background]="background" [motion]="motion"><ngx-status label="Ready" /></ngx-panel><ngx-code-block code="const ready = true;" [language]="language" contrast="original" [wrap]="true" /><button mat-flat-button ngxButton [shape]="buttonShape" surface="outline" motion="glitch">Execute</button>'})
export class Consumer { language:NgxCodeLanguage="typescript"; buttonShape: NgxButtonShape = "chevron"; shape: NgxPanelShape = "stepped"; background: NgxPanelBackground = "glass"; motion: NgxPanelMotion = "boot"; }`,
  );
  writeFileSync(
    path.join(temp, 'tsconfig.json'),
    JSON.stringify(
      {
        extends: '../tsconfig.json',
        compilerOptions: { paths: {}, outDir: './out' },
        files: ['./consumer.ts'],
      },
      null,
      2,
    ),
  );
  execFileSync(
    process.execPath,
    [
      path.join(root, 'node_modules/@angular/compiler-cli/bundles/src/bin/ngc.js'),
      '-p',
      path.join(temp, 'tsconfig.json'),
    ],
    { stdio: 'inherit' },
  );
  const sass = await import('sass');
  const result = sass.compileString(
    '@use "pkg:@tmdjr/ngx-workshop-design-system/theme" as ngx; @include ngx.theme();',
    {
      importers: [new sass.NodePackageImporter(temp)],
      loadPaths: [path.join(root, 'node_modules')],
    },
  );
  if (!result.css.includes('--ngx-color-primary: #27f5ef'))
    throw Error('Packaged theme did not emit expected tokens');
  if (
    !result.css.includes('--ngx-code-background: #262335') ||
    !result.css.includes('.ngx-syntax-keyword')
  )
    throw Error('Packaged Synthwave code styles are missing');
  if (
    !readFileSync(path.join(target, 'styles/SYNTHWAVE-LICENSE.txt'), 'utf8').includes(
      '2026 fsegurai',
    )
  )
    throw Error('Missing theme attribution');
  if (
    !result.css.includes('backdrop-filter: blur(var(--ngx-overlay-backdrop-blur') ||
    !result.css.includes('.cdk-overlay-backdrop')
  )
    throw Error('Packaged glass overlay styles are missing');
  const pkg = JSON.parse(readFileSync(path.join(target, 'package.json'), 'utf8'));
  if (!pkg.exports['.'] || !pkg.exports['./theme']) throw Error('Missing exports');
  console.log(
    'PASS: packed tarball compiles in an Angular consumer and resolves packaged Sass through its public export.',
  );
} finally {
  rmSync(temp, { recursive: true, force: true });
}
