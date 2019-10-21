import { Stock } from "../stocks";

interface PlayerState {
  money: number;
  ownedStonks: Stock[]
}

interface GameState {
  player: PlayerState;
  day: number;
};

let state: GameState = {} as any;

export function setState(newState: GameState) {
  state = newState;
}

export default state;
