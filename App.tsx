import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { reducers } from './Redux/Reducers';
import { Header } from './components/Header/Header';

const store = createStore(reducers, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <Header />
    </Provider>
  );
}
