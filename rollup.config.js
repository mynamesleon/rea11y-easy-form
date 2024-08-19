const dynamicImportVars = require('@rollup/plugin-dynamic-import-vars');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const postcss = require('rollup-plugin-postcss');
const terser = require('@rollup/plugin-terser');
const copy = require('rollup-plugin-copy');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      dir: 'build/cjs',
      format: 'cjs',
      sourcemap: true,
      minifyInternalExports: true,
    },
    {
      dir: 'build/esm',
      format: 'esm',
      sourcemap: true,
      minifyInternalExports: true,
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
    dynamicImportVars(),
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
