'use strict';
declare function require(name: string);
var Chance = require('chance');
var chance = new Chance();
var finalCorrectBracket2015 = require('./pastBrackets/2015.json');

var count = 1000;
var i = 0;

class Team {
    seed: number;
    name: string;
    constructor(iSeed: number, iName: string) {
        this.seed = iSeed;
        this.name = iName;
    }
}

class Score {
    gamesWon: number;
    firstRoundWon: number;
    secondRoundWon: number;
    sweetSixteenWon: number;
    eliteEightWon: number;
    finalFourWon: number;
    championshipWon: boolean;
    totalScore: number;
    constructor(iGamesWon: number, iFirstRoundWon: number, iSecondRoundWon: number, iSweetSixteen: number, iEliteEight: number, iFinalFour: number, ichampionshipWon: boolean) {
        this.gamesWon = iGamesWon;
        this.firstRoundWon = iFirstRoundWon;
        this.secondRoundWon = iSecondRoundWon;
        this.sweetSixteenWon = iSweetSixteen;
        this.eliteEightWon = iEliteEight;
        this.finalFourWon = iFinalFour;
        this.championshipWon = ichampionshipWon;
        this.totalScore = null;
    }
}

class Bracket {
    regions = [
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
    FF = {
        teams: [],
        winners: {
            finalFour: [],
            championship: null
        }
    };
    score: Score;
    constructor() {
        this.score = new Score(0,0,0,0,0,0,false);
    }
}

var bestBracket = new Bracket();

while (i < count) {
    var currentBracket = doItAllForMeJustGiveMeTheBracket();
    bestBracket = exponentialScoreCompare(currentBracket, bestBracket);
    if (0 === i % 1000000) {
        console.log(i);
        console.log(bestBracket.score);
    }
    i++;
}

console.log(bestBracket.score);

function fibonacciScoreCompare(bracketOne: Bracket, bracketTwo: Bracket) {
    var scoreOneTotal = 0;
    var scoreTwoTotal = 0;
    scoreOneTotal = bracketOne.score.firstRoundWon;
    scoreTwoTotal = bracketTwo.score.firstRoundWon;
    scoreOneTotal = scoreOneTotal + bracketOne.score.secondRoundWon*2;
    scoreTwoTotal = scoreTwoTotal + bracketTwo.score.secondRoundWon*2;
    scoreOneTotal = scoreOneTotal + bracketOne.score.sweetSixteenWon*3;
    scoreTwoTotal = scoreTwoTotal + bracketTwo.score.sweetSixteenWon*3;
    scoreOneTotal = scoreOneTotal + bracketOne.score.eliteEightWon*5;
    scoreTwoTotal = scoreTwoTotal + bracketTwo.score.eliteEightWon*5;
    scoreOneTotal = scoreOneTotal + bracketOne.score.finalFourWon*8;
    scoreTwoTotal = scoreTwoTotal + bracketTwo.score.finalFourWon*8;
    if (bracketOne.score.championshipWon) {
        scoreOneTotal = scoreOneTotal + 13;
    }
    if (bracketTwo.score.championshipWon) {
        scoreTwoTotal = scoreTwoTotal + 13;
    }
    bracketOne.score.totalScore = scoreOneTotal;
    bracketTwo.score.totalScore = scoreTwoTotal;
    if (scoreOneTotal > scoreTwoTotal) {
        return bracketOne;
    } else {
        return bracketTwo;
    }
}

function onePointScoreCompare(bracketOne: Bracket, bracketTwo: Bracket) {
    bracketOne.score.totalScore = bracketOne.score.gamesWon;
    bracketTwo.score.totalScore = bracketTwo.score.gamesWon;
    if (bracketOne.score.gamesWon > bracketTwo.score.gamesWon) {
        return bracketOne;
    } else {
        return bracketTwo;
    }
}

function exponentialScoreCompare(bracketOne: Bracket, bracketTwo: Bracket) {
    var scoreOneTotal = 0;
    var scoreTwoTotal = 0;
    scoreOneTotal = bracketOne.score.firstRoundWon;
    scoreTwoTotal = bracketTwo.score.firstRoundWon;
    scoreOneTotal = scoreOneTotal + bracketOne.score.secondRoundWon*2;
    scoreTwoTotal = scoreTwoTotal + bracketTwo.score.secondRoundWon*2;
    scoreOneTotal = scoreOneTotal + bracketOne.score.sweetSixteenWon*4;
    scoreTwoTotal = scoreTwoTotal + bracketTwo.score.sweetSixteenWon*4;
    scoreOneTotal = scoreOneTotal + bracketOne.score.eliteEightWon*8;
    scoreTwoTotal = scoreTwoTotal + bracketTwo.score.eliteEightWon*8;
    scoreOneTotal = scoreOneTotal + bracketOne.score.finalFourWon*16;
    scoreTwoTotal = scoreTwoTotal + bracketTwo.score.finalFourWon*16;
    if (bracketOne.score.championshipWon) {
        scoreOneTotal = scoreOneTotal + 32;
    }
    if (bracketTwo.score.championshipWon) {
        scoreTwoTotal = scoreTwoTotal + 32;
    }
    bracketOne.score.totalScore = scoreOneTotal;
    bracketTwo.score.totalScore = scoreTwoTotal;
    if (scoreOneTotal > scoreTwoTotal) {
        return bracketOne;
    } else {
        return bracketTwo;
    }
}

function doItAllForMeJustGiveMeTheBracket() {
    var blankBracket = generateUnfilledBracketFromJson(finalCorrectBracket2015);
    var correctBracket = jsonBracketToBracketClass(finalCorrectBracket2015);
    var userBracket = fillOutBlankBracket(blankBracket);
    var finalBracket = checkFullBracketWithCorrectOne(userBracket, correctBracket);
    return finalBracket;
}

function checkFullBracketWithCorrectOne(bracket: Bracket, correctBracket: Bracket) {
    let returnBracket = bracket;
    let finalScore = new Score(0,0,0,0,0,0,false);
    for (let i = 0; i < 8; i++) {//Check First Round
        for (let j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.firstRound[i].name === correctBracket.regions[j].winners.firstRound[i].name) {
                finalScore.gamesWon++;
                finalScore.firstRoundWon++;
            }
        }
    }
    for (let i = 0; i < 4; i++) {//Check Second Round
        for (let j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.secondRound[i].name === correctBracket.regions[j].winners.secondRound[i].name) {
                finalScore.gamesWon++;
                finalScore.secondRoundWon++;
            }
        }
    }
    for (let i = 0; i < 2; i++) {//Check Sweet Sixteen
        for (let j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.thirdRound[i].name === correctBracket.regions[j].winners.thirdRound[i].name) {
                finalScore.gamesWon++;
                finalScore.sweetSixteenWon++;
            }
        }
    }
    for (let i = 0; i < 4; i++) {//Check Elite Eight
        if (bracket.regions[i].winners.fourthRound.name === correctBracket.regions[i].winners.fourthRound.name) {
            finalScore.gamesWon++;
            finalScore.eliteEightWon++;
        }
    }
    for (let i = 0; i < 2; i++) {//Check Final Four
        if (bracket.FF.winners.finalFour[i].name === correctBracket.FF.winners.finalFour[i].name) {
            finalScore.gamesWon++;
            finalScore.finalFourWon++;
        }
    }
    if (bracket.FF.winners.championship.name === correctBracket.FF.winners.championship.name) {
        finalScore.gamesWon++;
        finalScore.championshipWon = true;
    }
    returnBracket.score = finalScore;
    return returnBracket;
}

