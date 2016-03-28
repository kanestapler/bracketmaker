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
    }
}

function checkFullBracketWithCorrectOne(bracket: Bracket, correctBracket: Bracket) {
    let returnScore = new Score(0,0,0,0,0,0,false);
    for (let i = 0; i < 8; i++) {//Check First Round
        for (let j = 0; j < 4; j++) {
            //console.log(bracket.regions[j].winners.firstRound);
            if (bracket.regions[j].winners.firstRound[i].name === correctBracket.regions[j].winners.firstRound[i].name) {
                returnScore.firstRoundWon = returnScore.firstRoundWon + 1;
            }
        }
    }
    for (let i = 0; i < 4; i++) {//Check Second Round
        for (let j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.secondRound[i].name === correctBracket.regions[j].winners.secondRound[i].name) {
                returnScore.secondRoundWon = returnScore.secondRoundWon + 1;
            }
        }
    }
    for (let i = 0; i < 2; i++) {//Check Sweet Sixteen
        for (let j = 0; j < 4; j++) {
            if (bracket.regions[j].winners.thirdRound[i].name === correctBracket.regions[j].winners.thirdRound[i].name) {
                returnScore.sweetSixteenWon = returnScore.sweetSixteenWon + 1;
            }
        }
    }
    for (let i = 0; i < 4; i++) {//Check Elite Eight
        if (bracket.regions[i].winners.fourthRound.name === correctBracket.regions[i].winners.fourthRound.name) {
            returnScore.eliteEightWon = returnScore.eliteEightWon + 1;
        }
    }
    for (let i = 0; i < 2; i++) {//Check Final Four
        if (bracket.FF.winners.finalFour[i].name === bracket.FF.winners.finalFour[i].name) {
            returnScore.finalFourWon = returnScore.finalFourWon + 1;
        }
    }
    if (bracket.FF.winners.championship.name === bracket.FF.winners.championship.name) {
        returnScore.championshipWon = true;
    }
    return returnScore;
}

//console.log(checkFullBracketWithCorrectOne(fillOutBlankBracket(generateUnfilledBracketFromJson(finalCorrectBracket)),jsonBracketToBracketClass(finalCorrectBracket)));


function fillOutBlankBracket(iBracket: Bracket) {
    let returnBracket = new Bracket();
    returnBracket = iBracket;
    for (let i = 0; i < 16; i=i+2) {//First Round Winners
        for (let j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.firstRound[i] = getWinner(returnBracket.regions[j].teams[i], returnBracket.regions[j].teams[i+1], 1);
        }
    }
    for (let i = 0; i < 8; i=i+2) {//Second Round Winners
        for (let j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.secondRound[i] = getWinner(returnBracket.regions[j].winners.firstRound[i], returnBracket.regions[j].winners.firstRound[i+1], 2);
        }
    }
    for (let i = 0; i < 4; i=i+2) {//Third Round Winners
        for (let j = 0; j < 4; j++) {
            returnBracket.regions[j].winners.thirdRound[i] = getWinner(returnBracket.regions[j].winners.secondRound[i], returnBracket.regions[j].winners.secondRound[i+1], 3);
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
            returnBracket.regions[j].winners.firstRound[i] = returnBracket.regions[j].teams[winningSeedNumber];
        }
    }
    for (let i = 0; i < 4; i++) {//Second Round
        for (let j = 0; j < 4; j++) {
            let winningSeedNumber = iBracket.Regions[j].winners.secondRound[i];
            returnBracket.regions[j].winners.secondRound[i] = returnBracket.regions[j].teams[winningSeedNumber];
        }
    }
    for (let i = 0; i < 2; i++) {//Sweet Sixteen
        for (let j = 0; j < 4; j++) {
            let winningSeedNumber = iBracket.Regions[j].winners.thirdRound[i];
            returnBracket.regions[j].winners.thirdRound[i] = returnBracket.regions[j].teams[winningSeedNumber];
        }
    }
    for (let i = 0; i < 4; i++) {//Elite Eight
        let winningSeedNumber = iBracket.Regions[i].winners.fourthRound;
        returnBracket.regions[i].winners.fourthRound = returnBracket.regions[i].teams[winningSeedNumber];
        returnBracket.FF.teams[i] = returnBracket.regions[i].teams[winningSeedNumber]
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
    return teamOne;
}