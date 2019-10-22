// import some plugins
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';

// the config:
export default {
  // this file imports logic and gives a node.js prompt
  input: './build/logic-only.js',
  plugins: [
    // fix the import resolver because by default it doesn't work.
    resolve({ extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']}),
    // add typescript compiling
    typescript(),
  ],
  // output the file
  output: {
    file: './out/logic-repl.js',
    format: 'cjs'
  }
}
