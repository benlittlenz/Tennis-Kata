"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Match_1 = require("../src/Match");
describe('Initialize tennis match', function () {
    var playerOne = "Player One";
    var playerTwo = "Player Two";
    var match;
    beforeEach(function () {
        match = new Match_1.Match(playerOne, playerTwo);
    });
    var scoreShouldEqual = function (expected) {
        expect(match.score()).toBe(expected);
    };
    var winnerShouldEqual = function (expected) {
        expect(match.winner).toBe(expected);
    };
    it('Should be a Match instance', function () {
        //console.log('HI', tennis)
        expect(match).toBeInstanceOf(Match_1.Match);
    });
    it("should return love all", function () {
        scoreShouldEqual("0-0, 0-0");
    });
    /*
        The running score of each game is described in a
        manner peculiar to tennis: scores from zero to
        three points are described as 0, 15, 30, 40,
        respectively
    */
    it("should return correct score", function () {
        match.pointWonBy(playerOne);
        scoreShouldEqual("0-0, 15-0");
        match.pointWonBy(playerOne);
        scoreShouldEqual("0-0, 30-0");
        match.pointWonBy(playerTwo);
        scoreShouldEqual("0-0, 30-15");
        match.pointWonBy(playerOne);
        scoreShouldEqual("0-0, 40-15");
    });
    /*
        If at least 3 points have been scored by each
        player, and the scores are equal, the score is
        "deuce".
    */
    it("should handle deuce", function () {
        for (var i = 0; i < 3; i++) {
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
    // it('Should handle player one advantage', () => {
    //     for (let i = 0; i < 3; i++) {
    //         match.pointWonBy(playerOne);
    //         match.pointWonBy(playerTwo);
    //     }
    //     scoreShouldEqual("0-0, Deuce");
    //     match.pointWonBy(playerOne);
    //     scoreShouldEqual(`0-0, Advantage ${playerOne}`);
    //     match.pointWonBy(playerTwo);
    //     scoreShouldEqual(`0-0, Deuce`);
    //     match.pointWonBy(playerOne);
    //     scoreShouldEqual(`0-0, Advantage ${playerOne}`);
    // });
    it('Should handle player two advantage', function () {
        for (var i = 0; i < 3; i++) {
            match.pointWonBy(playerOne);
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("0-0, Deuce");
        match.pointWonBy(playerTwo);
        scoreShouldEqual("0-0, Advantage " + playerTwo);
        match.pointWonBy(playerOne);
        scoreShouldEqual("0-0, Deuce");
        match.pointWonBy(playerTwo);
        scoreShouldEqual("0-0, Advantage " + playerTwo);
    });
    it('should handle player one win a non deuce game', function () {
        for (var i = 0; i < 4; i++) {
            match.pointWonBy(playerOne);
        }
        scoreShouldEqual("1-0");
    });
    it('should handle player two win a non deuce game', function () {
        for (var i = 0; i < 4; i++) {
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("0-1");
    });
    /*
        A player should be able to win 6 games in a row and return 6-0
    */
    it('should have player one as winner', function () {
        for (var i = 0; i < 24; i++) {
            match.pointWonBy(playerOne);
        }
        scoreShouldEqual("6-0");
    });
    it('should have player two as winner', function () {
        for (var i = 0; i < 24; i++) {
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("0-6");
        winnerShouldEqual("Player Two");
    });
    /*
        If one player has won six games and the opponent five, an additional
        game is played. If the leading player wins that game, the player wins
        the set 7–5. If the trailing player wins the game, a tie-break is played.
    */
    it('should assert p1 wins 7-5', function () {
        for (var i = 0; i < 24; i++) {
            match.pointWonBy(playerOne);
        }
        for (var j = 0; j < 20; j++) {
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("6-5");
        //for (let i = 0; i < 2; i++) {
        for (var i = 0; i < 4; i++) {
            match.pointWonBy(playerOne);
        }
        //match.pointWonBy(playerTwo);
        //}
        scoreShouldEqual("7-5");
        winnerShouldEqual("Player One");
    });
    /*
        A tie-break, played under a separate set of rules, allows one player to win
        one more game and thus the set, to give a final set score of 7–6. A tie-break is
        scored one point at a time. The tie-break game continues until one player wins seven
        points by a margin of two or more points. Instead of being scored from 0, 15, 30, 40
        like regular games, the score for a tie breaker goes up incrementally from 0 by 1.
        i.e a player's score will go from 0 to 1 to 2 to 3 …etc.
    */
    it("should show correct tie break points when one player win at 7-5", function () {
        for (var i = 0; i < 24; i++) {
            match.pointWonBy(playerOne);
        }
        for (var j = 0; j < 20; j++) {
            match.pointWonBy(playerTwo);
        }
        scoreShouldEqual("6-5");
        // for (let i = 0; i < 6; i = i + 1) {
        //     for (let j = 0; j < 4; j = j++) {
        //         match.pointWonBy(playerOne);
        //     }
        //     for (let j = 0; j < 4; j = j++) {
        //         match.pointWonBy(playerTwo);
        //     }
        // }
        // scoreShouldEqual("7-5");
        // for (let i = 0; i < 5; i = i + 1) {
        //   match.pointWonBy(playerOne);
        //   match.pointWonBy(playerTwo);
        // }
        // expect(match.score()).toEqual("6-6, 5-4");
        // match.pointWonBy(playerOne);
        // expect(match.score()).toEqual("6-6, 6-5");
        // match.pointWonBy(playerOne);
        // expect(match.score()).toEqual("7-6");
    });
});
