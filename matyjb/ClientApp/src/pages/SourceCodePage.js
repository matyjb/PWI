import React, { Component } from 'react';
import { Container } from 'reactstrap';
import {Typography, Grid, IconButton, Paper} from "@material-ui/core"
import { Code, Archive } from '@material-ui/icons';

export default class SourceCodePage extends Component {
  render() {
    return (
      <Container style={{textAlign: "center"}}>
        <Grid container direction="row" justify="space-around" alignItems="center">
          <Paper style={{padding: 4}}>
            <Grid container item direction="column">
              <Grid item>
                <IconButton onClick={()=>{
                  window.location.href = "https://github.com/matyjb/PWI";
                }}>
                  <Code style={{width: 100, height: 100}}/>
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>Zobacz kod na Githubie</Typography>
              </Grid>
            </Grid>
          </Paper>
          <Paper style={{padding: 4}}>
            <Grid container item direction="column">
              <Grid item>
                <IconButton onClick={()=>{
                  window.location.href = "https://github.com/matyjb/PWI/archive/master.zip";
                }}>
                  <Archive  style={{width: 100, height: 100}}/>
                </IconButton>
              </Grid>
              <Grid item>
                <Typography>Pobierz zip</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    )
  }
}