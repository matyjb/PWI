import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as Counter from './Counter';
import * as WeatherForecasts from './WeatherForecasts';
import * as FacebookLogin from './FacebookLogin';
import thunk from 'redux-thunk';

export default function configureStore (initialState) {
  const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    facebookLogin: FacebookLogin.reducer,
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
