import useLoading from './useLoading';
import authService from '../services/auth-service';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useAppDispatch} from './useRTK';
import useCart from './useCart';
import {setUser} from '../redux/slices/userSlice';

const useAuth = () => {
  const {toggleLoading} = useLoading();
  const {getCart} = useCart();
  const dispatch = useAppDispatch();

  const loginUser = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    toggleLoading(true);
    try {
      const res = await authService.login(username, password);
      if (res.status === 200) {
        const {token, ...rest} = res.data;
        setAuth(rest, token);
        getCart();
      }
      toggleLoading(false);
    } catch (error: any) {
      toggleLoading(false);
      Alert.alert(`${error.response.data.message}`);
    }
  };

  const setAuth = async (user: {}, token: any) => {
    await AsyncStorage.setItem('@BlUser', JSON.stringify(user));
    await AsyncStorage.setItem('@AuthToken', token);
    dispatch(
      setUser({
        user: JSON.parse(JSON.stringify(user)),
        token,
      }),
    );
  };

  const logoutUser = async () => {
    toggleLoading(true);
    try {
      dispatch(setUser({user: {}, token: ''}));
      await AsyncStorage.removeItem('@BlUser');
      await AsyncStorage.removeItem('@AuthToken');
      toggleLoading(false);
    } catch (error: any) {
      toggleLoading(false);
      Alert.alert(`${error.response.data.message}`);
    }
  };

  return {loginUser, logoutUser, setAuth};
};

export default useAuth;
