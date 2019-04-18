import React, { Component } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {Button, SvgIcon, Avatar, Grid, Typography} from '@material-ui/core';
import Media from 'react-media';



export default class FBLogin extends Component {
  static contextType = GlobalContext;

  responseFacebook = (response:any) => {
    let ctx = this.context;
    if(!response.userID) return;
    
    var fbContent = {
      isLoggedIn: true,
      userID: response.userID,
      first_name: response.first_name,
      email: response.email,
      picture: response.picture.data.url
    };
    ctx.setFbContent(fbContent);
  };
  render() {
    let ctx = this.context;
    return (
      <Media query="(max-width: 600px)">
      {matches => 
          <div>
            {ctx.fbContent.isLoggedIn ? 
              <>
                <Grid container justify="center" spacing={16} alignItems="center">
                <Grid item>
                    <Avatar style={{height:30, width:30}} alt={ctx.fbContent.name} src={ctx.fbContent.picture} />
                </Grid>
                {!matches && 
                <Grid item>
                  <Typography variant="subtitle1" style={{color: "white"}}>
                    {ctx.fbContent.first_name}
                  </Typography>
                </Grid>
                }
                <Grid item>
                  <Button variant="contained" color="primary" style={{color: "white", backgroundColor: "#5c6bc0"}} onClick={()=>ctx.clearFbContent()}>
                    log out
                  </Button>
                </Grid>
                </Grid>
          </>
            :
              <>
                <FacebookLogin
                  appId="321285325184313"
                  autoLoad={false}
                  fields="first_name,email,picture"
                  callback={this.responseFacebook}
                  render={(renderProps:any) => (
                    <Button variant="contained" color="primary" onClick={renderProps.onClick} style={{color: "white", backgroundColor: "#5c6bc0"}}>
                      <SvgIcon style={{marginRight: 5}}>
                        <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
                      </SvgIcon>
                      Log in with FB
                    </Button>
                  )}
                />
              </>
            }
          </div>
      }
      </Media>
    )
  }
}
