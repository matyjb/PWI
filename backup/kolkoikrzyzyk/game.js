//game state
var isPlayerTurn = Boolean;
var rowColDiagSymbolsCountArray = new Array({ player: Number, bot: Number });
var gameStatus = { whoWins: String, whereIdWinningArray: Number };

//consts
var O = "<img src='./../assets/O.png'></img>";
var X = "<img src='./../assets/X.png'></img>";
var XO = "<img src='./../assets/XO.png'></img>";
var ver = window.navigator.userAgent.indexOf("MSIE ");
var emptyChar = ver >= 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) ? "_" : String.fromCharCode(160);
//elements
var whoWinsImgWrap;
var whoWinsTextWrap;
var fields;
var winRedLine;
var turnIndicators;

//clicks
var lastChosenFieldId;

//updates game
function update() {
    "use strict";
    //update board
    //place symbol
    if (lastChosenFieldId !== null) {
        if (fields[lastChosenFieldId].innerText == emptyChar) {
            fields[lastChosenFieldId].innerHTML = isPlayerTurn ? O : X;
            isPlayerTurn = !isPlayerTurn;
            //update rowColDiagSymbolsCountArray
            var row = ~~(lastChosenFieldId / 3), col = lastChosenFieldId % 3;
            if (!isPlayerTurn) {
                rowColDiagSymbolsCountArray[row].player += 1;
                rowColDiagSymbolsCountArray[col + 3].player += 1;
                if (row === col) {
                    //diagonal \
                    rowColDiagSymbolsCountArray[6].player += 1;
                }
                if (row + col === 2) {
                    //diagonal /
                    rowColDiagSymbolsCountArray[7].player += 1;
                }
            } else {
                rowColDiagSymbolsCountArray[row].bot += 1;
                rowColDiagSymbolsCountArray[col + 3].bot += 1;
                if (row === col) {
                    //diagonal \
                    rowColDiagSymbolsCountArray[6].bot += 1;
                }
                if (row + col === 2) {
                    //diagonal /
                    rowColDiagSymbolsCountArray[7].bot += 1;
                }
            }
        }
        lastChosenFieldId = null; //handled making a move
    }
    //update gameStatus
    var sum = 0;
    rowColDiagSymbolsCountArray.forEach(function (element, i) {
        if (element.player === 3) {
            gameStatus = { whoWins: "player", whereIdWinningArray: i };
        }
        if (element.bot === 3) {
            gameStatus = { whoWins: "bot", whereIdWinningArray: i };
        }
        sum += element.player + element.bot;
    });
    if (sum === 24 && gameStatus.whoWins === null) {
        gameStatus = { whoWins: "draw", whereIdWinningArray: null };
    }

    //update whose turn indicator
    Array.from(turnIndicators).forEach(function (element) {
        switch (element.dataset.who) {
        case "player":
            element.style.backgroundColor = isPlayerTurn ? "#039be5" : "inherit";
            element.style.color = isPlayerTurn ? "white" : "black";
            break;
        case "bot":
            element.style.backgroundColor = isPlayerTurn ? "inherit" : "#039be5";
            element.style.color = isPlayerTurn ? "black" : "white";
            break;
        }
    });
    //draw red winning line (and block inputs)
    if (gameStatus.whereIdWinningArray !== null) {
        if (gameStatus.whereIdWinningArray === 6) {
            winRedLine.innerHTML =
                "<img class='slash' src='./../assets/winslash.png'></img>";
        } else if (gameStatus.whereIdWinningArray === 7) {
            winRedLine.innerHTML =
                "<img class='slash' style='transform: rotate(90deg)' src='./../assets/winslash.png'></img>";
        } else if (gameStatus.whereIdWinningArray <= 2) {
            winRedLine.innerHTML =
                "<div class='slash' style='background-color: red; height: 20px; margin-top:" +
                gameStatus.whereIdWinningArray * 100 +
                "px;' margin-bottom:" +
                (2 - gameStatus.whereIdWinningArray) * 100 +
                "px;'></div>";
        } else if (gameStatus.whereIdWinningArray <= 5) {
            winRedLine.innerHTML =
                "<div class='slash' style='background-color: red; width: 20px; margin-left:" +
                (gameStatus.whereIdWinningArray - 3) * 100 +
                "px;' margin-right:" +
                (5 - gameStatus.whereIdWinningArray) * 100 +
                "px;'></div>";
        }
        winRedLine.style.display = "block";
    }
    switch (gameStatus.whoWins) {
    case "player":
        whoWinsImgWrap.innerHTML = O;
        whoWinsTextWrap.innerText = "wygrywa!";
        break;
    case "bot":
        whoWinsImgWrap.innerHTML = X;
        whoWinsTextWrap.innerText = "wygrywa!";
        break;
    case "draw":
        whoWinsImgWrap.innerHTML = XO;
        whoWinsTextWrap.innerText = "remis!";
        break;
    }
    
    //bot's turn
    if (!isPlayerTurn && gameStatus.whoWins === null) {
        //run bot's move
        setTimeout(function () {
            if (true) {
                //bot cant be perfect
                //pick best
                //rank importance of placing symbol in rows columns diagonals
                var ranksRowColDiag = rowColDiagSymbolsCountArray
                    .map(function (element, i) {
                        var rank = 0,
                            p = element.player,
                            b = element.bot;

                        if (p === 0 && b === 2) { rank = 6; }
                        else if (p === 2 && b === 0) { rank = 5; }
                        else if (p === 0 && b === 1) { rank = 4; }
                        else if (p === 0 && b === 0) { rank = 3; }
                        else if (p === 1 && b === 0) { rank = 2; }
                        else if (p === 1 && b === 1) { rank = 1; }
                        else if (p === 1 && b === 2) { rank = 0; }
                        else if (p === 2 && b === 1) { rank = 0; }
                        return { rowColDiagIndex: i, rank: rank };
                    })
                    .sort(function (a, b) {return b.rank - a.rank; }); //sort ranks descending
                //get most important
                var bestRowColDiag = [];
                ranksRowColDiag.forEach(function (element) {
                    if (element.rank === ranksRowColDiag[0].rank) {
                        bestRowColDiag.push(element.rowColDiagIndex);
                    }
                });
                //find fields that are important to place symbol on it
                var emptyFields = Array.from(fields).filter(function (element) {
                    return element.innerText === emptyChar;
                });
                var mostImportantFields = emptyFields.filter(function (element) {
                    var row = ~~(element.dataset.fieldid / 3),
                        col = element.dataset.fieldid % 3;
                    if (bestRowColDiag.indexOf(row) > -1) {
                        return true;
                    } 
                    if (bestRowColDiag.indexOf(col + 3) > -1) {
                        return true;
                    }
                    if (row === col) {
                        //diagonal \
                        if (bestRowColDiag.indexOf(6) > -1) {
                            return true;
                        }
                    }
                    if (row + col == 2) {
                        //diagonal /
                        if (bestRowColDiag.indexOf(7) > -1) {
                            return true;
                        }
                    }
                    return false;
                });
                //choose randomly
                if (mostImportantFields.length > 0) {
                    var id = Math.floor(Math.random() * mostImportantFields.length);
                    if (!isPlayerTurn) {
                        //still bots move
                        lastChosenFieldId = mostImportantFields[id].dataset.fieldid;
                        update();
                    }
                }
            } else {
                //random pick
                var emptyFields = Array.from(fields).filter(function (element) {
                    return element.innerText === emptyChar;
                });
                if (emptyFields.length > 0) {
                    var id = Math.floor(Math.random() * emptyFields.length);
                    if (!isPlayerTurn) {
                        //still bots move
                        lastChosenFieldId = emptyFields[id].dataset.fieldid;
                        update();
                    }
                }
            }
        }, Math.floor(Math.random() * 1500) + 100);
    }
}

