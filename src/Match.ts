
import { Player, Score, Game, Deuce, Tie, ScoreHandler } from './types'

const pointLookup: { [key: number]: string } = {
    0: '0',
    1: '15',
    2: '30',
    3: '40',
    4: 'Advantage'
};

export class Match {
    public winner?: Player;

    private players: [Player, Player];
    private scoreHandler: ScoreHandler;
    private points: [Score, Score];
    private games: [Game, Game];

    constructor(playerOneName: Player, playerTwoName: Player) {
        this.players = [playerOneName, playerTwoName];
        this.points = [0, 0];
        this.scoreHandler = ScoreHandler.Point;
        this.games = [0, 0];
    }

    public pointWonBy(player: Player): void {
        const playerIndex = this.players.findIndex((p: Player) => p === player)
        this.points[playerIndex] = this.points[playerIndex] + 1;

        if (this.scoreHandler === ScoreHandler.Point) {
            if (this.isDeuce()) {
                // Change to deuce system and reset points
                this.scoreHandler = ScoreHandler.Deuce;
                this.points = [0, 0];
            } else if (this.isTieBreak()) {
                this.scoreHandler = ScoreHandler.TieBreak;
            } else {
                this.scoreHandler === ScoreHandler.Point
            }
        }
        /*
            Increment game count by players game count
        */

        this.handlePlayerWin();

    }

    public handlePlayerWin(): void {
        if (this.playerOneWonGame()) {
            this.games[0] = this.games[0] + 1;
        } else if (this.playerTwoWonGame()) {
            this.games[1] = this.games[1] + 1;
        }

        return;
    }

    public score(): string {
        const games = `${this.games[0]}-${this.games[1]}`
        const points = this.getScore();
        //console.log('POINTS: ', points)
        if (points === "") {
            return games;
        }

        return `${games}, ${points}`;
    }

    public isDeuce(): boolean {
        return this.pointsAreEqual() && (this.points[0] >= 3 && this.points[1] >= 3) ? true : false;
    }

    public isTieBreak(): boolean {
        return this.games.every((game: number) => game === 6)
            && Math.max(this.points[0], this.points[1]) < 7
            ? true
            : false;
    }

    public isAdvantagePlayerOne(): boolean {
        return this.points[0] >= 4 && this.points[0] - this.points[1] === 1 ? true : false;
    }

    public isAdvantagePlayerTwo(): boolean {
        return this.points[1] >= 4 && this.points[1] - this.points[0] === 1 ? true : false;
    }

    /*
        A player wins a game by winning at least
    */
    public playerOneWonGame(): boolean {
        if (this.points[0] >= 4 && (this.points[0] - this.points[1] >= 2)) {
            this.points = [0, 0];
            return true;
        }
        return false;
    }

    public playerTwoWonGame(): boolean {
        if (this.points[1] >= 4 && (this.points[1] - this.points[0] >= 2)) {
            this.points = [0, 0];
            return true;
        }
        return false;
    }

    public playerOneWonMatch(): boolean {
        if (this.games[0] >= 6 && (this.games[0] - this.games[1] >= 2)) {
            return true;
        }
        return false;
    }

    public playerTwoWonMatch(): boolean {
        if (this.games[1] >= 6 && (this.games[1] - this.games[0] >= 2)) {
            return true;
        }
        return false;
    }

    public getScore(): string {
        switch (this.scoreHandler) {
            case ScoreHandler.TieBreak:
                return this.getTieBreakScore();
            case ScoreHandler.Deuce:
                return this.getDeuceScore()
            default:
                return this.getPointScore();
        }
    }

    public pointsAreEqual(): boolean {
        return this.points[0] === this.points[1] ? true : false;
    }

    public getTieBreakScore(): string {
        if (this.points.every((d: number) => d === 0)) {
            return "";
        }

        return `${this.points[0]}-${this.points[1]}`
    }

    public getPointScore(): string {
        if ((this.points[0] === 0 && this.points[1] === 0) && this.games[0] > 0 || this.games[1] > 0) {
            return "";
        }

        return `${pointLookup[this.points[0]]}-${pointLookup[this.points[1]]}`;
    }

    public getDeuceScore(): string {
        if (this.pointsAreEqual()) {
            return "Deuce";
        }
        if (this.points[0] > this.points[1]) {
            return `Advantage ${this.players[0]}`;
        }

        return `Advantage ${this.players[1]}`;
    }
}
