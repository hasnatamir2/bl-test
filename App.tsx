import React, {useEffect} from 'react';
import Navigator from './src/navigations';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/infra/redux/store';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import theme from './src/shared/theme';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

function App() {
  useEffect(() => {
    GoogleSignin.configure({});
  }, []);
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <Navigator />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}

export default App;
