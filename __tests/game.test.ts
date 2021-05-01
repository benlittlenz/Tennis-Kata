import { Match } from '../src/Match'
import { Player } from '../src/types'

describe('Initialize tennis match', () => {
    const playerOne: Player = "Player One";
    const playerTwo: Player = "Player Two";
    let match: Match;

    beforeEach(() => {
        match = new Match(playerOne, playerTwo);
    });

    it('Should be a Match instance', () => {
        //console.log('HI', tennis)
        expect(match).toBeInstanceOf(Match);
    });
})