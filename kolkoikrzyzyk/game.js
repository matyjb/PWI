var player=true;
var emptyChar=String.fromCharCode(160); //twarda spacja
var O = "<img src='./../assets/O.png'></img>";
var X = "<img src='./../assets/X.png'></img>";

function handleClick(id) {
  if(player) handlePlayerMove(id);
}

function handleBotMove() {
  var emptyFields = Array.from(document.getElementsByClassName("field")).filter(element => element.innerText==emptyChar);
  if(emptyFields.length>0) {
    id = Math.floor(Math.random() * emptyFields.length);
    if(!player){ //still bots move
      emptyFields[id].innerHTML = player ? O : X;
      player=!player;
    }
  }
}

function handlePlayerMove(id) {
  if(document.getElementsByClassName("nr"+id)[0].innerText == emptyChar){
    // document.getElementsByClassName("nr"+id)[0].innerText = player ? "O" : "X";
    document.getElementsByClassName("nr"+id)[0].innerHTML = player ? O : X;
    player = !player;
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
  player = true;
  clearBoard();
}

function bodyOnLoad() {
  clearBoard();
}