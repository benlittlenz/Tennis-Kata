import { Player, Score, Game } from './types'

const pointLookup: { [key: number]: string } = {
    0: '0',
    1: '15',
    2: '30',
    3: '40',
};

export class Match {
    private players: [Player, Player];
    private points: [Score, Score];
    private games: [Game, Game];

    constructor(playerOneName: Player, playerTwoName: Player) {
        this.players = [playerOneName, playerTwoName];
        this.points = [0, 0];
        this.games = [0, 0];
    }

    public pointWonBy(player: Player): void {
        const index = this.players.findIndex((p: Player) => p === player)
        this.points[index] = this.points[index] + 1;
    }

    public score(): string {
        const games = `${this.games[0]}-${this.games[1]}`
        const points = `${pointLookup[this.points[0]]}-${pointLookup[this.points[1]]}`
        return `${games}, ${points}`;
    }
}