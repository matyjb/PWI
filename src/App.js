import React, { Component } from 'react';
import './App.css';
import {GlobalContextProvider} from './contexts/GlobalContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { IndexRoute,  } from 'react-router';
import HomePage from './pages/HomePage/HomePage';
import { withStyles } from '@material-ui/core';
import Nav from './pages/Nav';
import TicTacToePage from './pages/TicTacToePage/TicTacToePage';

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


class App extends Component{
  state = {
      isDrawerOpen: false, 
  }

  toggleDrawer(open) {
    this.setState({isDrawerOpen: open});
  }

  render() {
    return (
      <GlobalContextProvider>
        <Router>
          <Route component={Nav}/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/tictactoe" exact component={TicTacToePage} />
          </Switch>
        </Router>
      </GlobalContextProvider>
    );
  }
}

export default withStyles(styles)(App);
