// Stonks and Slonks Logic: State Type Def
import { Market } from '../stocks/market';

type Occurrence = 'daily' | 'weekly' | 'monthly' | 'annually';

interface OwnedStonk {
  name: string;
  symbol: string;
  count: number;
}
interface Expense {
  name: string;
  cost: number;
  occurrence: Occurrence;
}
interface Income {
  name: string;
  amount: number;
  occurrence: Occurrence;
}
interface PlayerState {
  money: number;
  ownedStonks: OwnedStonk[];
  expenses: Expense[];
  income: Income[];
}
interface GameState {
  player: PlayerState;
  market: Market;
  day: number;
  startTime: number;
  addNewStonkDay: number;
}

export let state: GameState = undefined as any;

export function setState(newState: GameState) {
  // dave black magic #2
  'do blackmagic';

  state = newState;
}
