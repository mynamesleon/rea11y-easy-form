const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const postcss = require('rollup-plugin-postcss');
const terser = require('@rollup/plugin-terser');
const copy = require('rollup-plugin-copy');

/**
 * @todo: investigate handling to allow for 
 * dompurify, aria-autocomplete, and react-beautiful-dnd
 * to be optional peer dependencies, without imports in the main bundle,
 * and without causing warnings in consuming packages.
 * 
 * For now, we will **trust** that tree-shaking should work
 * for any larger dependencies in components that are not used;
 * however, the dynamic import for EasyForm defaults may be an issue
 * dependingo on how it is handled.
 */ 

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      dir: 'build/cjs',
      format: 'cjs',
      sourcemap: true,
    },
    {
      dir: 'build/esm',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({ minimize: true }),
    terser(),
    copy({
      targets: [
        {
          src: 'src/variables.less',
          dest: 'build',
          rename: 'variables.less',
        },
      ],
    }),
  ],
};