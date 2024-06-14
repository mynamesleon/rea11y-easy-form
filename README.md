# rea11y-easy-form

![License: MIT](https://img.shields.io/npm/l/rea11y-easy-form)
![NPM version](https://img.shields.io/npm/v/rea11y-easy-form.svg)
![Types](https://img.shields.io/npm/types/rea11y-easy-form)
![Tree Shaking](https://flat.badgen.net/bundlephobia/tree-shaking/rea11y-easy-form)

![React](https://img.shields.io/badge/React-%2320232a.svg?logo=React&logoColor=%2361DAFB)
![React Final Form](https://img.shields.io/badge/React%20Final%20Form-%23333639.svg?logo=react&logoColor=white)

The (hopefully!) easiest way to build highly performant and accessible forms in React.

Built on top of `react-final-form` (for its subscription-based form state management), the key goals and features of `rea11y-easy-form` are:

1. Accessibility
2. Simplicity
3. Extensibility
4. Performance

In that order too!

With a number of built-in components developed for accessibility, and the ability to easily use your own, `rea11y-easy-form` should have you covered.

[View the components and docs in Storybook](https://mynamesleon.github.io/rea11y-easy-form/).

## Install

`react-final-form` and `final-form` are required peer dependencies for all of the core functionality.

```shell
npm install rea11y-easy-form react-final-form final-form
# or
yarn add rea11y-easy-form react-final-form final-form
```

Certain components require additional peer dependencies as well. They are only needed if you plan to use those components though.

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
npm i --save ../rea11y-easy-form
```

which will install the local component library as a dependency in `test-app`. It'll then appear as a dependency in `package.json` like:

```
  ...
  "dependencies": {
    ...
    "rea11y-easy-form": "file:../rea11y-easy-form",
    ...
  },
  ...
```
