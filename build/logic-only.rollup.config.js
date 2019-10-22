// import some plugins
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

// this is a plugin taken from this github issue comment.
// https://github.com/rollup/rollup-plugin-commonjs/issues/261#issuecomment-519018169
const removeShebang = (options = {}) => ({
  name: 'rollup-plugin-remove-shebang',
  transform: (code, id) => {
    return code.replace(/[\s\n]*#!.*[\s\n]*/, '');
  }
});

// the config:
export default {
  // this file imports logic and gives a node.js prompt
  input: './build/logic-only.js',
  plugins: [
    // remove the shebang
    removeShebang(),
    // add typescript compiling
    typescript({
      rollupCommonJSResolveHack: true
    }),
    //
    commonjs(),
    // fix the import resolver because by default it doesn't work.
    resolve({
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      preferBuiltins: true,
    }),
  ],
  // output the file
  output: {
    file: './out/logic-repl.js',
    format: 'cjs'
  }
}
