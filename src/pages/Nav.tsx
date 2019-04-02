import React, { Component } from 'react';
import { AppBar, Toolbar, Avatar, withStyles, SwipeableDrawer, IconButton, List, Divider, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import avatar from "./../assets/avatar.jpg";
import Media from 'react-media';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraftsIcon from '@material-ui/icons/Drafts';
import TopMenuItem from '../components/TopMenuItem';

const styles = {
  avatar: {
    margin: "2px 10px",
    border: "3px solid",
    borderColor: "#5c6bc0",
    top: 5,
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

let menuItems = [
  {
    title: "JS",
    subItems: [
      {
        title: "TicTacToe",
        link: "/tictactoe"
      }
    ] 
  },
  {
    title: "Lab2",
    subItems: [
      {
        title: "Link 1",
        link: "#"
      }
    ] 
  },
  {
    title: "Lab3",
    subItems: [
      {
        title: "Link 1",
        link: "#"
      },
      {
        title: "Link 2",
        link: "#"
      }
    ] 
  },
]
interface IProps {
  classes?: any,
  history: any
}
interface IState {
  isDrawerOpen: boolean, 
}
class Nav extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    }
  }

  toggleDrawer(open: boolean) {
    this.setState({isDrawerOpen: open});
  }

  render() {
    const { classes } = this.props;
    return (
      <Media query="(max-width: 600px)">
      {matches => matches ? ( //MOBILE
      <>
      <AppBar position="static" style={{marginBottom: 15}}>
        <Toolbar variant="dense" style={{top: 8}}>
        <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={()=>this.toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="matyjb-avatar"src={avatar} className={classes.avatar} onClick={()=>this.props.history.push("/")}/>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer className={classes.drawer} classes={{paper: classes.drawerPaper}} open={this.state.isDrawerOpen} onClose={()=>this.toggleDrawer(false)} onOpen={()=>this.toggleDrawer(true)}>
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
          {menuItems.map((menuItem, index) => (
            <List
              component="nav"
              subheader={<ListSubheader component="div">{menuItem.title}</ListSubheader>}
              className={classes.root}
              key={index}
            >
              {menuItem.subItems.map((subItem, index2) => (
                <ListItem button key={index2} onClick={()=>this.props.history.push("/tictactoe")}>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={subItem.title} />
                </ListItem>
              ))}
            </List>
          ))}
        </div>
      </SwipeableDrawer>
      </>
      ) : (//DESKTOP
      <AppBar position="static" style={{marginBottom: 15}}>
        <Toolbar variant="dense" style={{top: 8}}>
          <Avatar alt="matyjb-avatar"src={avatar} className={classes.avatar} onClick={()=>this.props.history.push("/")}/>
          {menuItems.map((menuItem, index) => (
            <TopMenuItem data={menuItem} key={index}/>
          ))}
        </Toolbar>
      </AppBar>
      )}
      </Media>
    )}
}

export default withStyles(styles)(Nav);
