'use strict';
var Chance = require('chance');
var chance = new Chance();
var finalCorrectBracket2015 = require('./pastBrackets/2015.json');
var count = 1000;
var i = 0;
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
        this.totalScore = null;
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
var bestBracketScore = new Score(0, 0, 0, 0, 0, 0, false);
while (i < count) {
    var currentScore = doItAllForMeJustGiveMeTheScore();
    bestBracketScore = exponentialScoreCompare(currentScore, bestBracketScore);
    if (0 === i % 1000000) {
        console.log(i);
        console.log(bestBracketScore);
    }
    i++;
}
console.log(bestBracketScore);
function fibonacciScoreCompare(scoreOne, scoreTwo) {
    var scoreOneTotal = 0;
    var scoreTwoTotal = 0;
    scoreOneTotal = scoreOne.firstRoundWon;
    scoreTwoTotal = scoreTwo.firstRoundWon;
    scoreOneTotal = scoreOneTotal + scoreOne.secondRoundWon * 2;
    scoreTwoTotal = scoreTwoTotal + scoreTwo.secondRoundWon * 2;
    scoreOneTotal = scoreOneTotal + scoreOne.sweetSixteenWon * 3;
    scoreTwoTotal = scoreTwoTotal + scoreTwo.sweetSixteenWon * 3;
    scoreOneTotal = scoreOneTotal + scoreOne.eliteEightWon * 5;
    scoreTwoTotal = scoreTwoTotal + scoreTwo.eliteEightWon * 5;
    scoreOneTotal = scoreOneTotal + scoreOne.finalFourWon * 8;
    scoreTwoTotal = scoreTwoTotal + scoreTwo.finalFourWon * 8;
    if (scoreOne.championshipWon) {
        scoreOneTotal = scoreOneTotal + 13;
    }
    if (scoreTwo.championshipWon) {
        scoreTwoTotal = scoreTwoTotal + 13;
    }
    scoreOne.totalScore = scoreOneTotal;
    scoreTwo.totalScore = scoreTwoTotal;
    if (scoreOneTotal > scoreTwoTotal) {
        return scoreOne;
    }
    else {
        return scoreTwo;
    }
}
function onePointScoreCompare(scoreOne, scoreTwo) {
    scoreOne.totalScore = scoreOne.gamesWon;
    scoreTwo.totalScore = scoreTwo.gamesWon;
    if (scoreOne.gamesWon > scoreTwo.gamesWon) {
        return scoreOne;
    }
    else {
        return scoreTwo;
    }
}
function exponentialScoreCompare(scoreOne, scoreTwo) {
    var scoreOneTotal = 0;
    var scoreTwoTotal = 0;
    scoreOneTotal = scoreOne.firstRoundWon;
    scoreTwoTotal = scoreTwo.firstRoundWon;
    scoreOneTotal = scoreOneTotal + scoreOne.secondRoundWon * 2;
    scoreTwoTotal = scoreTwoTotal + scoreTwo.secondRoundWon * 2;
    scoreOneTotal = scoreOneTotal + scoreOne.sweetSixteenWon * 4;
    scoreTwoTotal = scoreTwoTotal + scoreTwo.sweetSixteenWon * 4;
    scoreOneTotal = scoreOneTotal + scoreOne.eliteEightWon * 8;
    scoreTwoTotal = scoreTwoTotal + scoreTwo.eliteEightWon * 8;
    scoreOneTotal = scoreOneTotal + scoreOne.finalFourWon * 16;
    scoreTwoTotal = scoreTwoTotal + scoreTwo.finalFourWon * 16;
    if (scoreOne.championshipWon) {
        scoreOneTotal = scoreOneTotal + 32;
    }
    if (scoreTwo.championshipWon) {
        scoreTwoTotal = scoreTwoTotal + 32;
    }
    scoreOne.totalScore = scoreOneTotal;
    scoreTwo.totalScore = scoreTwoTotal;
    if (scoreOneTotal > scoreTwoTotal) {
        return scoreOne;
    }
    else {
        return scoreTwo;
    }
}
function doItAllForMeJustGiveMeTheScore() {
    var blankBracket = generateUnfilledBracketFromJson(finalCorrectBracket2015);
    var correctBracket = jsonBracketToBracketClass(finalCorrectBracket2015);
    var userBracket = fillOutBlankBracket(blankBracket);
    var finalScore = checkFullBracketWithCorrectOne(userBracket, correctBracket);
    return finalScore;
}
function checkFullBracketWithCorrectOne(bracket, correctBracket) {
    var returnScore = new Score(0, 0, 0, 0, 0, 0, false);
    for (var i_1 = 0; i_1 < 8; i_1++) {
        for (var j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.firstRound[i_1].name === correctBracket.regions[j].winners.firstRound[i_1].name) {
                returnScore.gamesWon++;
                returnScore.firstRoundWon++;
            }
        }
    }
    for (var i_2 = 0; i_2 < 4; i_2++) {
        for (var j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.secondRound[i_2].name === correctBracket.regions[j].winners.secondRound[i_2].name) {
                returnScore.gamesWon++;
                returnScore.secondRoundWon++;
            }
        }
    }
    for (var i_3 = 0; i_3 < 2; i_3++) {
        for (var j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.thirdRound[i_3].name === correctBracket.regions[j].winners.thirdRound[i_3].name) {
                returnScore.gamesWon++;
                returnScore.sweetSixteenWon++;
            }
        }
    }
    for (var i_4 = 0; i_4 < 4; i_4++) {
        if (bracket.regions[i_4].winners.fourthRound.name === correctBracket.regions[i_4].winners.fourthRound.name) {
            returnScore.gamesWon++;
            returnScore.eliteEightWon++;
        }
    }
    for (var i_5 = 0; i_5 < 2; i_5++) {
        if (bracket.FF.winners.finalFour[i_5].name === correctBracket.FF.winners.finalFour[i_5].name) {
            returnScore.gamesWon++;
            returnScore.finalFourWon++;
        }
    }
    if (bracket.FF.winners.championship.name === correctBracket.FF.winners.championship.name) {
        returnScore.gamesWon++;
        returnScore.championshipWon = true;
    }
    return returnScore;
}
function fillOutBlankBracket(iBracket) {
    var returnBracket = new Bracket();
    returnBracket = iBracket;
    for (var i_6 = 0; i_6 < 8; i_6++) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.firstRound[i_6] = getWinner(returnBracket.regions[j].teams[i_6], returnBracket.regions[j].teams[15 - i_6], 1);
        }
    }
    for (var i_7 = 0; i_7 < 8; i_7 = i_7 + 2) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.secondRound[i_7 / 2] = getWinner(returnBracket.regions[j].winners.firstRound[i_7], returnBracket.regions[j].winners.firstRound[i_7 + 1], 2);
        }
    }
    for (var i_8 = 0; i_8 < 4; i_8 = i_8 + 2) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.thirdRound[i_8 / 2] = getWinner(returnBracket.regions[j].winners.secondRound[i_8], returnBracket.regions[j].winners.secondRound[i_8 + 1], 3);
        }
    }
    for (var i_9 = 0; i_9 < 2; i_9 = i_9 + 2) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.fourthRound = getWinner(returnBracket.regions[j].winners.thirdRound[i_9], returnBracket.regions[j].winners.thirdRound[i_9 + 1], 4);
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
    for (var i_10 = 0; i_10 < 8; i_10++) {
        for (var j = 0; j < 4; j++) {
            var winningSeedNumber = iBracket.Regions[j].winners.firstRound[i_10];
            returnBracket.regions[j].winners.firstRound[i_10] = returnBracket.regions[j].teams[winningSeedNumber - 1];
        }
    }
    for (var i_11 = 0; i_11 < 4; i_11++) {
        for (var j = 0; j < 4; j++) {
            var winningSeedNumber = iBracket.Regions[j].winners.secondRound[i_11];
            returnBracket.regions[j].winners.secondRound[i_11] = returnBracket.regions[j].teams[winningSeedNumber - 1];
        }
    }
    for (var i_12 = 0; i_12 < 2; i_12++) {
        for (var j = 0; j < 4; j++) {
            var winningSeedNumber = iBracket.Regions[j].winners.thirdRound[i_12];
            returnBracket.regions[j].winners.thirdRound[i_12] = returnBracket.regions[j].teams[winningSeedNumber - 1];
        }
    }
    for (var i_13 = 0; i_13 < 4; i_13++) {
        var winningSeedNumber = iBracket.Regions[i_13].winners.fourthRound;
        returnBracket.regions[i_13].winners.fourthRound = returnBracket.regions[i_13].teams[winningSeedNumber - 1];
        returnBracket.FF.teams[i_13] = returnBracket.regions[i_13].winners.fourthRound;
    }
    for (var i_14 = 0; i_14 < 4; i_14++) {
        if (returnBracket.FF.teams[i_14].name === iBracket.FF.winners.finalFour[0] || returnBracket.FF.teams[i_14].name === iBracket.FF.winners.finalFour[1]) {
            returnBracket.FF.winners.finalFour.push(returnBracket.FF.teams[i_14]);
        }
        if (returnBracket.FF.teams[i_14].name === iBracket.FF.winners.championship) {
            returnBracket.FF.winners.championship = returnBracket.FF.teams[i_14];
        }
    }
    return returnBracket;
}
function generateUnfilledBracketFromJson(iBracket) {
    var returnBracket = new Bracket();
    for (var i_15 = 0; i_15 < 16; i_15++) {
        for (var j = 0; j < 4; j++) {
            returnBracket.regions[j].teams[i_15] = new Team((i_15 + 1), iBracket.Regions[j].teams[i_15]);
        }
    }
    return returnBracket;
}
function getWinner(teamOne, teamTwo, round) {
    var seedDifference = Math.abs(teamOne.seed - teamTwo.seed);
    var timesToRun = Math.ceil(log2(seedDifference));
    var lowSeed;
    var highSeed;
    if (teamOne.seed > teamTwo.seed) {
        lowSeed = teamOne;
        highSeed = teamTwo;
    }
    else {
        highSeed = teamOne;
        lowSeed = teamTwo;
    }
    for (var i_16 = 0; i_16 < timesToRun; i_16++) {
        if (chance.bool({ likelihood: 50 })) {
            return highSeed;
        }
    }
    return lowSeed;
}
function log2(i) {
    var output = Math.log(i) / Math.log(2);
    return output;
}
