import { Player, Score, Game } from './types'

export class Match {
    private players: [Player, Player];
    private points: [Score, Score];
    private games: [Game, Game];

    constructor(playerOneName: Player, playerTwoName: Player) {
        this.players = [playerOneName, playerTwoName];
        this.points = [0, 0];
        this.games = [0, 0];
    }
}