# rea11y-easy-form (IN PROGRESS!)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/rea11y-easy-form.svg)](http://npm.im/rea11y-easy-form)

The (hopefully!) easiest way to build highly performant and accessible forms in React.

Built on top of `react-final-form` (for its subscription-based form state management), the key goals and features of `rea11y-easy-form` are:

1. Accessibility
2. Simplicity
3. Extensibility
4. Performance

In that order too!

With a number of built-in components developed for accessibility, and the ability to easily use your own, `rea11y-easy-form` should have you covered.

[View the components and docs in Storybook](https://mynamesleon.github.io/rea11y-easy-form/).

## Development

### Testing

```
npm run test
```

### Building

```
npm run build
```

### Storybook

To run a live-reload Storybook server on your local machine:

```
npm run storybook
```

### Generating New Components

```
npm run generate YourComponentName
```

This will generate:

```
/src
  /YourComponentName
    YourComponentName.tsx
    YourComponentName.stories.tsx
    YourComponentName.test.tsx
    YourComponentName.types.ts
```

### Installing Component Library Locally

Let's say you have another project (`test-app`) on your machine that you want to try installing the component library into without having to first publish the component library. In the `test-app` directory, you can run:

```
npm i --save ../react-component-library
```

which will install the local component library as a dependency in `test-app`. It'll then appear as a dependency in `package.json` like:

```
  ...
  "dependencies": {
    ...
    "react-component-library": "file:../react-component-library",
    ...
  },
  ...
```
