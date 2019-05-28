import React from 'react'
import { Grid, Paper, Typography, Divider } from '@material-ui/core';
import Media from 'react-media';

const BlogPost = props => (
      <Media query="(max-width: 600px)">
      {matches => 
        <div style={{margin: !matches ? "20px 10%" : "20px 1%"}}>
          <Paper elevation={1}>
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{padding: 3}}
            >
            <Grid item>
              <Typography variant="h4">
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {props.date}
              </Typography>
            </Grid>
          </Grid>
            <Divider/>
            <Typography component="p" style={{padding: 3}}>
              {props.children}
            </Typography>
          </Paper>
        </div>
      }
      </Media>
)
export default BlogPost;