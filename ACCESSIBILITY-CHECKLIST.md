# TofuPass Accessibility Checklist

## Keyboard
- Can reach every interactive element with Tab.
- Tab order follows the visual order.
- Focus is always visible.
- No keyboard traps.
- Enter/Space activate controls correctly.

## Screen readers
- Each page has one h1.
- Main navigation is labeled.
- Main content is inside `<main>`.
- Generated passwords/passphrases have accessible labels.
- Copy and generation status messages are announced.
- Icon-only links have accessible names.
- Decorative images use empty alt text.
- Meaningful mascot images have useful alt text.

## Motion
- Site respects prefers-reduced-motion.
- Mascot animations and decorative motion are reduced or disabled when requested.

## Forms and controls
- Inputs have labels.
- Show/Hide password controls expose state.
- Selectable cards expose selected state.
- Help text is not hover-only.

## Visual
- Text contrast meets WCAG AA where practical.
- Focus states are high contrast.
- Selected states do not rely on color alone.
- Touch targets are large enough.

## Content
- Technical security language has plain-English explanations.
- Instructions do not rely only on color, position, or hover.
- No shame-based security language.
