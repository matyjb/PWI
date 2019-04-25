import React, { Component } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {Button, SvgIcon, Avatar, Grid, Typography, Popper, Grow, Paper, ClickAwayListener} from '@material-ui/core';
import Media from 'react-media';
import {ArrowDropDownRounded, ArrowDropUpRounded} from '@material-ui/icons';
 
interface IState {
  open: boolean,
}
export default class FBLogin extends Component<{},IState> {
  static contextType = GlobalContext;
  private anchorEl: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
    }
    this.anchorEl = React.createRef();
  }

  setOpen(open: boolean) {
    this.setState({open: open});
  }

  toggleOpen() {
    this.setState({open: !this.state.open});
  }

  responseFacebook = (response:any) => {
    let ctx = this.context;
    if(!response.userID) return;
    
    var fbContent = {
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
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
                <Grid item>
                    <Button
                      buttonRef={this.anchorEl}
                      aria-owns={this.state.open ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                      onClick={()=>this.toggleOpen()}
                      style={{color: "white"}}
                      >
                      {!matches && ctx.fbContent.first_name}
                      {this.state.open ? <ArrowDropUpRounded/> : <ArrowDropDownRounded/>}
                    </Button>
                    <Popper open={this.state.open} anchorEl={this.anchorEl.current} transition>
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                        >
                          <Paper style={{padding: 8}}>
                            <ClickAwayListener onClickAway={()=>this.setOpen(false)}>
                              <Grid 
                                container 
                                spacing={16}
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                              >
                                <Grid item>
                                  <Typography variant="body2" gutterBottom style={{fontWeight: 400}}>
                                    full name:
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography variant="body2" gutterBottom>
                                    {ctx.fbContent.name}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid 
                                container 
                                spacing={16}
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                              >
                                <Grid item>
                                  <Typography variant="body2" gutterBottom style={{fontWeight: 400}}>
                                    email: 
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography variant="body2" gutterBottom>
                                    {ctx.fbContent.email}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                </Grid>
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
                  fields="first_name,name,email,picture"
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
