'use strict';
var finalCorrectBracket2015 = require('./pastBrackets/2015.json');
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
getStarted();
function getStarted() {
    var blankBracket = generateUnfilledBracketFromJson(finalCorrectBracket2015);
    var correctBracket = jsonBracketToBracketClass(finalCorrectBracket2015);
    var userBracket = fillOutBlankBracket(blankBracket);
    var finalScore = checkFullBracketWithCorrectOne(userBracket, correctBracket);
    console.log(finalScore);
}
function checkFullBracketWithCorrectOne(bracket, correctBracket) {
    var returnScore = new Score(0, 0, 0, 0, 0, 0, false);
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.firstRound[i].name === correctBracket.regions[j].winners.firstRound[i].name) {
                console.log(bracket.regions[j].winners.firstRound[i].name + " is correct");
                returnScore.gamesWon++;
                returnScore.firstRoundWon++;
            }
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.secondRound[i].name === correctBracket.regions[j].winners.secondRound[i].name) {
                returnScore.gamesWon++;
                returnScore.secondRoundWon++;
            }
        }
    }
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.thirdRound[i].name === correctBracket.regions[j].winners.thirdRound[i].name) {
                returnScore.gamesWon++;
                returnScore.sweetSixteenWon++;
            }
        }
    }
    for (var i = 0; i < 4; i++) {
        if (bracket.regions[i].winners.fourthRound.name === correctBracket.regions[i].winners.fourthRound.name) {
            returnScore.gamesWon++;
            returnScore.eliteEightWon++;
        }
    }
    for (var i = 0; i < 2; i++) {
        if (bracket.FF.winners.finalFour[i].name === bracket.FF.winners.finalFour[i].name) {
            returnScore.gamesWon++;
            returnScore.finalFourWon++;
        }
    }
    if (bracket.FF.winners.championship.name === bracket.FF.winners.championship.name) {
        returnScore.gamesWon++;
        returnScore.championshipWon = true;
    }
    return returnScore;
}
function fillOutBlankBracket(iBracket) {
    var returnBracket = new Bracket();
    returnBracket = iBracket;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.firstRound[i] = getWinner(returnBracket.regions[j].teams[i], returnBracket.regions[j].teams[15 - i], 1);
        }
    }
    for (var i = 0; i < 8; i = i + 2) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.secondRound[i / 2] = getWinner(returnBracket.regions[j].winners.firstRound[i], returnBracket.regions[j].winners.firstRound[i + 1], 2);
        }
    }
    for (var i = 0; i < 4; i = i + 2) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.thirdRound[i / 2] = getWinner(returnBracket.regions[j].winners.secondRound[i], returnBracket.regions[j].winners.secondRound[i + 1], 3);
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
            console.log(winningSeedNumber);
            console.log(returnBracket.regions[j].teams[winningSeedNumber - 1]);
            returnBracket.regions[j].winners.firstRound[i] = returnBracket.regions[j].teams[winningSeedNumber - 1];
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var winningSeedNumber = iBracket.Regions[j].winners.secondRound[i];
            returnBracket.regions[j].winners.secondRound[i] = returnBracket.regions[j].teams[winningSeedNumber - 1];
        }
    }
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 4; j++) {
            var winningSeedNumber = iBracket.Regions[j].winners.thirdRound[i];
            returnBracket.regions[j].winners.thirdRound[i] = returnBracket.regions[j].teams[winningSeedNumber - 1];
        }
    }
    for (var i = 0; i < 4; i++) {
        var winningSeedNumber = iBracket.Regions[i].winners.fourthRound;
        returnBracket.regions[i].winners.fourthRound = returnBracket.regions[i].teams[winningSeedNumber - 1];
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
    if (teamOne.seed < teamTwo.seed) {
        return teamOne;
    }
    else {
        return teamTwo;
    }
}
