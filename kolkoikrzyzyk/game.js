var player=true;

function handleClick(id) {
  if(player) placeOn(id);
}

function handleBotsMove() {
  var emptyFields = Array.from(document.getElementsByClassName("field")).filter(element => element.innerText=="_");
  if(emptyFields.length>0) {
    id = Math.floor(Math.random() * emptyFields.length);
    emptyFields[id].innerText = player ? "O" : "X";
    player=!player;
  }
}

function placeOn(id) {
  document.getElementsByClassName("nr"+id)[0].innerText = player ? "O" : "X";
  player = !player;
  if(!player) { //run bot's move
  setTimeout(handleBotsMove, Math.floor(Math.random() * 2000) + 100);
  }
}

function clearBoard() {
  Array.from(document.getElementsByClassName("field")).forEach((element,i)=>{
    element.innerText="_";
  })
}

function bodyOnLoad() {
  clearBoard();
}