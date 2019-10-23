// Stonks and Slonks Logic: State Type Def
import { Stock } from '../stocks';

interface PlayerState {
  money: number;
  ownedStonks: Stock[];
}
interface GameState {
  player: PlayerState;
  stonkMarket: Stock[];
  day: number;
  startTime: number;
}

export let state: GameState = undefined as any;

export function setState(newState: GameState) {
  state = newState;
}
