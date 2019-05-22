import React, { Component } from 'react';
import BlogPost from './../components/BlogPost';
import {Typography} from "@material-ui/core"

var styles={
  titleBox: {
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  }
}
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <div style={styles.titleBox}>
          <Typography variant="h2">
            matyjb
          </Typography>
        </div>
        <BlogPost title="Title" date="2.4.2019">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam rem eligendi ipsum officiis ad ratione facere velit tenetur reprehenderit labore, non voluptatibus mollitia, aperiam unde dolore eaque suscipit. Veritatis, quam.
        </BlogPost>
      </div>
    )
  }
}