// rollup.config.js
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

const name = "onScreenness";

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    minify({
      comments: false,
      sourceMap: true
    })
  ]
};
