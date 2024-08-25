# Accessibility When Developing and Testing

![Author: Leon Slater](https://img.shields.io/badge/Author-Leon_Slater-blue)
![Last update: 2024/08/05](https://img.shields.io/badge/Last_updated-2024/08/25-blue)

Accessibility is a core part of this library and the components it contains. So, at a minimum, all components should be tested with the following document in mind.

## Automated testing

Automated tests can only catch about half of all accessibility issues,
but it's always worth doing.

Suggested tools:

1. an HTML validator (HTML validity should be obvious, but mistakes happen, so check it just in case)
2. [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) (from Chromium devtools)
3. [WAVE](https://wave.webaim.org/) (Chrome extension created by WebAim)

## Manual testing

### Minimum considerations

These considerations will cover most scenarios, particularly at a component level.

1. **Are you using semantic HTML?**
   - This is important for screen reader context, e.g. multiple form controls in a `<fieldset>` with a `<legend>`, `<section>` elements with a heading, etc. all get announced for context
2. **Is all interactive functionality available to keyboard-only users?**
   - can all interactive elements be tabbed to?
   - is it obvious what element currently has focus?
   - does any essential complex functionality have keyboard-only alternatives? (e.g. drag and drop)
3. **Is it clear and functional for users without vision?**
   - points (1) and (2) above will do most of this for you
   - **test using at least NVDA** as it is one of the most widely used screen-readers (bonus points for also testing with other screen-readers, such as TalkBack, Windows Narrator, and VoiceOver). In particular, **test with a screen-reader using only your keyboard**: does everything you can tab to have an announcement that clearly indicates what it's for?
   - Consider if there are elements that need additional text (e.g. icon buttons), or if there are elements that a screen-reader can ignore (e.g. purely presentation iconography that you could set `aria-hidden="true"` for)
4. **Does it work at a viewport width of 320px?**
   - This is to account for the "reflow" criterion: no loss of content or functionality occurs, and horizontal scrolling is avoided
5. **Is it colour contrast compliant?** (if applicable)

### Advanced considerations

There are more things to consider for the library as a whole, and when building whole sites/applications.

In some advanced cases (e.g. the `<AutoComplete>` component) we should also test using speech recognition/input software (such as Dragon NaturallySpeaking) to dictate actions (such as typing a query into a field and making a selection). This is important in very nuanced cases because the software can sometimes suppress JavaScript event listeners. But in the vast majority of situations, this will not happen.

If you are working on more than just isolated components, and need to get into the details of the WCAG spec, I suggest the following resources:

1. **Shortened/simplified lists:**
   - https://accessibility-manual.dwp.gov.uk/tools-and-resources/basic-accessibility-checks
   - https://dequeuniversity.com/checklists/web/
   - https://guides.18f.gov/accessibility/checklist/
2. **Extensive lists:**
   - https://webaim.org/standards/wcag/checklist (filter to level AA)
   - https://www.w3.org/WAI/WCAG22/quickref/
