// Stonks and Slonks Logic: State Type Def
import { Stock } from '../stocks';
import { Market } from '../stocks/market';

interface PlayerState {
  money: number;
  ownedStonks: Stock[];
  minimumWage: number;
}
interface GameState {
  player: PlayerState;
  market: Market;
  day: number;
  startTime: number;
}

export let state: GameState = undefined as any;

export function setState(newState: GameState) {
  state = newState;
}
