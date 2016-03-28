'use strict';
declare function require(name: string);
var finalCorrectBracket = require('./pastBrackets/2015.json');

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
    constructor(iGamesWon: number, iFirstRoundWon: number, iSecondRoundWon: number, iSweetSixteen: number, iEliteEight: number, iFinalFour: number, ichampionshipWon: boolean) {
        this.gamesWon = iGamesWon;
        this.firstRoundWon = iFirstRoundWon;
        this.secondRoundWon = iSecondRoundWon;
        this.sweetSixteenWon = iSweetSixteen;
        this.eliteEightWon = iEliteEight;
        this.finalFourWon = iFinalFour;
        this.championshipWon = ichampionshipWon;
    }
}

class Bracket {
    regions = [
        {
            teams: [],
            winners: {
                firstRound: [0, 0, 0, 0, 0, 0, 0, 0],
                secondRound: [0, 0, 0, 0],
                thirdRound: [0, 0],
                fourthRound: 0
            },
            regionName: ""
        },
        {
            teams: [],
            winners: {
                firstRound: [0, 0, 0, 0, 0, 0, 0, 0],
                secondRound: [0, 0, 0, 0],
                thirdRound: [0, 0],
                fourthRound: 0
            },
            regionName: ""
        },
        {
            teams: [],
            winners: {
                firstRound: [0, 0, 0, 0, 0, 0, 0, 0],
                secondRound: [0, 0, 0, 0],
                thirdRound: [0, 0],
                fourthRound: 0
            },
            regionName: ""
        },
        {
            teams: [],
            winners: {
                firstRound: [0, 0, 0, 0, 0, 0, 0, 0],
                secondRound: [0, 0, 0, 0],
                thirdRound: [0, 0],
                fourthRound: 0
            },
            regionName: ""
        }
    ];
    FF = {
        teams: [],
        winners: {
            finalFour: [],
            championship: ""
        }
    }
}

function checkFullBracketWithCorrectOne(bracket: Bracket, correctBracket: Bracket) {
    let returnScore = new Score(0,0,0,0,0,0,false);
    for (let i = 0; i < 8; i++) {//Check First Round
        for (let j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.firstRound[i] === correctBracket.regions[j].winners.firstRound[i]) {
                returnScore.firstRoundWon = returnScore.firstRoundWon + 1;
            }
        }
    }
    for (let i = 0; i < 4; i++) {//Check Second Round
        for (let j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.secondRound[i] === correctBracket.regions[j].winners.secondRound[i]) {
                returnScore.secondRoundWon = returnScore.secondRoundWon + 1;
            }
        }
    }
    for (let i = 0; i < 2; i++) {//Check Sweet Sixteen
        for (let j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.thirdRound[i] === correctBracket.regions[j].winners.thirdRound[i]) {
                returnScore.sweetSixteenWon = returnScore.sweetSixteenWon + 1;
            }
        }
    }
    for (let i = 0; i < 4; i++) {//Check Elite Eight
        if (bracket.regions[i].winners.fourthRound === correctBracket.regions[i].winners.fourthRound) {
            returnScore.eliteEightWon = returnScore.eliteEightWon + 1;
        }
    }
    for (let i = 0; i < 2; i++) {//Check Final Four
        if (bracket.FF.winners.finalFour[i] === bracket.FF.winners.finalFour[i]) {
            returnScore.finalFourWon = returnScore.finalFourWon + 1;
        }
    }
    if (bracket.FF.winners.championship === bracket.FF.winners.championship) {
        returnScore.championshipWon = true;
    }
    return returnScore;
}


function fillOutBlankBracket(iBracket: Bracket) {
    let returnBracket = new Bracket();
    returnBracket = iBracket;
    for (let i = 0; i < 16; i=i+2) {
        for (let j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.firstRound[i] = getWinner(returnBracket.regions[j].teams[i], returnBracket.regions[j].teams[i+1], 1).seed;
        }
    }
    //Do Final Four and Championship
    return returnBracket;
}


function jsonBracketToBracketClass(iBracket) {
    let returnBracket = generateUnfilledBracketFromJson(iBracket);
    for (let i = 0; i < 4; i++) {
        returnBracket.regions[i].winners = iBracket.regions[i].winners;
    }
    //Do Final Four and Championship
    return returnBracket;
}

function generateUnfilledBracketFromJson(iBracket) {
    let returnBracket = new Bracket();
    for (let i = 1; i < 17; i++) {
        for (let j = 0; j < 4; j++) {
            returnBracket.regions[j].teams[i] = new Team(i, iBracket.region[j].teams[i]);
        }
    }
    return returnBracket;
}

function getWinner(teamOne: Team, teamTwo: Team, round: number) {
    return teamOne;
}