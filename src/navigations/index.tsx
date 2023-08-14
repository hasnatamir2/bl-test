import React from 'react';
import {ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './bottom-navigation';

const linking = {
  prefixes: ['testapp://'],
};

export default function Navigator() {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator size="large" />}>
      <BottomNavigation />
    </NavigationContainer>
  );
}
