import React, { Component } from 'react';
import BlogPost from './../components/BlogPost';
import {Typography, LinearProgress, Divider, Grid} from "@material-ui/core"
import moment from "moment";
import GKimg from './../assets/GK.png'; 
import opsuimg from './../assets/opsu.png'; 
import csharpimg from './../assets/csharp.png'; 
import jsimg from './../assets/js.png'; 
import reactimg from './../assets/react.png'; 
import Project from '../components/Project';
import { translate } from 'react-multi-lang';

var styles={
  titleBox: {
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  }
}
class HomePage extends Component {
  state={
    isBlogLoading: true,
    posts: null,
  }
  componentDidMount() {
    // This method is called when the component is first added to the document
    // this.fetchBlogPosts();
  }

  // async fetchBlogPosts() {
  //   const url = `https://matyjbpwi.azurewebsites.net/api/Blog/all`;
  //   const response = await fetch(url);
  //   const posts = await response.json();
  //   this.setState({posts: posts});
  //   this.setState({isBlogLoading: false});
  // }
  render() {
    const {t} = this.props;
    return (
      <div>
        <div style={styles.titleBox}>
          <Typography variant="h2">
            matyjb
          </Typography>
        </div>
        <Grid container direction="row" justify="space-evenly" spacing="">
          <Grid item style={{height: 100}}>
            <img src={jsimg} alt="js" style={{height: "100%"}}/>
          </Grid>
          <Grid item style={{height: 100}}>
            <img src={csharpimg} alt="csharp" style={{height: "100%"}}/>
          </Grid>
          <Grid item style={{height: 100}}>
            <img src={reactimg} alt="react" style={{height: "100%"}}/>
          </Grid>
        </Grid>
        <Divider style={{margin:"10px 0"}}/>
        <Typography variant="h2" style={{marginTop: 20}}>{t("homePage.projects")}</Typography>
        <Divider style={{margin:"10px 0"}}/>
        <Project image={opsuimg} githubLink="https://github.com/matyjb/opsu" description={t("homePage.opsuDesc")} title={t("homePage.opsuTitle")}></Project>
        <Project image={GKimg} githubLink="https://github.com/matyjb/GK-3D" description={t("homePage.gkDesc")} title={t("homePage.gkTitle")}></Project>
        
        {/* <Typography variant="h2" style={{marginTop: 20}}>{t("homePage.blog")}</Typography>
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
        } */}
      </div>
    )
  }
}
export default translate(HomePage);