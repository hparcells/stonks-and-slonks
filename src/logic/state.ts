// Stonks and Slonks Logic: State Type Def
import { Market } from '../stocks/market';

interface OwnedStonk {
  name: string;
  symbol: string;
  count: number;
}
interface PlayerState {
  money: number;
  ownedStonks: OwnedStonk[];
  minimumWage: number;
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
