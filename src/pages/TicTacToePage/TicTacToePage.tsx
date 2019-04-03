import React, { Component } from 'react';
import {Typography, Grid, withStyles} from '@material-ui/core';
// import { BorderBox } from "react-box-sizing";
const box = require("react-box-sizing");
var O = require("./../../assets/O.png");
var X = require("./../../assets/X.png");
var XO = require("./../../assets/XO.png");

var styles = {
  pole: {
    display: "table-cell",
    width: "100px",
    height: "100px",
    verticalAlign: "middle",
    border: "1px solid black",
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
  }
}

interface IState {
    rowColDiagSymbolsCountArray: Array<{player: Number, bot: Number}>,
    gameStatus: {who: "player" | "bot" | null, whereRowColDiagId: Number | null},
    isPlayerTurn: boolean,
    board: Array<"player" | "bot" | null>
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
    gameStatus: {who: null, whereRowColDiagId: null},
    isPlayerTurn: false,
    board: new Array(null, null, null,null, null, null,null, null, null,),
  }
  render() {
    const {classes} = this.props
    return (
      <div style={{
        display:"flex",
        justifyContent: "center",
        textAlign: "center"
        }}>
        <div>
          {[0,1,2].map((row: number)=>
          <Grid 
          container
          >
            {[0,1,2].map((col: number)=>
            <Grid item>
            <box.BorderBox>
              <div className={classes.pole} onClick={()=>console.log(row*3+col)}></div>
            </box.BorderBox>
            </Grid>
            )}
          </Grid>
            
          )}
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(TicTacToePage);