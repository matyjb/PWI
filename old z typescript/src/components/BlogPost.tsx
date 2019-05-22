import React, { Component } from 'react'
import { Grid, Paper, Typography, Divider } from '@material-ui/core';
import Media from 'react-media';

interface IProps {
  title: string,
  date: string
}

export default class BlogPost extends Component<IProps> {
  render() {
    const {date, title} = this.props;
    return (
      <Media query="(max-width: 600px)">
      {matches => 
        <div style={{margin: !matches ? "0 10%" : "0 1%"}}>
          <Paper elevation={1}>
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{padding: 3}}
            >
            <Grid item>
              <Typography variant="h4">
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {date}
              </Typography>
            </Grid>
          </Grid>
            <Divider/>
            <Typography component="p" style={{padding: 3}}>
              {this.props.children}
            </Typography>
          </Paper>
        </div>
      }
      </Media>
    )
  }
}
