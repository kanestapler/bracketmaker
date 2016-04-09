var _ = require('lodash');
var bracketsGenerated = 100000;

//2015
// var secondRoundMidwestResults2015 = [1, 8, 5, 4, 6, 3, 7, 2];
// var secondRoundWestResults2015 = [1, 8, 5, 4, 6, 14, 10, 2];
// var secondRoundEastResults2015 = [1, 8, 5, 4, 11, 3, 7, 2];
// var secondRoundSouthResults2015 = [1, 8, 5, 4, 11, 14, 7, 2];
// var sweetSixteenMidwestResults2015 = [1, 5, 3, 7];
// var sweetSixteenWestResults2015 = [1, 4, 6, 2];
// var sweetSixteenEastResults2015 = [8, 4, 3, 7];
// var sweetSixteenSouthResults2015 = [1, 5, 11, 2];
// var eliteEightMidwestResults2015 = [1, 3];
// var eliteEightWestResults2015 = [1, 2];
// var eliteEightEastResults2015 = [4, 7];
// var eliteEightSouthResults2015 = [1, 2];
// var finalFourResults2015 = [1, 1, 7, 1];

//2014
// var secondRoundSouthResults2015 = [1, 9, 12, 4, 11, 3, 10, 2];
// var secondRoundWestResults2015 = [1, 8, 12, 4, 6, 3, 7, 2];
// var secondRoundEastResults2015 = [1, 8, 12, 4, 6, 3, 7, 2];
// var secondRoundMidwestResults2015 = [1, 8, 5, 4, 11, 14, 7, 2];
// var sweetSixteenMidwestResults2015 = [8, 4, 11, 2];
// var sweetSixteenWestResults2015 = [1, 4, 6, 2];
// var sweetSixteenEastResults2015 = [1, 4, 3, 7];
// var sweetSixteenSouthResults2015 = [1, 4, 11, 10];
// var eliteEightMidwestResults2015 = [8, 2];
// var eliteEightWestResults2015 = [1, 2];
// var eliteEightEastResults2015 = [4, 7];
// var eliteEightSouthResults2015 = [1, 11];
// var finalFourResults2015 = [8, 2, 7, 1];

//2013
var secondRoundSouthResults2015 = [1, 8, 5, 4, 11, 3, 7, 15];
var secondRoundWestResults2015 = [1, 9, 12, 13, 6, 14, 10, 2];
var secondRoundEastResults2015 = [1, 9, 12, 4, 6, 3, 7, 2];
var secondRoundMidwestResults2015 = [1, 8, 12, 4, 6, 3, 7, 2];
var sweetSixteenMidwestResults2015 = [1, 12, 3, 2];
var sweetSixteenWestResults2015 = [9, 13, 6, 2];
var sweetSixteenEastResults2015 = [1, 4, 3, 2];
var sweetSixteenSouthResults2015 = [1, 4, 3, 15];
var eliteEightMidwestResults2015 = [8, 2];
var eliteEightWestResults2015 = [9, 2];
var eliteEightEastResults2015 = [4, 3];
var eliteEightSouthResults2015 = [4, 3];
var finalFourResults2015 = [1, 4, 4, 9];

var secondRoundSouth;
var secondRoundWest;
var secondRoundEast;
var secondRoundMidwest;
var secondRoundCorrect;

var sweetSixteenSouth;
var sweetSixteenWest;
var sweetSixteenEast;
var sweetSixteenMidwest;
var sweetSixteenCorrect;

var eliteEightSouth;
var eliteEightWest;
var eliteEightEast;
var eliteEightMidwest;
var eliteEightCorrect;

var currentGame = 0;
var gamesMissed = [];
var finalFour = [];
var doesItMatch = false;
var count = 0;
var bestPercent = 0;
var bestGames = 0;
var averagePercentage = 0;
var allBracketsWins = [];
for (var i = 0; i < 63; i++) {
    allBracketsWins[i] = 0;
}

var bestSecondRoundSouth;
var bestSecondRoundWest;
var bestSecondRoundEast;
var bestSecondRoundMidwest;

var bestSweetSixteenSouth;
var bestSweetSixteenWest;
var bestSweetSixteenEast;
var bestSweetSixteenMidwest;

var bestEliteEightSouth;
var bestEliteEightWest;
var bestEliteEightEast;
var bestEliteEightMidwest;

