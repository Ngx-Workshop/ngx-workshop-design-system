export const MATERIAL_CATALOG = [
  {
    key: 'button',
    name: 'Buttons',
    group: 'Actions',
    storyId: 'material-actions-buttons--default',
    states: ['Default', 'Disabled', 'Loading'],
    description:
      'Text, filled, raised, outlined, HUD, icon, floating and extended actions with live feedback.',
  },
  {
    key: 'button-toggle',
    name: 'Button toggle',
    group: 'Actions',
    storyId: 'material-actions-button-toggle--default',
    states: ['Default', 'Disabled'],
    description: 'Single and multiple selection with a live layout/layer readout.',
  },
  {
    key: 'badge',
    name: 'Badge',
    group: 'Feedback',
    storyId: 'material-feedback-badge--default',
    states: ['Default'],
    description:
      'Unread count, hidden zero state, small indicator and disabled badge; clear or increment the count.',
  },
  {
    key: 'icon',
    name: 'Icon',
    group: 'Actions',
    storyId: 'material-actions-icon--default',
    states: ['Default'],
    description:
      'Original local SVG icon registry. Decorative icons and named icon-only actions; no remote font.',
  },
  {
    key: 'progress-bar',
    name: 'Progress bar',
    group: 'Feedback',
    storyId: 'material-feedback-progress-bar--determinate',
    states: ['Determinate', 'Indeterminate'],
    description:
      'Determinate, indeterminate, buffer and query progress. Advance to completion or reset.',
  },
  {
    key: 'progress-spinner',
    name: 'Progress spinner',
    group: 'Feedback',
    storyId: 'material-feedback-progress-spinner--determinate',
    states: ['Determinate', 'Indeterminate'],
    description:
      'Determinate and indeterminate indicators at different diameters; advance local progress.',
  },
  {
    key: 'ripple',
    name: 'Ripples',
    group: 'Actions',
    storyId: 'material-actions-ripples--default',
    states: ['Default', 'Disabled'],
    description:
      'Material core ripple on a semantic keyboard-operable button; effect can be disabled.',
  },
  {
    key: 'input',
    name: 'Input',
    group: 'Forms',
    storyId: 'material-forms-input--default',
    states: ['Default', 'Disabled', 'Invalid', 'Empty'],
    description:
      'Editable single-line input and textarea, hints, character count and touched validation.',
  },
  {
    key: 'form-field',
    name: 'Form field',
    group: 'Forms',
    storyId: 'material-forms-form-field--default',
    states: ['Default', 'Disabled', 'Invalid'],
    description:
      'Filled and outlined appearances, icon/text prefixes and suffixes, hints and validation errors.',
  },
  {
    key: 'autocomplete',
    name: 'Autocomplete',
    group: 'Forms',
    storyId: 'material-forms-autocomplete--default',
    states: ['Default', 'Disabled', 'NoResults'],
    description:
      'Type to filter local topics and select an overlay option; empty results are explicit.',
  },
  {
    key: 'checkbox',
    name: 'Checkbox',
    group: 'Forms',
    storyId: 'material-forms-checkbox--default',
    states: ['Default', 'Disabled', 'Indeterminate'],
    description: 'Checked/unchecked, disabled and indeterminate controls with live state.',
  },
  {
    key: 'radio',
    name: 'Radio button',
    group: 'Forms',
    storyId: 'material-forms-radio-button--default',
    states: ['Default', 'Disabled', 'Unselected'],
    description:
      'Single selection, an unavailable option, unselected state and group disabled state.',
  },
  {
    key: 'select',
    name: 'Select',
    group: 'Forms',
    storyId: 'material-forms-select--default',
    states: ['Default', 'Disabled', 'Invalid', 'Empty'],
    description:
      'Single/multiple selection, grouped options, disabled option and required validation.',
  },
  {
    key: 'slider',
    name: 'Slider',
    group: 'Forms',
    storyId: 'material-forms-slider--default',
    states: ['Default', 'Disabled'],
    description:
      'Discrete seat capacity with ticks and two-thumb duration range, both keyboard operable.',
  },
  {
    key: 'slide-toggle',
    name: 'Slide toggle',
    group: 'Forms',
    storyId: 'material-forms-slide-toggle--default',
    states: ['Default', 'Disabled'],
    description: 'On/off notification preference plus a required disabled toggle.',
  },
  {
    key: 'chips',
    name: 'Chips',
    group: 'Forms',
    storyId: 'material-forms-chips--default',
    states: ['Default', 'Disabled', 'Empty'],
    description:
      'Selectable chips plus an editable tag grid with keyboard addition and accessible remove actions.',
  },
  {
    key: 'datepicker',
    name: 'Datepicker',
    group: 'Date and time',
    storyId: 'material-date-and-time-datepicker--default',
    states: ['Default', 'DateRange', 'Disabled', 'Invalid', 'Empty'],
    description:
      'Native-date calendar, date range, constrained month, empty/invalid/disabled states. Fixed October 2026 demo dates.',
  },
  {
    key: 'timepicker',
    name: 'Timepicker',
    group: 'Date and time',
    storyId: 'material-date-and-time-timepicker--default',
    states: ['Default', 'Disabled', 'Invalid', 'Empty'],
    description:
      'Native-date time dropdown in 30-minute intervals, constrained to 09:00\u201317:00.',
  },
  {
    key: 'menu',
    name: 'Menu',
    group: 'Navigation',
    storyId: 'material-navigation-menu--default',
    states: ['Default', 'Disabled'],
    description:
      'Nested export menu, disabled action and selection feedback. Escape restores trigger focus.',
  },
  {
    key: 'sidenav',
    name: 'Sidenav',
    group: 'Navigation',
    storyId: 'material-navigation-sidenav--closed',
    states: ['Closed', 'Open'],
    description:
      'Contained navigation drawer with side/overlay mode switch and working navigation state.',
  },
  {
    key: 'toolbar',
    name: 'Toolbar',
    group: 'Navigation',
    storyId: 'material-navigation-toolbar--default',
    states: ['Default', 'DisabledAction'],
    description: 'Top-level title, navigation toggle and notification action, with local feedback.',
  },
  {
    key: 'tabs',
    name: 'Tabs',
    group: 'Navigation',
    storyId: 'material-navigation-tabs--default',
    states: ['Default', 'DisabledTab'],
    description:
      'Keyboard-operable tab group, selected-tab readout and optional disabled analytics tab.',
  },
  {
    key: 'card',
    name: 'Card',
    group: 'Layout',
    storyId: 'material-layout-card--default',
    states: ['Default', 'DisabledActions', 'Loading'],
    description:
      'Outlined and raised cards with title/subtitle, content, actions, footer and loading state.',
  },
  {
    key: 'divider',
    name: 'Divider',
    group: 'Layout',
    storyId: 'material-layout-divider--default',
    states: ['Default'],
    description: 'Full-width and inset dividers in a list, plus vertical separators.',
  },
  {
    key: 'expansion',
    name: 'Expansion panel',
    group: 'Layout',
    storyId: 'material-layout-expansion-panel--collapsed',
    states: ['Collapsed', 'Expanded', 'DisabledPanel'],
    description: 'Multi accordion with expand/collapse-all, action row and an unavailable panel.',
  },
  {
    key: 'grid-list',
    name: 'Grid list',
    group: 'Layout',
    storyId: 'material-layout-grid-list--default',
    states: ['Default', 'Compact'],
    description: 'Tile spans and gutters in two-/three-column layouts.',
  },
  {
    key: 'list',
    name: 'List',
    group: 'Layout',
    storyId: 'material-layout-list--default',
    states: ['Default', 'Disabled', 'Empty'],
    description:
      'Selection list with icons, title/supporting lines, unavailable resource and empty state. Navigation lists appear under Sidenav.',
  },
  {
    key: 'stepper',
    name: 'Stepper',
    group: 'Layout',
    storyId: 'material-layout-stepper--linear',
    states: ['Linear', 'Vertical', 'Prefilled'],
    description:
      'Linear validation-gated wizard, back/next, local completion and reset; horizontal/vertical layouts.',
  },
  {
    key: 'dialog',
    name: 'Dialog',
    group: 'Overlays',
    storyId: 'material-overlays-dialog--default',
    states: ['Default', 'Destructive', 'DisabledTrigger'],
    description:
      'Confirm/cancel dialog returns results, with a separate destructive specimen and keyboard focus management.',
  },
  {
    key: 'bottom-sheet',
    name: 'Bottom sheet',
    group: 'Overlays',
    storyId: 'material-overlays-bottom-sheet--default',
    states: ['Default', 'DisabledTrigger'],
    description: 'Action sheet with Markdown/JSON results and dismissal behavior.',
  },
  {
    key: 'snack-bar',
    name: 'Snackbar',
    group: 'Overlays',
    storyId: 'material-overlays-snackbar--success',
    states: ['Success', 'Retry'],
    description:
      'Persistent actionable notifications with Undo/Retry and manual dismissal; no short auto-dismiss timeout.',
  },
  {
    key: 'tooltip',
    name: 'Tooltip',
    group: 'Overlays',
    storyId: 'material-overlays-tooltip--default',
    states: ['Default', 'Disabled', 'Below'],
    description:
      'Hover and keyboard-focus hints, placement controls, disabled hint and Escape dismissal.',
  },
  {
    key: 'table',
    name: 'Table',
    group: 'Data',
    storyId: 'material-data-table--default',
    states: ['Default', 'Empty', 'Loading'],
    description:
      'Local workshop rows with real filtering, sorting and pagination, plus empty/loading states.',
  },
  {
    key: 'sort',
    name: 'Sort header',
    group: 'Data',
    storyId: 'material-data-sort-header--default',
    states: ['Default', 'Disabled'],
    description:
      'Sortable title/level/seat headers with live direction feedback and sorting disabled state.',
  },
  {
    key: 'paginator',
    name: 'Paginator',
    group: 'Data',
    storyId: 'material-data-paginator--default',
    states: ['Default', 'Disabled', 'Empty'],
    description: 'First/last, previous/next, page-size selection and empty/disabled states.',
  },
  {
    key: 'tree',
    name: 'Tree',
    group: 'Data',
    storyId: 'material-data-tree--default',
    states: ['Default', 'Empty'],
    description:
      'Modern childrenAccessor resource tree, nested expansion, expand/collapse-all and leaf selection.',
  },
] as const;
