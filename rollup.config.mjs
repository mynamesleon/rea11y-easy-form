import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

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

const config = {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    format: 'es',
    sourcemap: true,
  },
  treeshake: 'smallest',
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

export default config;
