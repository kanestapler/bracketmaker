'use strict';
var finalCorrectBracket = require('./pastBrackets/2015.json');
var Team = (function () {
    function Team(iSeed, iName) {
        this.seed = iSeed;
        this.name = iName;
    }
    return Team;
}());
var Score = (function () {
    function Score(iGamesWon, iFirstRoundWon, iSecondRoundWon, iSweetSixteen, iEliteEight, iFinalFour, ichampionshipWon) {
        this.gamesWon = iGamesWon;
        this.firstRoundWon = iFirstRoundWon;
        this.secondRoundWon = iSecondRoundWon;
        this.sweetSixteenWon = iSweetSixteen;
        this.eliteEightWon = iEliteEight;
        this.finalFourWon = iFinalFour;
        this.championshipWon = ichampionshipWon;
    }
    return Score;
}());
var Bracket = (function () {
    function Bracket() {
        this.regions = [
            {
                teams: [],
                winners: {
                    firstRound: [],
                    secondRound: [],
                    thirdRound: [],
                    fourthRound: null
                },
                regionName: ""
            },
            {
                teams: [],
                winners: {
                    firstRound: [],
                    secondRound: [],
                    thirdRound: [],
                    fourthRound: null
                },
                regionName: ""
            },
            {
                teams: [],
                winners: {
                    firstRound: [],
                    secondRound: [],
                    thirdRound: [],
                    fourthRound: null
                },
                regionName: ""
            },
            {
                teams: [],
                winners: {
                    firstRound: [],
                    secondRound: [],
                    thirdRound: [],
                    fourthRound: null
                },
                regionName: ""
            }
        ];
        this.FF = {
            teams: [],
            winners: {
                finalFour: [],
                championship: null
            }
        };
    }
    return Bracket;
}());
function checkFullBracketWithCorrectOne(bracket, correctBracket) {
    var returnScore = new Score(0, 0, 0, 0, 0, 0, false);
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 4; j++) {
            console.log(bracket.regions[j].winners.firstRound);
            if (bracket.regions[j].winners.firstRound[i].name === correctBracket.regions[j].winners.firstRound[i].name) {
                returnScore.firstRoundWon = returnScore.firstRoundWon + 1;
            }
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.secondRound[i].name === correctBracket.regions[j].winners.secondRound[i].name) {
                returnScore.secondRoundWon = returnScore.secondRoundWon + 1;
            }
        }
    }
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.thirdRound[i].name === correctBracket.regions[j].winners.thirdRound[i].name) {
                returnScore.sweetSixteenWon = returnScore.sweetSixteenWon + 1;
            }
        }
    }
    for (var i = 0; i < 4; i++) {
        if (bracket.regions[i].winners.fourthRound.name === correctBracket.regions[i].winners.fourthRound.name) {
            returnScore.eliteEightWon = returnScore.eliteEightWon + 1;
        }
    }
    for (var i = 0; i < 2; i++) {
        if (bracket.FF.winners.finalFour[i].name === bracket.FF.winners.finalFour[i].name) {
            returnScore.finalFourWon = returnScore.finalFourWon + 1;
        }
    }
    if (bracket.FF.winners.championship.name === bracket.FF.winners.championship.name) {
        returnScore.championshipWon = true;
    }
    return returnScore;
}
console.log(checkFullBracketWithCorrectOne(fillOutBlankBracket(generateUnfilledBracketFromJson(finalCorrectBracket)), jsonBracketToBracketClass(finalCorrectBracket)));
function fillOutBlankBracket(iBracket) {
    var returnBracket = new Bracket();
    returnBracket = iBracket;
    for (var i = 0; i < 16; i = i + 2) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.firstRound[i] = getWinner(returnBracket.regions[j].teams[i], returnBracket.regions[j].teams[i + 1], 1);
        }
    }
    for (var i = 0; i < 8; i = i + 2) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.secondRound[i] = getWinner(returnBracket.regions[j].winners.firstRound[i], returnBracket.regions[j].winners.firstRound[i + 1], 2);
        }
    }
    for (var i = 0; i < 4; i = i + 2) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.thirdRound[i] = getWinner(returnBracket.regions[j].winners.secondRound[i], returnBracket.regions[j].winners.secondRound[i + 1], 3);
        }
    }
    for (var i = 0; i < 2; i = i + 2) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.fourthRound = getWinner(returnBracket.regions[j].winners.thirdRound[i], returnBracket.regions[j].winners.thirdRound[i + 1], 4);
            returnBracket.FF.teams[j] = returnBracket.regions[j].winners.fourthRound; //Put winner in final four
        }
    }
    //Final Four
    returnBracket.FF.winners.finalFour[0] = getWinner(returnBracket.FF.teams[0], returnBracket.FF.teams[1], 5);
    returnBracket.FF.winners.finalFour[1] = getWinner(returnBracket.FF.teams[2], returnBracket.FF.teams[3], 5);
    //Championship
    returnBracket.FF.winners.championship = getWinner(returnBracket.FF.winners.finalFour[0], returnBracket.FF.winners.finalFour[1], 6);
    return returnBracket;
}
function jsonBracketToBracketClass(iBracket) {
    var returnBracket = generateUnfilledBracketFromJson(iBracket);
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 4; j++) {
            var winningSeedNumber = iBracket.Regions[j].winners.firstRound[i];
            returnBracket.regions[j].winners.firstRound[i] = returnBracket.regions[j].teams[winningSeedNumber];
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var winningSeedNumber = iBracket.Regions[j].winners.secondRound[i];
            returnBracket.regions[j].winners.secondRound[i] = returnBracket.regions[j].teams[winningSeedNumber];
        }
    }
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 4; j++) {
            var winningSeedNumber = iBracket.Regions[j].winners.thirdRound[i];
            returnBracket.regions[j].winners.thirdRound[i] = returnBracket.regions[j].teams[winningSeedNumber];
        }
    }
    for (var i = 0; i < 4; i++) {
        var winningSeedNumber = iBracket.Regions[i].winners.fourthRound;
        returnBracket.regions[i].winners.fourthRound = returnBracket.regions[i].teams[winningSeedNumber];
        returnBracket.FF.teams[i] = returnBracket.regions[i].teams[winningSeedNumber];
    }
    for (var i = 0; i < 4; i++) {
        if (returnBracket.FF.teams[i].name === iBracket.FF.winners.finalFour[0] || returnBracket.FF.teams[i].name === iBracket.FF.winners.finalFour[1]) {
            returnBracket.FF.winners.finalFour.push(returnBracket.FF.teams[i]);
        }
        if (returnBracket.FF.teams[i].name === iBracket.FF.winners.championship) {
            returnBracket.FF.winners.championship = returnBracket.FF.teams[i];
        }
    }
    return returnBracket;
}
function generateUnfilledBracketFromJson(iBracket) {
    var returnBracket = new Bracket();
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].teams[i] = new Team((i + 1), iBracket.Regions[j].teams[i]);
        }
    }
    return returnBracket;
}
function getWinner(teamOne, teamTwo, round) {
    return teamOne;
}
