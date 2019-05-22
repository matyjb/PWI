import React, { Component } from 'react';
import BlogPost from './../components/BlogPost';
import {Typography, LinearProgress} from "@material-ui/core"
import moment from "moment";

var styles={
  titleBox: {
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  }
}
export default class HomePage extends Component {
  state={
    isBlogLoading: true,
    posts: null,
  }
  componentDidMount() {
    // This method is called when the component is first added to the document
    this.fetchBlogPosts();
  }

  async fetchBlogPosts() {
    const url = `api/Blog/all`;
    const response = await fetch(url);
    const posts = await response.json();
    this.setState({posts: posts});
    this.setState({isBlogLoading: false});
  }
  render() {
    return (
      <div>
        <div style={styles.titleBox}>
          <Typography variant="h2">
            matyjb
          </Typography>
        </div> 
        {this.state.isBlogLoading ? 
          <LinearProgress />
        :
          <div>
            {this.state.posts.map((post, index)=>(
              <BlogPost key={index} title={post.title} date={moment(post.date).format("L")}>
                {post.content}
              </BlogPost>
            ))}
          </div>
      }
      </div>
    )
  }
}