import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {  createFirestoreInstance  } from 'redux-firestore'
import {   getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebaseConfig   from './config/firebase'


const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({ getFirebase })),
);


const rrfProps = {
  firebase: firebaseConfig,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};



ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <App />
        </ReactReduxFirebaseProvider>
    </Provider>, 
  document.getElementById('root')
);