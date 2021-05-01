import { Player, Score, Game, Deuce } from './types'

const pointLookup: { [key: number]: string } = {
    0: '0',
    1: '15',
    2: '30',
    3: '40',
    4: 'Advantage'
};

export class Match {
    private players: [Player, Player];
    private points: [Score, Score];
    private games: [Game, Game];
    private deuces: [Deuce, Deuce];

    constructor(playerOneName: Player, playerTwoName: Player) {
        this.players = [playerOneName, playerTwoName];
        this.points = [0, 0];
        this.games = [0, 0];
        this.deuces = [0, 0];
    }

    public pointWonBy(player: Player): void {
        const index = this.players.findIndex((p: Player) => p === player)
        this.points[index] = this.points[index] + 1;

        if (this.isDeuce()) {
            this.deuces[index] = this.deuces[index] + 1;
            return
        }

        if(this.playerOneWon()) {
            this.games[0] = this.games[0] + 1;
        }

        if(this.playerTwoWon()) {
            this.games[1] = this.games[1] + 1;
        }
    }

    public score(): string {
        const games = `${this.games[0]}-${this.games[1]}`
        const points = this.getScore();
        if(points === "") {
            return games;
        }
        return `${games}, ${points}`;
    }

    public isDeuce(): boolean {
        return this.pointsAreEqual() && (this.points[0] >= 3 && this.points[1] >= 3) ? true : false;
    }

    public isAdvantagePlayerOne(): boolean {
        return this.points[0] >= 4 && this.points[0] - this.points[1] === 1 ? true : false;
    }

    public isAdvantagePlayerTwo(): boolean {
        return this.points[1] >= 4 && this.points[1] - this.points[0] === 1 ? true : false;
    }

    public playerOneWon(): boolean {
        return this.points[0] >= 4 && (this.points[0] - this.points[1] >= 2) ? true : false;
    }

    public playerTwoWon(): boolean {
        return this.points[1] >= 4 && (this.points[1] - this.points[0] >= 2) ? true : false;
    }

    public getScore(): string {
        if (this.isDeuce()) {
            return 'Deuce';
        }

        if (this.isAdvantagePlayerOne()) {
            return `Advantage ${this.players[0]}`
        }

        if (this.isAdvantagePlayerTwo()) {
            return `Advantage ${this.players[1]}`
        }

        if(this.playerOneWon()) return ""
        if(this.playerTwoWon()) return ""

        return `${pointLookup[this.points[0]]}-${pointLookup[this.points[1]]}`;
    }

    public pointsAreEqual(): boolean {
        return this.points[0] === this.points[1] ? true : false;
    }
}