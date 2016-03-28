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

function checkBracketWithCorrectOne(bracket: Bracket, correctBracket: Bracket) {
    let returnScore = new Score();
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
    return returnBracket;
}


function jsonBracketToBracketClass(iBracket) {
    let returnBracket = generateUnfilledBracketFromJson(iBracket);
    for (let i = 0; i < 4; i++) {
        returnBracket.regions[i].winners = iBracket.regions[i].winners;
    }
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