var start = new Date().getTime();
while (count < bracketsGenerated) {
    count++;
    finalFour = getFinalFour();
    secondRoundCorrect = (gamesCorrect(secondRoundSouth, secondRoundSouthResults2015)
        + gamesCorrect(secondRoundWest, secondRoundWestResults2015)
        + gamesCorrect(secondRoundEast, secondRoundEastResults2015)
        + gamesCorrect(secondRoundMidwest, secondRoundMidwestResults2015));
    sweetSixteenCorrect = (gamesCorrect(sweetSixteenSouth, sweetSixteenSouthResults2015)
        + gamesCorrect(sweetSixteenWest, sweetSixteenWestResults2015)
        + gamesCorrect(sweetSixteenEast, sweetSixteenEastResults2015)
        + gamesCorrect(sweetSixteenMidwest, sweetSixteenMidwestResults2015));
    eliteEightCorrect = (gamesCorrect(eliteEightSouth, eliteEightSouthResults2015)
        + gamesCorrect(eliteEightWest, eliteEightWestResults2015)
        + gamesCorrect(eliteEightEast, eliteEightEastResults2015)
        + gamesCorrect(eliteEightMidwest, eliteEightMidwestResults2015));
    var totalGames = secondRoundCorrect + sweetSixteenCorrect + eliteEightCorrect;
    var totalPercent = (totalGames / (14 * 4)) * 100;//14 games in each region and 4 regions
    allBracketsWins[totalGames]++;
    if (totalPercent > bestPercent) {
        bestPercent = totalPercent;
        bestGames = totalGames;

        bestSecondRoundSouth = secondRoundSouth;
        bestSecondRoundWest = secondRoundWest;
        bestSecondRoundEast = secondRoundEast;
        bestSecondRoundMidwest = secondRoundMidwest;

        bestSweetSixteenSouth = sweetSixteenSouth;
        bestSweetSixteenWest = sweetSixteenWest;
        bestSweetSixteenEast = sweetSixteenEast;
        bestSweetSixteenMidwest = sweetSixteenMidwest;

        bestEliteEightSouth = eliteEightSouth;
        bestEliteEightWest = eliteEightWest;
        bestEliteEightEast = eliteEightEast;
        bestEliteEightMidwest = eliteEightMidwest;
    }
    if (count % 1000000 === 0) {
        console.log("Brackets Completed: " + count);
        console.log("Current Best Percentage: " + bestPercent + "%");
    }
}
var end = new Date().getTime();
var time = end - start;

gamesCorrectVerbose(bestSecondRoundSouth, secondRoundSouthResults2015);
gamesCorrectVerbose(bestSecondRoundWest, secondRoundWestResults2015);
gamesCorrectVerbose(bestSecondRoundEast, secondRoundEastResults2015);
gamesCorrectVerbose(bestSecondRoundMidwest, secondRoundMidwestResults2015);

gamesCorrectVerbose(bestSweetSixteenSouth, sweetSixteenSouthResults2015);
gamesCorrectVerbose(bestSweetSixteenWest, sweetSixteenWestResults2015);
gamesCorrectVerbose(bestSweetSixteenEast, sweetSixteenEastResults2015);
gamesCorrectVerbose(bestSweetSixteenMidwest, sweetSixteenMidwestResults2015);

gamesCorrectVerbose(bestEliteEightSouth, eliteEightSouthResults2015);
gamesCorrectVerbose(bestEliteEightWest, eliteEightWestResults2015);
gamesCorrectVerbose(bestEliteEightEast, eliteEightEastResults2015);
gamesCorrectVerbose(bestEliteEightMidwest, eliteEightMidwestResults2015);

console.log("Number of Brackets made: " + count);
//console.log("Average Bracket Percentage: " + averagePercentage);
console.log("Time taken: " + time / 1000 + " seconds");
console.log("Best Bracket Number of games Correct: " + bestGames);
console.log("Best Bracket Percent of games correct: " + bestPercent.toFixed(2) + "%");

//Show games missed

getPercentWonTotalAndPrint(allBracketsWins);


function gamesCorrectVerbose(arrayOne, arrayTwo) {
    var gamesCount = 0;
    for (var i = 0; i < arrayOne.length; i++) {
        currentGame++;
        if (arrayOne[i] === arrayTwo[i]) {
            gamesCount++;
            //console.log("correct");
        } else {
            gamesMissed.push(currentGame);
            console.log("I missed game number: " + currentGame);
        }
    }
    return gamesCount;
}

