import { Player, Score, Game, Deuce, Tie } from './types'

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
    private points: [Score, Score];
    private games: [Game, Game];
    private deuces: [Deuce, Deuce];
    private ties: [Tie, Tie];

    constructor(playerOneName: Player, playerTwoName: Player) {
        this.players = [playerOneName, playerTwoName];
        this.points = [0, 0];
        this.games = [0, 0];
        this.deuces = [0, 0];
        this.ties = [0, 0];
    }

    public pointWonBy(player: Player): void {
        const index = this.players.findIndex((p: Player) => p === player)
        this.points[index] = this.points[index] + 1;

        //console.log(this.points)
        if(this.isTieBreak()) {
            this.ties[index] = this.ties[index] + 1;
        }
        if (this.isDeuce()) {
            this.deuces[index] = this.deuces[index] + 1;
        }

        /*
            Increment game count by players game count
        */
        if (this.playerOneWonGame()) {
            this.games[0] = this.games[0] + 1;
        }

        if (this.playerTwoWonGame()) {
            this.games[1] = this.games[1] + 1;
        }

        if (this.playerOneWonMatch()) {
            this.winner = this.players[index];
        }
        if (this.playerTwoWonMatch()) {
            this.winner = this.players[index];
        }
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
        if (this.games.every((game: number) => game === 6)) {
            return true;
        }
        return false;
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

    public assertWinner(): Player {

        return this.players[0];
    }

    public getScore(): string {
        if (this.isTieBreak()) {
            return this.getTieBreakScore();
        }
        if (this.isDeuce()) {
            return 'Deuce';
        }

        if (this.isAdvantagePlayerOne()) {
            return `Advantage ${this.players[0]}`
        }

        if (this.isAdvantagePlayerTwo()) {
            return `Advantage ${this.players[1]}`
        }
        // console.log("YO: ", this.points[0])
        if ((this.points[0] === 0 && this.points[1] === 0) && this.games[0] > 0 || this.games[1] > 0) {
            return "";
        }

        return `${pointLookup[this.points[0]]}-${pointLookup[this.points[1]]}`;
    }

    public pointsAreEqual(): boolean {
        return this.points[0] === this.points[1] ? true : false;
    }

    public getTieBreakScore(): string {
        if (this.ties.every((d: number) => d === 0)) {
            return "";
        }

        return `${this.ties[0]}-${this.ties[1]}`
    }
}