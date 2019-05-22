import React from 'react';
import { AppBar, Toolbar, Avatar, withStyles, SwipeableDrawer, IconButton, List, Divider, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import Media from 'react-media';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraftsIcon from '@material-ui/icons/Drafts';
import NavMenuItem from './NavMenuItem';
import FBLoginButton from './FBLoginButton';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { CloudDownloadRounded, VideogameAssetRounded, CloudRounded } from '@material-ui/icons';
var avatar = require("./../assets/avatar.jpg");
const styles = {
  avatar: {
    margin: "2px 10px",
    border: "3px solid",
    borderColor: "#5c6bc0",
    top: 10,
    "&:hover": {
      borderColor: "#7986cb",
      cursor: "pointer"
    }
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    justifyContent: 'flex-end',
  },
}
const menuItems = [
  {
    title: "Kółko i krzyżyk",
    link: "/tictactoe",
    icon: <VideogameAssetRounded />,
  },
  {
    title: "Source code",
    link: "/source",
    icon: <CloudDownloadRounded />
  },
  {
    title: "Weather",
    link: "/weather",
    icon: <CloudRounded />
  },
]

class NavMenu extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
    };
  }
  toggleDrawer(open) {
    this.setState({isDrawerOpen: open});
  }
  render () {
    const { classes } = this.props;
    return (
      <Media query="(max-width: 600px)">
      {matches => matches ? ( //MOBILE
      <div>
      <AppBar position="static" style={{marginBottom: 15}}>
        <Toolbar variant="dense" style={{top: 3}}>
        {/* <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={()=>this.toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton> */}
          <Avatar alt="matyjb-avatar" src={avatar} className={classes.avatar} onClick={()=>this.props.history.push("/")}/>
          {menuItems.map((menuItem, index) => (
            <IconButton key={index} className={classes.button} style={{color: "white"}} aria-label={menuItem.title} onClick={()=>this.props.history.push(menuItem.link)}>
              {menuItem.icon}
            </IconButton>
          ))}
          <div style={{marginLeft: "auto", marginTop: -10}}>
            <FBLoginButton/>
          </div>
        </Toolbar>
      </AppBar>
      {/* <SwipeableDrawer className={classes.drawer} classes={{paper: classes.drawerPaper}} open={this.state.isDrawerOpen} onClose={()=>this.toggleDrawer(false)} onOpen={()=>this.toggleDrawer(true)}>
        <div
          onClick={()=>this.toggleDrawer(false)}
          onKeyDown={()=>this.toggleDrawer(false)}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={()=>this.toggleDrawer(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List
            component="nav"
            subheader={<ListSubheader component="div">"Menu"</ListSubheader>}
            //className={classes.root}
          >
          {menuItems.map((menuItem, index) => (
                <ListItem button key={index} onClick={()=>this.props.history.push("/tictactoe")}>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={menuItem.title} />
                </ListItem>
              ))}
          </List>
        </div>
      </SwipeableDrawer> */}
      {/* TODO: fix this swipeableDrawer */}
      </div>
      ) : (//DESKTOP
      <AppBar position="static" style={{marginBottom: 15}}>
        <Toolbar variant="dense" style={{top: 3}}>
          <Avatar alt="matyjb-avatar"src={avatar} className={classes.avatar} onClick={()=>this.props.history.push("/")}/>
          {menuItems.map((menuItem, index) => (
            <NavMenuItem link={menuItem.link} key={index}>
              <div style={{marginRight: 6}}>
                {menuItem.icon}
              </div>
              {menuItem.title}
            </NavMenuItem>
          ))}
          <div style={{marginLeft: "auto", marginTop: -10}}>
            <FBLoginButton/>
          </div>
        </Toolbar>
      </AppBar>
      )}
      </Media>
    )}
}

export default  withRouter(connect()(withStyles(styles)(NavMenu)));