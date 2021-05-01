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

    /*
        The running score of each game is described in a
        manner peculiar to tennis: scores from zero to
        three points are described as 0, 15, 30, 40,
        respectively
    */

    it("should return correct score", () => {
        match.pointWonBy(playerOne);
        scoreShouldEqual("0-0, 15-0")
        match.pointWonBy(playerOne);
        scoreShouldEqual("0-0, 30-0")
        match.pointWonBy(playerTwo);
        scoreShouldEqual("0-0, 30-15")
        match.pointWonBy(playerOne);
        scoreShouldEqual("0-0, 40-15")
    });

})