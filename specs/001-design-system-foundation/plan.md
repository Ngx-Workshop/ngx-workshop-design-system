# Implementation plan

Use an Angular CLI workspace: projects/ngx-workshop-ui is an ng-packagr library;
projects/storybook is a runnable Angular demo and hosts .storybook plus stories.
Pin framework packages to the Shell versions and use Storybook 10.6.3, whose published peer range includes Angular 21.
Expose shared status, panel and code-block components; use Material directly for established controls.
Package styles with ng-packagr assets. Map semantic Ngx tokens to mat.theme-overrides and component override mixins.
Use root data-ngx-theme so CDK overlays inherit the selected theme. Neutral theme exercises swapability.
Validate builds, typecheck stories, inspect the built package and exercise the running catalog in a browser.
Authoritative references: https://storybook.js.org/docs/get-started/frameworks/angular and https://github.com/angular/components/blob/21.1.0/guides/theming.md .
Constitution check: all seven principles satisfied by this plan. No data migrations or external integrations.
