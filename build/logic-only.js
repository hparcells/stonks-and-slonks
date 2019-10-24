import { start } from 'repl'
import chalk from 'chalk';
import * as rawLogic from '../src/logic';
import * as rawStocksEngine from '../src/stocks';


/** Removes [Object: null prototype] from the console.log */
function clean(obj) {
  if (typeof obj !== 'object' || obj.prototype) {
    return obj;
  } else {
    return Array.isArray(obj)
      ? [...obj].map(x => clean(x))
      : Object.keys(obj).reduce((newObj, key) => ({ ...newObj, [key]: clean(obj[key]) }), {});
  }
}

const logic = clean(rawLogic);
const stocks = clean(rawStocksEngine);


// Message
process.stdout.write('\n\n\n\n\n\n');
process.stdout.write(chalk.green.bold('Compiled Successfully!\n'));
console.log(
`Inside of this program, you can mess around with the game logic and the stock engine.
All of the exports from ./logic and ./stocks are available as globals
in this Node.JS REPL. You can also open chrome://inspect and use it's console.
`);
console.log('The stocks object is as follows\n', stocks, '\n');
console.log('The logic object is as follows\n', logic, '\n');

// Create a REPL instance.
const instance = start('> ');

// Copy every key from the logic export to the REPL's global object.
Object.keys(stocks).forEach((key) => {
  instance.context[key] = stocks[key];
});
Object.keys(logic).forEach((key) => {
  instance.context[key] = logic[key];
});

instance.context.logic = logic;
instance.context.stocks = stocks;

global.___updateState = function(ns) {
  logic.state = ns;
  instance.context.state = ns;
}
