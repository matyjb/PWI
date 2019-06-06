import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as Counter from './Counter';
import * as WeatherForecasts from './WeatherForecasts';
import * as FacebookLogin from './FacebookLogin';
import * as Login from './Login';
import thunk from 'redux-thunk';

export default function configureStore (initialState) {
  const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    facebookLogin: FacebookLogin.reducer,
    login: Login.reducer,
  };

  const rootReducer = combineReducers({
    ...reducers,
  });

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