//starts/resets game
function start() {
    "use strict";
    Array.from(fields).forEach(function (element) {
        element.innerHTML = emptyChar;
    });
    winRedLine.style.display = "none";
    rowColDiagSymbolsCountArray = [
        //tells how many symbols has player or bot in rows/colums/ondiagonals
        { player: 0, bot: 0 }, //row 0
        { player: 0, bot: 0 }, //row 1
        { player: 0, bot: 0 }, //row 2
        { player: 0, bot: 0 }, //col 0
        { player: 0, bot: 0 }, //col 1
        { player: 0, bot: 0 }, //col 2
        { player: 0, bot: 0 }, //diagonal \
        { player: 0, bot: 0 } //diagonal /
    ];
    gameStatus = { whoWins: null, whereIdWinningArray: null };
    whoWinsImgWrap.innerText = "";
    whoWinsTextWrap.innerText = "";
    lastChosenFieldId = null;
    isPlayerTurn = true;
    update();
}

function bodyOnLoad() {
    "use strict";
    whoWinsImgWrap = document.getElementById("who-wins-img-wrap");
    whoWinsTextWrap = document.getElementById("who-wins-text-wrap");
    fields = document.getElementsByClassName("field");
    winRedLine = document.getElementsByClassName("win-slash")[0];
    turnIndicators = document.getElementsByClassName("turn");
    start();
}

function handleClick(fieldId) {
    "use strict";
    if (isPlayerTurn && gameStatus.whoWins === null) {
        lastChosenFieldId = fieldId;
        update();
    }
}