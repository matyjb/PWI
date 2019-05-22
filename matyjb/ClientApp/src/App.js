import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Layout from './components/Layout';
import Loadable from 'react-loadable';

const LoadableHomePage = Loadable({
  loader: () => import('./pages/HomePage'),
  loading() {
    return <div></div>
  }
});
const LoadableTicTacToePage = Loadable({
  loader: () => import('./pages/TicTacToePage'),
  loading() {
    return <div></div>
  }
});
const LoadableWeatherForecastPage = Loadable({
  loader: () => import('./pages/WeatherForecastPage'),
  loading() {
    return <div></div>
  }
});
const LoadableSourceCodePage = Loadable({
  loader: () => import('./pages/SourceCodePage'),
  loading() {
    return <div></div>
  }
});

export default () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={LoadableHomePage}/>
      <Route path="/tictactoe" exact component={LoadableTicTacToePage} />
      <Route path="/source" exact component={LoadableSourceCodePage} />
      <Route path="/weather" exact component={LoadableWeatherForecastPage} />
      <Redirect to="/" />
    </Switch>
  </Layout>
);
