import { setState } from "../state";

export function startGame() {
  setState({
    player: {
      money: 100,
      ownedStonks: []
    },
    day: 0
  });
}
