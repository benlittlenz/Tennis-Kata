import { Competitor } from "../types";

export class Player {
  public players: [Competitor, Competitor];
  constructor(playerOneName: Competitor, playerTwoName: Competitor) {
    this.players = [playerOneName, playerTwoName];
  }
}
