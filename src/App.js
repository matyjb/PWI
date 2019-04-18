import React, { Component } from 'react';
import './App.css';
import {GlobalContextProvider} from './contexts/GlobalContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { IndexRoute,  } from 'react-router';
// import HomePage from './pages/HomePage/HomePage';
import { withStyles } from '@material-ui/core';
// import Nav from './pages/Nav';
// import TicTacToePage from './pages/TicTacToePage/TicTacToePage';

import Loadable from 'react-loadable';

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

const LoadableNav = Loadable({
  loader: () => import('./pages/Nav'),
  loading() {
    return <div></div>
  }
});
const LoadableHomePage = Loadable({
  loader: () => import('./pages/HomePage/HomePage'),
  loading() {
    return <div></div>
  }
});
const LoadableTicTacToePage = Loadable({
  loader: () => import('./pages/TicTacToePage/TicTacToePage'),
  loading() {
    return <div></div>
  }
});
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
          <Route component={LoadableNav}/>
          <Switch>
            <Route exact path="/" component={LoadableHomePage}/>
            <Route path="/tictactoe" exact component={LoadableTicTacToePage} />
          </Switch>
        </Router>
      </GlobalContextProvider>
    );
  }
}

export default withStyles(styles)(App);




