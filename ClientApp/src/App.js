import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import Loadable from 'react-loadable';
import HomePage from './pages/HomePage';
import TicTacToePage from './pages/TicTacToePage';
import SourceCodePage from './pages/SourceCodePage';
import WeatherForecastPage from './pages/WeatherForecastPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassPage from './pages/ForgotPassPage';

// const LoadableHomePage = Loadable({
//   loader: () => import('./pages/HomePage'),
//   loading() {
//     return <div></div>
//   }
// });
// const LoadableTicTacToePage = Loadable({
//   loader: () => import('./pages/TicTacToePage'),
//   loading() {
//     return <div></div>
//   }
// });
// const LoadableWeatherForecastPage = Loadable({
//   loader: () => import('./pages/WeatherForecastPage'),
//   loading() {
//     return <div></div>
//   }
// });
// const LoadableSourceCodePage = Loadable({
//   loader: () => import('./pages/SourceCodePage'),
//   loading() {
//     return <div></div>
//   }
// });
// const LoadableLoginPage = Loadable({
//   loader: () => import('./pages/LoginPage'),
//   loading() {
//     return <div></div>
//   }
// });

export default () => (
  <div>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/tictactoe" exact component={TicTacToePage} />
          <Route path="/source" exact component={SourceCodePage} />
          <Route path="/weather" exact component={WeatherForecastPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/forgot" exact component={ForgotPassPage} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Router>
  </div>
);
