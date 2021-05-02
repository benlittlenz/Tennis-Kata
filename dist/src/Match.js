"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
var pointLookup = {
    0: '0',
    1: '15',
    2: '30',
    3: '40',
    4: 'Advantage'
};
var Match = /** @class */ (function () {
    function Match(playerOneName, playerTwoName) {
        this.players = [playerOneName, playerTwoName];
        this.points = [0, 0];
        this.games = [0, 0];
        this.deuces = [0, 0];
    }
    Match.prototype.pointWonBy = function (player) {
        var index = this.players.findIndex(function (p) { return p === player; });
        this.points[index] = this.points[index] + 1;
        //console.log(this.points)
        if (this.isDeuce()) {
            this.deuces[index] = this.deuces[index] + 1;
            // if (Math.abs(this.deuces[0] - this.deuces[1]) >= 2) {
            //     // player doesn't win the game when tie break point is less then 7
            //     if (this.isTieBreak() && Math.max(this.deuces[0], this.deuces[1]) < 7) {
            //       return;
            //     }
            //     this.games[index] = this.games[index] + 1;
            //     // reset deuce and point index
            //     this.deuces = [0, 0];
            //     this.points = [0, 0];
            //   }
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
    };
    Match.prototype.score = function () {
        var games = this.games[0] + "-" + this.games[1];
        var points = this.getScore();
        //console.log('POINTS: ', points)
        if (points === "") {
            return games;
        }
        return games + ", " + points;
    };
    Match.prototype.isDeuce = function () {
        return this.pointsAreEqual() && (this.points[0] >= 3 && this.points[1] >= 3) ? true : false;
    };
    // public isTieBreak(): boolean {
    //     if (this.games.every((game: number) => game === 6)) {
    //         return true;
    //     }
    //     return false;
    // }
    Match.prototype.isAdvantagePlayerOne = function () {
        return this.points[0] >= 4 && this.points[0] - this.points[1] === 1 ? true : false;
    };
    Match.prototype.isAdvantagePlayerTwo = function () {
        return this.points[1] >= 4 && this.points[1] - this.points[0] === 1 ? true : false;
    };
    /*
        A player wins a game by winning at least
    */
    Match.prototype.playerOneWonGame = function () {
        if (this.points[0] >= 4 && (this.points[0] - this.points[1] >= 2)) {
            this.points = [0, 0];
            return true;
        }
        return false;
    };
    Match.prototype.playerTwoWonGame = function () {
        if (this.points[1] >= 4 && (this.points[1] - this.points[0] >= 2)) {
            this.points = [0, 0];
            return true;
        }
        return false;
    };
    Match.prototype.playerOneWonMatch = function () {
        if (this.games[0] >= 6 && (this.games[0] - this.games[1] >= 2)) {
            return true;
        }
        return false;
    };
    Match.prototype.playerTwoWonMatch = function () {
        if (this.games[1] >= 6 && (this.games[1] - this.games[0] >= 2)) {
            return true;
        }
        return false;
    };
    Match.prototype.getScore = function () {
        // if (this.isTieBreak()) {
        //     return this.getTieBreakScore();
        // }
        if (this.isDeuce()) {
            return 'Deuce';
        }
        if (this.isAdvantagePlayerOne()) {
            return "Advantage " + this.players[0];
        }
        if (this.isAdvantagePlayerTwo()) {
            return "Advantage " + this.players[1];
        }
        // console.log("YO: ", this.points[0])
        if ((this.points[0] === 0 && this.points[1] === 0) && this.games[0] > 0 || this.games[1] > 0) {
            return "";
        }
        return pointLookup[this.points[0]] + "-" + pointLookup[this.points[1]];
    };
    Match.prototype.pointsAreEqual = function () {
        return this.points[0] === this.points[1] ? true : false;
    };
    return Match;
}());
exports.Match = Match;
