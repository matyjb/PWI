import React, { Component } from 'react'
import { Divider, Button, Typography, Grid } from '@material-ui/core';

var styles = {
  image: {
    maxHeight: 400,
    overflow: "hidden",
    border: "solid 5px #3f51b5",
    borderRadius: 20,
    boxShadow: "6px 6px 8px darkgrey",
  }
}

export default class Project extends Component {
  render() {
    const {title,image,description,githubLink} = this.props;
    return (
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h2">{title}</Typography>
        </Grid>
        <Grid item>
          <div style={styles.image}>
            <img alt="i" src={image} style={{width: "100%"}}/>
          </div>
        </Grid>
        <Grid item>
          <Typography style={{marginTop: 20}}>{description}</Typography>
        </Grid>
        <Grid item style={{textAlign: "center"}}>
          <Button onClick={()=>{
                  window.location.href = githubLink;
                }}>View on Github</Button>
        </Grid>
        <Divider/>
      </Grid>
    )
  }
}

//title
//image
//opis
//link do gita
//divider
