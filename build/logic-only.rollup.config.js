// import some plugins
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

// this is a plugin taken from this github issue comment.
// https://github.com/rollup/rollup-plugin-commonjs/issues/261#issuecomment-519018169
const removeShebang = (options = {}) => ({
  name: 'rollup-plugin-remove-shebang',
  transform: (code, id) => {
    return {
      code: code.replace(/[\s\n]*#!.*[\s\n]*/, ''),
      map: null
    }
  },
});

// this does some black magic to make the state actually update in the REPL
const blackmagicStateFix = (options = {}) => ({
  name: 'rollup-plugin-blackmagic',
  transform: (code, id) => {
    return {
      code: code.replace(/'do blackmagic'/, `(global as any).___updateState(newState);`),
      map: null
    }
  },
});

// the config:
export default {
  // this file imports logic and gives a node.js prompt
  input: './build/logic-only.js',
  plugins: [
    // remove the shebang
    removeShebang(),
    // blackmagic
    blackmagicStateFix(),
    // add typescript compiling
    typescript({
      rollupCommonJSResolveHack: true
    }),
    // make common js modules not fail
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
    format: 'cjs',
    sourcemap: true
  },
  // dave black magic #1
  external(...args) {
    if(args[0] === 'repl') return true;
    if(args[0] === 'os') return true;
    return args.some(x => String(x).includes('node_modules'));
  }
}
