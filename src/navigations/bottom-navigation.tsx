/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import {BottomNavigation} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import useAuth from '../infra/hooks/useAuth';
import {useAppSelector} from '../infra/hooks/useRTK';

import HomeScreen from '../screens/home';

function BottomTabs() {
  const {setAuth} = useAuth();
  const [index, setIndex] = React.useState(0);
  const {cart} = useAppSelector(state => state.cart);

  const [routes, setRoutes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {key: 'tickets', title: 'Tickets', focusedIcon: 'ticket'},
    {
      key: 'cart',
      title: 'Cart',
      focusedIcon: 'cart',
      badge: cart.totalProducts,
    },
    {
      key: 'liked',
      title: 'Liked',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('@AuthToken');
      const user = await AsyncStorage.getItem('@BlUser');
      if (token && user) {
        setAuth(JSON.parse(user), token);
      }
    };

    checkAuth();
  }, [setAuth]);

  useMemo(() => {
    const newRoutes = [...routes];
    newRoutes[2].badge = cart.totalProducts;
    setRoutes(newRoutes);
  }, [cart.totalProducts]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    tickets: HomeScreen,
    cart: HomeScreen,
    liked: HomeScreen,
    profile: HomeScreen,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

export default BottomTabs;