function fillOutBlankBracket(iBracket: Bracket) {
    let returnBracket = new Bracket();
    returnBracket = iBracket;
    for (let i = 0; i < 8; i++) {//First Round Winners
        for (let j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.firstRound[i] = getWinner(returnBracket.regions[j].teams[i], returnBracket.regions[j].teams[15-i], 1);
        }
    }
    for (let i = 0; i < 8; i=i+2) {//Second Round Winners
        for (let j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.secondRound[i/2] = getWinner(returnBracket.regions[j].winners.firstRound[i], returnBracket.regions[j].winners.firstRound[i+1], 2);
        }
    }
    for (let i = 0; i < 4; i=i+2) {//Third Round Winners
        for (let j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.thirdRound[i/2] = getWinner(returnBracket.regions[j].winners.secondRound[i], returnBracket.regions[j].winners.secondRound[i+1], 3);
        }
    }
    for (let i = 0; i < 2; i=i+2) {//Fourth Round Winners
        for (let j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.fourthRound = getWinner(returnBracket.regions[j].winners.thirdRound[i], returnBracket.regions[j].winners.thirdRound[i+1], 4);
            returnBracket.FF.teams[j] = returnBracket.regions[j].winners.fourthRound;//Put winner in final four
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
    let returnBracket = generateUnfilledBracketFromJson(iBracket);
    for (let i = 0; i < 8; i++) {//First Round
        for (let j = 0; j < 4; j++) {
            let winningSeedNumber = iBracket.Regions[j].winners.firstRound[i];
            returnBracket.regions[j].winners.firstRound[i] = returnBracket.regions[j].teams[winningSeedNumber-1];
        }
    }
    for (let i = 0; i < 4; i++) {//Second Round
        for (let j = 0; j < 4; j++) {
            let winningSeedNumber = iBracket.Regions[j].winners.secondRound[i];
            returnBracket.regions[j].winners.secondRound[i] = returnBracket.regions[j].teams[winningSeedNumber-1];
        }
    }
    for (let i = 0; i < 2; i++) {//Sweet Sixteen
        for (let j = 0; j < 4; j++) {
            let winningSeedNumber = iBracket.Regions[j].winners.thirdRound[i];
            returnBracket.regions[j].winners.thirdRound[i] = returnBracket.regions[j].teams[winningSeedNumber-1];
        }
    }
    for (let i = 0; i < 4; i++) {//Elite Eight
        let winningSeedNumber = iBracket.Regions[i].winners.fourthRound;
        returnBracket.regions[i].winners.fourthRound = returnBracket.regions[i].teams[winningSeedNumber-1];
        returnBracket.FF.teams[i] = returnBracket.regions[i].winners.fourthRound;
    }
    for (let i = 0; i < 4; i++) {//Final Four
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
    let returnBracket = new Bracket();
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 4; j++) {
            returnBracket.regions[j].teams[i] = new Team((i+1), iBracket.Regions[j].teams[i]);
        }
    }
    return returnBracket;
}

function getWinner(teamOne: Team, teamTwo: Team, round: number) {
    var seedDifference = Math.abs(teamOne.seed - teamTwo.seed);
    var timesToRun = Math.ceil(log2(seedDifference));
    var lowSeed;
    var highSeed;
    if (teamOne.seed > teamTwo.seed) {
        lowSeed = teamOne;
        highSeed = teamTwo;
    } else {
        highSeed = teamOne;
        lowSeed = teamTwo;
    }
    for (let i = 0; i < timesToRun; i++) {
        if (chance.bool({likelihood: 50})) {
            return highSeed;
        }
    }
    return lowSeed;
}

function log2(i: number) {
    var output = Math.log(i) / Math.log(2);
    return output;
}