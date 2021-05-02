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

    /*
        If at least 3 points have been scored by each
        player, and the scores are equal, the score is
        "deuce".
    */
    it("should handle deuce", () => {
        for (let i = 0; i < 3; i++) {
            match.pointWonBy(playerOne);
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("0-0, Deuce");
    });

    /*
        If at least 3 points have been scored by each
        side and a player has one more point than his
        opponent, the score of the game is "advantage"
        for the player in the lead.
    */
    it('Should handle player one advantage', () => {
        for (let i = 0; i < 3; i++) {
            match.pointWonBy(playerOne);
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("0-0, Deuce");
        match.pointWonBy(playerOne);
        scoreShouldEqual(`0-0, Advantage ${playerOne}`);
        match.pointWonBy(playerTwo);
        scoreShouldEqual(`0-0, Deuce`);
        match.pointWonBy(playerOne);
        scoreShouldEqual(`0-0, Advantage ${playerOne}`);
    });

    it('Should handle player two advantage', () => {
        for (let i = 0; i < 3; i++) {
            match.pointWonBy(playerOne);
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("0-0, Deuce");
        match.pointWonBy(playerTwo);
        scoreShouldEqual(`0-0, Advantage ${playerTwo}`);
        match.pointWonBy(playerOne);
        scoreShouldEqual(`0-0, Deuce`);
        match.pointWonBy(playerTwo);
        scoreShouldEqual(`0-0, Advantage ${playerTwo}`);
    });

    it('should handle player one win a non deuce game', () => {
        for (let i = 0; i < 4; i++) {
            match.pointWonBy(playerOne);
        }
        scoreShouldEqual("1-0");
    })

    it('should handle player two win a non deuce game', () => {
        for (let i = 0; i < 4; i++) {
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("0-1");
    })

    /*
        A player should be able to win 6 games in a row and return 6-0
    */
    it('should have player one as winner', () => {
        for (let i = 0; i < 24; i++) {
            match.pointWonBy(playerOne);
        }
        scoreShouldEqual("6-0");
        expect(match.playerOneWonMatch()).toBe(true);
    })

    it('should have player two as winner', () => {
        for (let i = 0; i < 24; i++) {
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("0-6");
        expect(match.playerTwoWonMatch()).toBe(true);
    })

    /*
        If one player has won six games and the opponent five, an additional
        game is played. If the leading player wins that game, the player wins
        the set 7–5. If the trailing player wins the game, a tie-break is played.
    */
    it('should assert p1 wins 7-5', () => {
        for (let i = 0; i < 24; i++) {
            match.pointWonBy(playerOne);
        }
        for (let j = 0; j < 20; j++) {
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("6-5");
        //for (let i = 0; i < 2; i++) {
        for (let i = 0; i < 4; i++) {
            match.pointWonBy(playerOne);
        }

        scoreShouldEqual("7-5");
        expect(match.playerOneWonMatch()).toBe(true);
    })

    /*
        A tie-break, played under a separate set of rules, allows one player to win
        one more game and thus the set, to give a final set score of 7–6. A tie-break is
        scored one point at a time. The tie-break game continues until one player wins seven
        points by a margin of two or more points. Instead of being scored from 0, 15, 30, 40
        like regular games, the score for a tie breaker goes up incrementally from 0 by 1.
        i.e a player's score will go from 0 to 1 to 2 to 3 …etc.
    */

    it("should show tie breaks with a final set score of 7-6", () => {
        for (let i = 0; i < 24; i++) {
            match.pointWonBy(playerOne);
        }
        for (let j = 0; j < 24; j++) {
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("6-6");

        for (let i = 0; i < 5; i = i + 1) {
          match.pointWonBy(playerOne);
          match.pointWonBy(playerTwo);
        }

        expect(match.score()).toEqual("6-6, 5-5");
        match.pointWonBy(playerOne);
        expect(match.score()).toEqual("6-6, 6-5");
        match.pointWonBy(playerOne);
        expect(match.score()).toEqual("7-6");

        // expect(match.playerOneWonMatch()).toBe(true);
        // expect(match.playerTwoWonMatch()).toBe(false);
    });
})