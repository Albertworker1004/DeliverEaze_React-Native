import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/redux/reducers';

import CoreNavigation from './src/navigation/CoreNavigation';

const store = createStore(reducers);

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <CoreNavigation />
    </Provider>

  );
};

export default App;