import React, { Component } from 'react';
import {GlobalContextProvider} from './contexts/GlobalContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './pages/Nav';
import Loadable from 'react-loadable';


// const LoadableNav = Loadable({
//   loader: () => import('./pages/Nav'),
//   loading() {
//     return <div></div>
//   }
// });
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
  render() {
    return (
      <GlobalContextProvider>
        <Router>
          <Route component={Nav}/>
          <Switch>
            <Route exact path="/" component={LoadableHomePage}/>
            <Route path="/tictactoe" exact component={LoadableTicTacToePage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </GlobalContextProvider>
    );
  }
}

export default App;




