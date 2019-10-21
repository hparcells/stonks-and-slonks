import { Stock } from "../stocks";
import { Timescale } from "./handlers/time-handler";

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
  timescale: Timescale;
  paused: boolean;
  startTime: number;
};

let state: GameState = {} as any;

export function setState(newState: GameState) {
  state = newState;
}

export default state;
