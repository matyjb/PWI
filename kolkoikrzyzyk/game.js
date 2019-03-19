var player = Boolean;
const emptyChar=String.fromCharCode(160); //twarda spacja
const O = "<img src='./../assets/O.png'></img>";
const X = "<img src='./../assets/X.png'></img>";
var winningArray = new Array({player: Number, bot: Number}); //tells how many of symbols has player or bot in rows/colums/ondiagonals
var win = {whoWins: "player" | "bot" | "draw" | null, whereIdWinningArray: Number | null};

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
  if(Math.random()<0.97){ //bot cant be perfect
    //pick best
    let rankWinningArray = winningArray.map((element,i)=>{
      let r=0;
      let p = element.player;
      let b = element.bot;
      if(p==0 && b==2) r=6;
      else if(p==2 && b==0) r=5;
      else if(p==0 && b==1) r=4;
      else if(p==0 && b==0) r=3;
      else if(p==1 && b==0) r=2;
      else if(p==1 && b==1) r=1;
      else if(p==1 && b==2) r=0;
      else if(p==2 && b==1) r=0;
      return {winningArrayIndex: i, rank: r};
    }).sort((a,b)=>b.rank-a.rank); //sort numbers descending
    
    let bestRowColDiag = [];
    rankWinningArray.forEach((element)=>{
      if(element.rank == rankWinningArray[0].rank) bestRowColDiag.push(element.winningArrayIndex);
    });
    let bestMovesFields = Array.from(document.getElementsByClassName("field")).filter(element => element.innerText==emptyChar).filter(element=>{
      var row = ~~(element.dataset.fieldid/3);
    var col = element.dataset.fieldid%3;
    if(bestRowColDiag.includes(row)) return true;
    if(bestRowColDiag.includes(col+3)) return true;
    if(row == col) { //diagonal \
      if(bestRowColDiag.includes(6)) return true;
    }
    if(row + col == 2) { //diagonal /
      if(bestRowColDiag.includes(7)) return true;
    }
    return false;
  });
  if(bestMovesFields.length>0) {
    id = Math.floor(Math.random() * bestMovesFields.length);
    if(!player){ //still bots move
      makeMove(bestMovesFields[id].dataset.fieldid, false);
    }
  }
}else{

  //random pick
  var emptyFields = Array.from(document.getElementsByClassName("field")).filter(element => element.innerText==emptyChar);
  if(emptyFields.length>0) {
      id = Math.floor(Math.random() * emptyFields.length);
      if(!player){ //still bots move
        makeMove(emptyFields[id].dataset.fieldid, false);
      }
    }
  }
}

function handlePlayerMove(id) {
  if(document.getElementsByClassName("nr"+id)[0].innerText == emptyChar){
    makeMove(id, true);
  }
}

function clearBoard() {
  Array.from(document.getElementsByClassName("field")).forEach((element)=>{
    element.innerHTML=emptyChar;
  })
}

function makeMove(id, isPlayer) {
  if(!win.whoWins){
    document.getElementsByClassName("nr"+id)[0].innerHTML = isPlayer ? O : X;
    playerChange();
    updateWinningArray(id, isPlayer);
    isWinOrDraw();
  }
}

function isWinOrDraw() {
  let sum = 0;
  winningArray.forEach((element,i) => {
    if(element.player == 3) win = {whoWins: "player", whereIdWinningArray: i}
    if(element.bot == 3) win = {whoWins: "bot", whereIdWinningArray: i}
    sum += element.player + element.bot;
  });
  if(sum == 24) {
    win = {whoWins: "draw", whereIdWinningArray: null}
  }
}

function resetGame() {
  playerChange(true);
  clearBoard();
  winningArray = [ //tells how many symbols has player or bot in rows/colums/ondiagonals
    {player: 0, bot: 0}, //row 0
    {player: 0, bot: 0}, //row 1
    {player: 0, bot: 0}, //row 2
    {player: 0, bot: 0}, //col 0
    {player: 0, bot: 0}, //col 1
    {player: 0, bot: 0}, //col 2
    {player: 0, bot: 0}, //diagonal \
    {player: 0, bot: 0}, //diagonal /
  ];
  win = {whoWins: null, whereIdWinningArray: null};
}

function bodyOnLoad() {
  resetGame();
}