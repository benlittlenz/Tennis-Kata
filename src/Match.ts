import { Competitor, Score, Game, ScoreHandler } from "./types";
import { Player } from "./Player";

const pointLookup: { [key: number]: string } = {
  0: "0",
  1: "15",
  2: "30",
  3: "40",
  4: "Advantage",
};

export class Match extends Player {
  private scoreHandler: ScoreHandler;
  private points: [Score, Score];
  private games: [Game, Game];

  constructor(playerOneName: Competitor, playerTwoName: Competitor) {
    super(playerOneName, playerTwoName);
    this.points = [0, 0];
    this.scoreHandler = ScoreHandler.Point;
    this.games = [0, 0];
  }

  public pointWonBy(player: Competitor): void {
    const playerIndex = this.players.findIndex((p: Competitor) => p === player);
    this.points[playerIndex] = this.points[playerIndex] + 1;

    if (this.scoreHandler === ScoreHandler.Point) {
      /*
        Change to deuce or tie-break system IF
            Deuce - IF points are equal and greater than or equal to 3
            Tie-break - IF a games score is 6-6, a tiebreak is played to give
                        a final set score of 7-6
      */
      if (this.isDeuce()) {
        this.scoreHandler = ScoreHandler.Deuce;
        this.points = [0, 0];
      } else if (this.isTieBreak()) {
        this.scoreHandler = ScoreHandler.TieBreak;
      } else {
        this.scoreHandler === ScoreHandler.Point;
      }
    }
    /*
      Increment game count depending on which player won game.
    */
    this.handlePlayerWin();
  }

  private handlePlayerWin(): void {
    if (this.playerOneWonGame()) {
      this.games[0] = this.games[0] + 1;
    } else if (this.playerTwoWonGame()) {
      this.games[1] = this.games[1] + 1;
    }
    return;
  }

  public score(): string {
    const games = `${this.games[0]}-${this.games[1]}`;
    const points = this.getScore();
    //console.log('POINTS: ', points)
    if (points === "") {
      return games;
    }

    return `${games}, ${points}`;
  }
  /*
    Points score must be equal and greater than or equal to 3 for both competitors.
  */
  private isDeuce(): boolean {
    return this.pointsAreEqual() && this.points[0] >= 3 && this.points[1] >= 3
      ? true
      : false;
  }

  private isTieBreak(): boolean {
    return this.games.every((game: number) => game === 6) &&
      Math.max(this.points[0], this.points[1]) < 7
      ? true
      : false;
  }

  /*
      A player must have 4 or more points and 2 points
      ahead of the of the other player to win a game.
  */
  public playerOneWonGame(): boolean {
    if (this.points[0] >= 4 && this.points[0] - this.points[1] >= 2) {
      this.points = [0, 0];
      return true;
    }
    return false;
  }

  public playerTwoWonGame(): boolean {
    if (this.points[1] >= 4 && this.points[1] - this.points[0] >= 2) {
      this.points = [0, 0];
      return true;
    }
    return false;
  }

  /*
    Two conditions are determined which player has won a tennis match:
      - A players points must be greater than or equal to two and 2 points ahead of other player
      - Both games points are greater than or equal to 6 and both both from each player are
        greater than or equal to one. I.e. 7-6 will return player one has won the match.
  */
  public playerOneWonMatch(): boolean {
    const winOnTieBreakRound = this.games.every(
      (game: number) => game >= 6 && this.games[0] - this.games[1] >= 1
    );
    if (
      (this.games[0] >= 6 && this.games[0] - this.games[1] >= 2) ||
      winOnTieBreakRound
    ) {
      return true;
    }
    return false;
  }

  public playerTwoWonMatch(): boolean {
    const winOnTieBreakRound = this.games.every(
      (game: number) => game >= 6 && this.games[1] - this.games[0] >= 1
    );
    if (
      (this.games[1] >= 6 && this.games[1] - this.games[0] >= 2) ||
      winOnTieBreakRound
    ) {
      return true;
    }
    return false;
  }

  private pointsAreEqual(): boolean {
    return this.points[0] === this.points[1] ? true : false;
  }

  public getScore(): string {
    switch (this.scoreHandler) {
      case ScoreHandler.TieBreak:
        return this.getTieBreakScore();
      case ScoreHandler.Deuce:
        return this.getDeuceScore();
      default:
        return this.getPointScore();
    }
  }

  /*
    RETURNS SCORES BY SCORE HANDLER TYPE
  */
  private getTieBreakScore(): string {
    if (this.points.every((d: number) => d === 0)) {
      return "";
    }

    return `${this.points[0]}-${this.points[1]}`;
  }

  private getPointScore(): string {
    if (
      (this.points[0] === 0 && this.points[1] === 0 && this.games[0] > 0) ||
      this.games[1] > 0
    ) {
      return "";
    }

    return `${pointLookup[this.points[0]]}-${pointLookup[this.points[1]]}`;
  }

  private getDeuceScore(): string {
    if (this.pointsAreEqual()) {
      return "Deuce";
    }
    if (this.points[0] > this.points[1]) {
      return `Advantage ${this.players[0]}`;
    }

    return `Advantage ${this.players[1]}`;
  }
}
