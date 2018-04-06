import React from 'react';
import { hydrate } from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducers/rootReducer';

import { RenderRoutes } from './components/Root';

const preloadedState = window.__PRELOADED_STATE__;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(ReduxThunk)));

delete window.__PRELOADED_STATE__;

const app = document.getElementById('app');

if (app) {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <RenderRoutes />
      </BrowserRouter>
    </Provider>,
    app,
  );
}
