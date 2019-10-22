// Stonks and Slonks Logic: State Type Def
import { Stock } from "../stocks";

interface OwnedStonk {
  stonk: Stock;
  boughtPrice: number;
}
interface PlayerState {
  money: number;
  ownedStonks: OwnedStonk[]
}
interface GameState {
  player: PlayerState;
  stonkMarket: Stock[]
  day: number;
  startTime: number;
};

let state: GameState = undefined as any;

export function setState(newState: GameState) {
  state = newState;
}

export default state;
