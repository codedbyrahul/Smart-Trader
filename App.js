import React from 'react';
import AppNavigation from './src/Navigation/AppNavigation';
import {Provider} from 'react-redux';
import store from './src/Redux/Store';

const App = () => (
  <Provider store={store}>
    <AppNavigation />
  </Provider>
);

export default App;
