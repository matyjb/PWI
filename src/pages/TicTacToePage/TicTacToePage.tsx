import React, { Component } from 'react';
import {Grid, withStyles, Paper, Button, Typography} from '@material-ui/core';
import { element } from 'prop-types';
import Media from 'react-media';
var O = require("./../../assets/O.png");
var X = require("./../../assets/X.png");
var XO = require("./../../assets/XO.png");

var styles = {
  pole: {
    display: "table-cell",
    width: "100px",
    height: "100px",
    verticalAlign: "middle",
    // border: "10px solid black",
    borderColor: "black !important",
    borderStyle: "solid !important",
    backgroundColor: "white",
    transition: "background-color 0.4s ease-out",
    "&:hover": {
      backgroundColor: "#eeeeee",
      transition: "background-color 0.4s ease-in",
      cursor: "pointer",
    },
    "&:active":{
      backgroundColor: "#cfcfcf",
      transition: "background-color 0.1s ease-in-out",
      cursor: "pointer",
    }
  },
  moveIndicator: {
    transition: "background-color 0.6s",
  },
  moveIndicatorText: {
    transition: "color 0.6s",
  }

}

interface IState {
    rowColDiagSymbolsCountArray: {player: Number, bot: Number}[],
    gameStatus: {whoWin: "player" | "bot" | "draw" | null, whereRowColDiagId: Number | null},
    isPlayerTurn: boolean,
    board: number[] //0 nothing 1 player 2 bot
}
interface IProps {
  classes: any,
}
class TicTacToePage extends Component<IProps, IState> {
  state = {
    rowColDiagSymbolsCountArray: new Array(
      {player: 0, bot: 0}, //row 0
      {player: 0, bot: 0}, //row 1
      {player: 0, bot: 0}, //row 2
      {player: 0, bot: 0}, //col 0
      {player: 0, bot: 0}, //col 1
      {player: 0, bot: 0}, //col 2
      {player: 0, bot: 0}, //diag \
      {player: 0, bot: 0}, //diag /
    ),
    gameStatus: {whoWin: null, whereRowColDiagId: null},
    isPlayerTurn: true,
    board: [0,0,0,0,0,0,0,0,0]
  }
  handleBotsMove(){
    if (!this.state.isPlayerTurn && this.state.gameStatus.whoWin === null) {
          if (true) {
              //bot cant be perfect
              //pick best
              //rank importance of placing symbol in rows columns diagonals
              var ranksRowColDiag = this.state.rowColDiagSymbolsCountArray
                  .map((element, i)=>{
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
                  .sort((a, b)=>{return b.rank - a.rank; }); //sort ranks descending
              //get most important
              var bestRowColDiag: number[] = [];
              ranksRowColDiag.forEach((element)=> {
                  if (element.rank === ranksRowColDiag[0].rank) {
                      bestRowColDiag.push(element.rowColDiagIndex);
                  }
              });
              var fieldsToChooseFrom: number[] = [];
              this.state.board.forEach((element,index) => {
                if(element===0){
                  var row = ~~(index / 3),
                      col = index % 3;
                  if (bestRowColDiag.indexOf(row) > -1) {
                      fieldsToChooseFrom.push(index);
                  } 
                  else if (bestRowColDiag.indexOf(col + 3) > -1) {
                      fieldsToChooseFrom.push(index);
                  }
                  else if (row === col) {
                      //diagonal \
                      if (bestRowColDiag.indexOf(6) > -1) {
                          fieldsToChooseFrom.push(index);
                      }
                  }
                  else if (row + col == 2) {
                      //diagonal /
                      if (bestRowColDiag.indexOf(7) > -1) {
                          fieldsToChooseFrom.push(index);
                      }
                  }
                }
              });
              //choose randomly
              if (fieldsToChooseFrom.length > 0) {
                var id = Math.floor(Math.random() * fieldsToChooseFrom.length);
                if (!this.state.isPlayerTurn) {
                    //still bots move
                    this.placeOnBoard(fieldsToChooseFrom[id], 2);
                    this.setState({isPlayerTurn: true}); 
                }
            }
          } else {
              //random pick
              // var emptyFields = Array.from(fields).filter(function (element) {
              //     return element.innerText === emptyChar;
              // });
              // if (emptyFields.length > 0) {
              //     var id = Math.floor(Math.random() * emptyFields.length);
              //     if (!isPlayerTurn) {
              //         //still bots move
              //         lastChosenFieldId = emptyFields[id].dataset.fieldid;
              //         update();
              //     }
              // }
          }
        }
  }
  updateState() {
    // var {rowColDiagSymbolsCountArray} = this.state;
    var rcdsca = new Array(
      {player: 0, bot: 0}, //row 0
      {player: 0, bot: 0}, //row 1
      {player: 0, bot: 0}, //row 2
      {player: 0, bot: 0}, //col 0
      {player: 0, bot: 0}, //col 1
      {player: 0, bot: 0}, //col 2
      {player: 0, bot: 0}, //diag \
      {player: 0, bot: 0}, //diag /
    );
    this.state.board.forEach((element, index)=>{
      var row = ~~(index / 3), col = index % 3;
      if(element === 1){
        rcdsca[row].player += 1;
        rcdsca[col + 3].player += 1;
        if (row === col) {
            //diagonal \
            rcdsca[6].player += 1;
        }
        if (row + col === 2) {
            //diagonal /
            rcdsca[7].player += 1;
        }
      }else if(element === 2){
        rcdsca[row].bot += 1;
        rcdsca[col + 3].bot += 1;
        if (row === col) {
            //diagonal \
            rcdsca[6].bot += 1;
        }
        if (row + col === 2) {
            //diagonal /
            rcdsca[7].bot += 1;
        }
      }
    });
    this.setState({rowColDiagSymbolsCountArray: rcdsca});
    //gamestatus
    var sum = 0;
    rcdsca.forEach((element, i) => {
        if (element.player === 3) {
            this.setState({gameStatus: {whoWin: "player", whereRowColDiagId: i}});
        }
        if (element.bot === 3) {
          this.setState({gameStatus: {whoWin: "bot", whereRowColDiagId: i}});
        }
        sum += element.player + element.bot;
    });
    if (sum === 24 && this.state.gameStatus.whoWin === null) {
      this.setState({gameStatus: {whoWin: "draw", whereRowColDiagId: null}});
    }
  }
  placeOnBoard(index: number, value: number) {
    var b2 = this.state.board;
    b2[index]=value;
    this.setState({board: b2});
    this.updateState();
  }
  handleClick(row: number, col: number) {
    if(this.state.isPlayerTurn && this.state.board[row*3+col]==0 && this.state.gameStatus.whoWin == null) {
      this.placeOnBoard(row*3+col, 1);
      this.setState({isPlayerTurn: false})
      //run bots move
      setTimeout(()=>this.handleBotsMove(), Math.floor(Math.random()*1500)+100);
    }
  }
  restartGame(){
    this.setState({board: [0,0,0,0,0,0,0,0,0]});
    this.setState({rowColDiagSymbolsCountArray: new Array(
      {player: 0, bot: 0}, //row 0
      {player: 0, bot: 0}, //row 1
      {player: 0, bot: 0}, //row 2
      {player: 0, bot: 0}, //col 0
      {player: 0, bot: 0}, //col 1
      {player: 0, bot: 0}, //col 2
      {player: 0, bot: 0}, //diag \
      {player: 0, bot: 0}, //diag /
    )});
    this.setState({gameStatus: {whoWin: null, whereRowColDiagId: null}});
    this.setState({isPlayerTurn: true});
    console.log(this.state.rowColDiagSymbolsCountArray)
  }
  render() {
    const {classes} = this.props
    return (
        <Grid container justify="center">
          <Media query="(max-width: 640px)">
          {matches => 
          <Paper style={{maxWidth: matches ? 320 : 620, padding: 10}}>
            <Grid container justify="center">
              <Grid item style={{minWidth: 300, minHeight:300, textAlign: "center"}}>
                {[0,1,2].map((row: number, rowindex: number)=>
                <Grid 
                container
                key={rowindex}
                justify="center"
                >
                  {[0,1,2].map((col: number, colindex: number)=>
                  <Grid item key={colindex}>
                    <div className={classes.pole} style={{boxSizing: "border-box", borderLeft: (col===0) ? 0 : 1, borderRight: (col===2) ? 0 : 1, borderTop: (row===0) ? 0 : 1, borderBottom: (row===2) ? 0 : 1}} 
                          onClick={()=>this.handleClick(row, col)}>
                      {this.state.board[row*3+col] === 1 && <img alt="O field" src={O}/>}      
                      {this.state.board[row*3+col] === 2 && <img alt="X field" src={X}/>}      
                    </div>
                  </Grid>
                  )}
                </Grid>
                  
                  )}
              </Grid>
              <Grid item style={{minWidth: 300, minHeight:300, textAlign: "center", padding: 10}}>
                <Grid container direction="column" justify="space-between" alignItems="stretch" style={{height: "100%"}}>
                  <Button onClick={()=>this.restartGame()} fullWidth variant="contained" color="primary">reset</Button>
                  <div>
                    <Paper style={{
                      padding: 10,
                      backgroundColor: this.state.isPlayerTurn ? "#5c6bc0" : "white",
                    }}
                    className={classes.moveIndicator}
                    >
                      <Typography className={classes.moveIndicatorText} variant="h5" component="h3" style={{color: this.state.isPlayerTurn ? "white" : "black",}}>
                        Gracz
                      </Typography>
                    </Paper>
                    <Paper style={{
                      padding: 10,
                      backgroundColor: !this.state.isPlayerTurn ? "#5c6bc0" : "white",
                    }}
                    className={classes.moveIndicator}
                    >
                      <Typography className={classes.moveIndicatorText} variant="h5" component="h3" style={{color: !this.state.isPlayerTurn ? "white" : "black",}}>
                        Bot
                      </Typography>
                    </Paper>
                  </div>
                  <div style={{height: 80}}>
                    {this.state.gameStatus.whoWin === "player" && <img alt="O field" src={O}/>}      
                    {this.state.gameStatus.whoWin === "bot" && <img alt="X field" src={X}/>} 
                    {this.state.gameStatus.whoWin === "draw" && <img alt="X field" src={XO}/>} 
                  </div>
                  <Typography variant="h5" component="h3">
                        {this.state.gameStatus.whoWin === "player" && "Wygrywa gracz!"} 
                        {this.state.gameStatus.whoWin === "bot" && "Wygrywa bot!"} 
                        {this.state.gameStatus.whoWin === "draw" && "Remis!"}
                        {this.state.gameStatus.whoWin === null && String.fromCharCode(160)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
            }
          </Media>
        </Grid>
    )
  }
}
export default withStyles(styles)(TicTacToePage);