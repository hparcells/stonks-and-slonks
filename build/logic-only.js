import { start } from 'repl'
import * as rawLogic from '../src/logic';
import chalk from 'chalk';

/** Removes [Object: null prototype] from the console.log */
function clean(obj) {
  if (typeof obj !== 'object') {
    return obj;
  } else {
    return Array.isArray(obj)
      ? [ ...obj ].map(x => clean(x))
      : Object.keys(obj).reduce((newObj, key) => ({ ...newObj, [key]: clean(obj[key]) }), {});
  }
}

// process the logic object.
const logic = clean(rawLogic);

// Message
process.stdout.write('\n\n\n\n\n\n');
process.stdout.write(chalk.green.bold('Compiled Successfully!\n'));
console.log(
`Inside of this program, you can mess around with the game logic stored in
./logic. All of the exports from ./logic/index.ts are available as globals
in this Node.JS REPL. You can also open chrome://inspect and use it's console.
`);
console.log('The logic object is as follows\n', logic, '\n');

// Create a REPL instance.
const instance = start('> ');

// Copy every key from the logic export to the REPL's global object.
Object.keys(logic).forEach((key) => {
  instance.context[key] = {};
});

instance.context.logic = logic;