function getPercentWonTotalAndPrint(percentWonInput) {
    var totalGamesCorrect = 0;
    var totalBracketsMade = 0;
    for (var i = 0; i < percentWonInput.length; i++) {
        if (percentWonInput[i] > 0) {
            totalBracketsMade = totalBracketsMade + percentWonInput[i];
            totalGamesCorrect = totalGamesCorrect + (i*percentWonInput[i]);
            
        }
    }
    var totalGamesPlayed = totalBracketsMade * 56;
    var averagePercentOfAllGames = (totalGamesCorrect/totalGamesPlayed) * 100;
    console.log("Average percent of all games: " + averagePercentOfAllGames.toFixed(2) + "%");
    return averagePercentOfAllGames;
}

function gamesCorrect(arrayOne, arrayTwo) {
    var gamesCount = 0;
    for (var i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] === arrayTwo[i]) {
            gamesCount++;
            //console.log("correct");
        }
        //console.log("false");
    }
    return gamesCount;
}

function getFinalFour() {

    var firstRoundSouth = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];
    var firstRoundWest = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];
    var firstRoundEast = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];
    var firstRoundMidwest = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15];

    secondRoundSouth = getRoundResults(firstRoundSouth, 16);
    secondRoundWest = getRoundResults(firstRoundWest, 16);
    secondRoundEast = getRoundResults(firstRoundEast, 16);
    secondRoundMidwest = getRoundResults(firstRoundMidwest, 16);

    sweetSixteenSouth = getRoundResults(secondRoundSouth, 8);
    sweetSixteenWest = getRoundResults(secondRoundWest, 8);
    sweetSixteenEast = getRoundResults(secondRoundEast, 8);
    sweetSixteenMidwest = getRoundResults(secondRoundMidwest, 8);

    eliteEightSouth = getRoundResults(sweetSixteenSouth, 4);
    eliteEightWest = getRoundResults(sweetSixteenWest, 4);
    eliteEightEast = getRoundResults(sweetSixteenEast, 4);
    eliteEightMidwest = getRoundResults(sweetSixteenMidwest, 4);

    var finalFourReturn = [];

    finalFourReturn[0] = getWinnerLogTwo(eliteEightSouth[0], eliteEightSouth[1]);
    finalFourReturn[1] = getWinnerLogTwo(eliteEightWest[0], eliteEightWest[1]);
    finalFourReturn[2] = getWinnerLogTwo(eliteEightEast[0], eliteEightEast[1]);
    finalFourReturn[3] = getWinnerLogTwo(eliteEightMidwest[0], eliteEightMidwest[1]);

    //console.log("South: " + finalFourReturn[0]);
    //console.log("West: " + finalFourReturn[1]);
    //console.log("East: " + finalFourReturn[2]);
    //console.log("Midwest: " + finalFourReturn[3]);

    return finalFourReturn;


    function getRoundResults(firstRound, numberOfTeams) {
        var nextRound = [];
        for (var i = 0; i < numberOfTeams; i = i + 2) {
            nextRound[(i / 2)] = getWinnerLogTwo(firstRound[i], firstRound[(i + 1)]);
        }
        return nextRound;
    }


    function getWinnerLogTwo(firstTeam, secondTeam) {
        var seedDifference = Math.abs(firstTeam - secondTeam);
        var favorite;
        var dog;
        if (firstTeam > secondTeam) {
            favorite = firstTeam;
            dog = secondTeam;
        } else {
            favorite = secondTeam;
            dog = firstTeam;
        }
        if (seedDifference > 11) { //4 times
            if (returnWinner(4)) {
                return favorite;
            } else {
                return dog;
            }
        } else if (seedDifference > 5) {//3 times
            if (returnWinner(3)) {
                return favorite;
            } else {
                return dog;
            }
        } else if (seedDifference > 2) {//2 times
            if (returnWinner(2)) {
                return favorite;
            } else {
                return dog;
            }
        } else if (seedDifference === 2) {//flip to see if 2 or 1 times
            if (randomTrueFalse()) {
                if (returnWinner(2)) {
                    return favorite;
                } else {
                    return dog;
                }
            } else {
                if (returnWinner(1)) {
                    return favorite;
                } else {
                    return dog;
                }
            }
        } else {//1 time
            if (returnWinner(1)) {
                return favorite;
            } else {
                return dog;
            }
        }

        function returnWinner(times) {//False means dog won
            for (var i = 0; i < times; i++) {
                if (randomTrueFalse()) {
                    return false;
                }
            }
            return true;
        }
        function randomTrueFalse() {
            return !!Math.floor(Math.random() * 2);
        }
    }
}