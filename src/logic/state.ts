// Stonks and Slonks Logic: State Type Def
import { Market } from '../stocks/market';

/** Options for how often an expense of an income source will be triggered. */
type Occurrence = 'daily' | 'weekly' | 'monthly' | 'annually';

interface OwnedStonk {
  /** The name of the Stonk. Unique. */
  name: string;
  /** The short abbreviation of the Stonk. */
  symbol: string;
  /** How much of this Stonk the player owns. */
  count: number;
}
interface Expense {
  /** The name of this expense/ */
  name: string;
  /** How much money should be removed from the player. */
  cost: number;
  /** How ofthen this expense will be triggered. */
  occurrence: Occurrence;
  /**
   * The amount of times with expense will be triggered before it gets removed.
   * Use -1 to never be removed.
   */
  endIn: number;
}
interface Income {
  /** The name of the income source. */
  name: string;
  /** How much money the income source will give. */
  amount: number;
  /** How often should this income source trigger. */
  occurrence: Occurrence;
  /**
   * The amount of times this income source will be triggered before it gets removed.
   * Use -1 to never be removed.
   */
  endIn: number;
}
interface PlayerState {
  /** How much money the player has. */
  money: number;
  /** The Stonks that the player owns. */
  ownedStonks: OwnedStonk[];
  /** Any expenses that will remove money from the player. */
  expenses: Expense[];
  /** Any income sources that will give the player money. */
  income: Income[];
}
interface GameState {
  /** The player data, including income, expenses, and money. */
  player: PlayerState;
  /** The Stonk Market. Where all the Stonks are stored. */
  market: Market;
  /** How many days we have simulated so far. */
  day: number;
  /** The timestamp of when the game was started. */
  startTime: number;
  /** How many days away when a new Stonk will get added. */
  addNewStonkDay: number;
}

export let state: GameState = undefined as any;

/**
 * Directly sets the game state.
 * @param newState The new state for the game state.
 */
export function setState(newState: GameState) {
  // dave black magic #2
  'do blackmagic';

  state = newState;
}
