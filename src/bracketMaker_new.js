'use strict';
var finalCorrectBracket = require('./pastBrackets/2015.json');
var Team = (function () {
    function Team(iSeed, iName) {
        this.seed = iSeed;
        this.name = iName;
    }
    return Team;
}());
var Bracket = (function () {
    function Bracket() {
        this.mw = {
            teams: [],
            winners: {
                firstRound: [0, 0, 0, 0, 0, 0, 0, 0],
                secondRound: [0, 0, 0, 0],
                thirdRound: [0, 0],
                fourthRound: 0
            }
        };
        this.w = {
            teams: [],
            winners: {
                firstRound: [0, 0, 0, 0, 0, 0, 0, 0],
                secondRound: [0, 0, 0, 0],
                thirdRound: [0, 0],
                fourthRound: 0
            }
        };
        this.s = {
            teams: [],
            winners: {
                firstRound: [0, 0, 0, 0, 0, 0, 0, 0],
                secondRound: [0, 0, 0, 0],
                thirdRound: [0, 0],
                fourthRound: 0
            }
        };
        this.e = {
            teams: [],
            winners: {
                firstRound: [0, 0, 0, 0, 0, 0, 0, 0],
                secondRound: [0, 0, 0, 0],
                thirdRound: [0, 0],
                fourthRound: 0
            }
        };
    }
    return Bracket;
}());
console.log(jsonBracketToBracketClass(finalCorrectBracket).mw.teams);
function jsonBracketToBracketClass(iBracket) {
    var returnBracket = new Bracket();
    for (var i = 1; i < 17; i++) {
        returnBracket.mw.teams[i] = new Team(i, finalCorrectBracket.MW.teams[i - 1]);
        returnBracket.w.teams[i] = new Team(i, finalCorrectBracket.W.teams[i - 1]);
        returnBracket.e.teams[i] = new Team(i, finalCorrectBracket.E.teams[i - 1]);
        returnBracket.s.teams[i] = new Team(i, finalCorrectBracket.S.teams[i - 1]);
    }
    returnBracket.mw.winners = finalCorrectBracket.MW.winners;
    returnBracket.w.winners = finalCorrectBracket.W.winners;
    returnBracket.s.winners = finalCorrectBracket.S.winners;
    returnBracket.e.winners = finalCorrectBracket.E.winners;
    return returnBracket;
}
function generateBlankBracket(iBracket) {
    var returnBracket;
    return returnBracket;
}
function getWinner(teamOne, teamTwo, round) {
    return teamOne;
}
