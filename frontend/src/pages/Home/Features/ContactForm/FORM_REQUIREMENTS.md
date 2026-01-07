# Contact Form Requirements

## Scale
- **25 fields total** (3 working, 22 to add)
- Currently: name, email, phone, address, customMessage
- Add fields progressively as needed


## Field States (6 Total)

| State | Border Color | When | Behavior |
|-------|-------------|------|----------|
| **Default** | Default gray | Field untouched | Initial state |
| **Active** | White | User typing, focused, or interacting | Timer resets on any action |
| **Warning** | Orange | Validation failed after debounce | Shows after ~debounceTimeVariable inactivity |
| **Validated** | Green | Validation passed after debounce | Shows after ~debounceTimeVariable inactivity |
| **Error** | Red | Orange field submitted | Submit attempt on invalid field |
| **Locked** | Green (disabled) | After successful submit | Field locked, read-only | greyed out UI effect

## Validation Timing
- **Debounce delay:** ~debounceTimeVariable (tunable, will be refined in UX testing) 
- **Actions that reset timer → Active state:**
  - Keystrokes
  - Focus  
  - Paste
  - Cut
  - Autofill
  - Changing autofill
  - Possible edge cases
- Instant validation Actions (no debounce):
  - Blur (lose focus)
  - Submit attempt
  - dropdown selection

## Validation Behavior
- Validation runs in background but only displays after debounce timer
- Validation results (green/orange) show even while field is focused
- Cross-field validation (email/phone) doesn't interrupt active fields
- One timer per field, no race conditions
- **At least one required:** email OR phone

## Submit Behavior
1. User clicks submit
2. If any field has Warning (orange) → change to Error (red)
3. If all valid → lock all fields (green, disabled)
4. Show success message + "Submit Again" button
5. **No auto-reset** - user keeps their data visible
6. "Submit Again" button unlocks fields for editing

## Data Persistence
- **Session storage:** Save form data via API on submit
- **No auto-save:** Only persist on successful submit
- Form data remains visible after submit (locked state)

## Styling
- **Single location:** All styles in one place (inline OR CSS file, not both)
- **Explicit styles:** Prefer explicit over abstracted for debugging
- **Current approach:** needs migration from inline to CSS file

## Technical Constraints
- ❌ No external form libraries (React Hook Form, Zod, Formik, etc.)
- ❌ No dependency approval process
- Must scale easily to 25+ fields and 
- field validation may depend on other field inputs later (starting small with email or phone example)
- Config-driven approach (add field = update config + JSX)

## Integration Points
- `GoogleAddrAndMap` - address input and map display
- `BreakpointContext` - global context used for responsive layout
- CSS variables: `--text-color`, `--My-LightGreen`, `--My-Orange`, `--My-Red` (TBD)
- Responsive grid: 3 columns desktop, 1 column mobile (xsm breakpoint)

## Next Steps (Post-UI)
1. API integration for form submission
2. Session storage persistence
3. Add remaining 22 fields
4. UX testing to tune debounce timing
5. Accessibility review (ARIA, keyboard nav, screen readers)

## Edge Cases to Handle
- Autofill multiple fields simultaneously
- User submits before validation completes
- Browser back button after submit
- Session expiry during form fill
- Network errors on submit
