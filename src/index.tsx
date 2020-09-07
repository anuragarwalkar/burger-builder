import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import burgerBuilder from "./store/reducers/burgerBuilder";
import order from "./store/reducers/order";
import thunk from "redux-thunk";
import App from "./App";
import auth from "./store/reducers/auth";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const logger = () => {
  return (next: any) => {
    return (action: any) => {
      // console.log("action:", action);
      return next(action);
    };
  };
};

const middlwares = [logger, thunk];
const reducers = { burgerBuilder, order, auth };

const reduxDevTools: any = (process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const composeEnhancers = reduxDevTools;

const rootReducer = combineReducers({ ...reducers });

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlwares))
);

const wrappedApp = (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

const rootElement = document.getElementById("root");

ReactDOM.render(wrappedApp, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
