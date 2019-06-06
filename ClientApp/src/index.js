import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { setDefaultTranslations, setDefaultLanguage } from 'react-multi-lang'
import pl from './translations/pl.json'
import en from './translations/en.json'

setDefaultTranslations({pl, en})
setDefaultLanguage('pl')

const initialState = window.initialReduxState;
const store = configureStore(initialState);
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
