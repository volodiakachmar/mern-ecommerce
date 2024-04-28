/**
 *
 * store.js
 * store configuration
 */

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history'; // функция из библиотеки history для создания объекта истории браузера.

import createReducer from './reducers';

export const history = createBrowserHistory({
  basename: '/',
  hashType: 'noslash'
});

const middlewares = [thunk, routerMiddleware(history)];

const enhancers = [applyMiddleware(...middlewares)];

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
// Эта часть кода проверяет, установлено ли расширение Redux DevTools в браузере, и использует его, если 
// оно установлено. В противном случае используется обычный compose.
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  createReducer(history),
  composeEnhancers(...enhancers)
);

// Поддержка горячей перезагрузки (Hot Module Replacement):
// Этот блок кода позволяет перезагружать корневой редюсер Redux при изменениях, чтобы поддерживать 
// горячую перезагрузку модулей с помощью Webpack Hot Module Replacement.
if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
    store.replaceReducer(nextRootReducer(history));
  });
}

export default store;
