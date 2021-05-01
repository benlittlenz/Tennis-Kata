import { Match } from '../src/Match'
import { Player } from '../src/types'

describe('Initialize tennis match', () => {
    const playerOne: Player = "Player One";
    const playerTwo: Player = "Player Two";
    let match: Match;

    beforeEach(() => {
        match = new Match(playerOne, playerTwo);
    });

    const scoreShouldEqual = (expected: string) => {
        expect(match.score()).toBe(expected);
    }

    it('Should be a Match instance', () => {
        //console.log('HI', tennis)
        expect(match).toBeInstanceOf(Match);
    });

    it("should return love all", () => {
        scoreShouldEqual("0-0, 0-0")
    });

})