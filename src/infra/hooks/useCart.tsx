import useLoading from './useLoading';
import cartService from '../services/cart-service';
import {useAppDispatch} from './useRTK';
import {setCart} from '../redux/slices/cartSlice';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

const useCart = () => {
  const {toggleLoading} = useLoading();
  const dispatch = useAppDispatch();

  const getCart = async () => {
    toggleLoading(true);
    const user = await AsyncStorage.getItem('@BlUser');
    if (user) {
      const usr = JSON.parse(user);
      const {data, status} = await cartService.getCart(usr.id);
      if (status === 200) {
        toggleLoading(false);
        dispatch(
          setCart({
            cart: data.carts[0],
          }),
        );
      } else {
        toggleLoading(false);
        Alert.alert('Something went wrong');
      }
    }
  };

  const updateCart = async (cart: any) => {
    toggleLoading(true);
    const formatedProducts = cart.products.map((product: any) => {
      return {
        id: product.id,
        quantity: product.quantity,
      };
    });
    const {data} = await cartService.updateCart({
      cartId: cart.id,
      products: formatedProducts,
    });
    toggleLoading(false);
    if (data) {
      dispatch(
        setCart({
          cart: data,
        }),
      );
    } else {
      toggleLoading(false);
      Alert.alert('Something went wrong');
    }
  };

  return {getCart, updateCart};
};

export default useCart;
