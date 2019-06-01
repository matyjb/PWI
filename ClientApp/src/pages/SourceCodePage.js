import React, { Component } from 'react';
import { Container } from 'reactstrap';
import {Typography, Grid, IconButton, Paper} from "@material-ui/core"
import { Code, Archive } from '@material-ui/icons';
import { translate } from 'react-multi-lang';

class SourceCodePage extends Component {
  render() {
    const { t } = this.props;
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
                <Typography>{t("sourceCode.seeOnGithub")}</Typography>
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
                <Typography>{t("sourceCode.downloadZip")}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    )
  }
}

export default translate(SourceCodePage);