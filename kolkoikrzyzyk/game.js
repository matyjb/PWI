var player;
var emptyChar=String.fromCharCode(160); //twarda spacja
var O = "<img src='./../assets/O.png'></img>";
var X = "<img src='./../assets/X.png'></img>";
var winningArray; //tells how many of symbols has player or bot in rows/colums/ondiagonals

function updateWinningArray(lastMoveFieldId,didPlayer) {
  var row = ~~(lastMoveFieldId/3);
  var col = lastMoveFieldId%3;
  if(didPlayer){
    winningArray[row].player += 1;
    winningArray[col+3].player += 1;
    if(row == col) { //diagonal \
      winningArray[6].player += 1;
    }
    if(row + col == 2) { //diagonal /
      winningArray[7].player += 1;
    }
  } else {
    winningArray[row].bot += 1;
    winningArray[col+3].bot += 1;
    if(row == col) { //diagonal \
      winningArray[6].bot += 1;
    }
    if(row + col == 2) { //diagonal /
      winningArray[7].bot += 1;
    }
  }
}

function playerChange(p) {
  if(p!=undefined){
    player = p;
  }else{
    player=!player;
  }
  Array.from(document.getElementsByClassName("turn")).forEach((element)=>{
    switch (element.dataset.who) {
      case "player":
        element.style.backgroundColor = player ? "#039be5" : "inherit";
        element.style.color = player ? "white" : "black";
        break;
      case "bot":
        element.style.backgroundColor = player ? "inherit" : "#039be5";
        element.style.color = player ? "black" : "white";
        break;
    }
  });
  if(!player) { //run bot's move
    setTimeout(handleBotMove, Math.floor(Math.random() * 2000) + 100);
  }
}

function handleClick(id) {
  if(player) handlePlayerMove(id);
}

function handleBotMove() {
  var emptyFields = Array.from(document.getElementsByClassName("field")).filter(element => element.innerText==emptyChar);
  if(emptyFields.length>0) {
    id = Math.floor(Math.random() * emptyFields.length);
    if(!player){ //still bots move
      emptyFields[id].innerHTML = X;
      playerChange();
      updateWinningArray(emptyFields[id].dataset.fieldid, false);
    }
  }
}

function handlePlayerMove(id) {
  if(document.getElementsByClassName("nr"+id)[0].innerText == emptyChar){
    document.getElementsByClassName("nr"+id)[0].innerHTML = O;
    playerChange();
    updateWinningArray(id, true);
  }
}

function clearBoard() {
  Array.from(document.getElementsByClassName("field")).forEach((element)=>{
    element.innerHTML=emptyChar;
  })
}

// function makeMove(id, isPlayer) {
//   document.getElementsByClassName("nr"+id)[0].innerHTML = O;
//   playerChange();
//   updateWinningArray(id, true);
// }

function resetGame() {
  playerChange(true);
  clearBoard();
  winningArray = [ //tells how many of symbols has player or bot in rows/colums/ondiagonals
    {player: 0, bot: 0}, //row 0
    {player: 0, bot: 0}, //row 1
    {player: 0, bot: 0}, //row 2
    {player: 0, bot: 0}, //col 0
    {player: 0, bot: 0}, //col 1
    {player: 0, bot: 0}, //col 2
    {player: 0, bot: 0}, //diagonal \
    {player: 0, bot: 0}, //diagonal /
  ];
}

function bodyOnLoad() {
  resetGame();
}