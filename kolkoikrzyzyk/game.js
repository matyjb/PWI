var player;
var emptyChar=String.fromCharCode(160); //twarda spacja
var O = "<img src='./../assets/O.png'></img>";
var X = "<img src='./../assets/X.png'></img>";

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
  })
}

function handleClick(id) {
  if(player) handlePlayerMove(id);
}

function handleBotMove() {
  var emptyFields = Array.from(document.getElementsByClassName("field")).filter(element => element.innerText==emptyChar);
  if(emptyFields.length>0) {
    id = Math.floor(Math.random() * emptyFields.length);
    if(!player){ //still bots move
      emptyFields[id].innerHTML = player ? O : X;
      playerChange();
    }
  }
}

function handlePlayerMove(id) {
  if(document.getElementsByClassName("nr"+id)[0].innerText == emptyChar){
    document.getElementsByClassName("nr"+id)[0].innerHTML = player ? O : X;
    playerChange();
  }
  if(!player) { //run bot's move
  setTimeout(handleBotMove, Math.floor(Math.random() * 2000) + 100);
  }
}

function clearBoard() {
  Array.from(document.getElementsByClassName("field")).forEach((element)=>{
    element.innerHTML=emptyChar;
  })
}

function resetGame() {
  playerChange(true);
  clearBoard();
}

function bodyOnLoad() {
  clearBoard();
  playerChange(true);
}