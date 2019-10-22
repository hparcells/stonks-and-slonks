import { start } from 'repl'
import * as logic from '../logic';

// Message
console.clear();
console.log(
`Inside of this program, you can mess around with the game logic stored in
./logic. All of the exports from ./logic/index.ts are available as globals
in this Node.JS REPL.
`);
console.log('The logic object is as follows');
console.log(logic);
console.log();

// Create a REPL instance.
const instance = start('> ');

// Copy every key from the logic export to the REPL's global object.
Object.keys(logic).forEach((key) => {
  instance.context[key] = logic[key];
});

instance.context.logic = logic;
