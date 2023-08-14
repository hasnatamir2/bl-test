import React from 'react';
import {Alert} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ProductSlide from '../product-slide';
import useCart from '../../../infra/hooks/useCart';
import {useAppSelector} from '../../../infra/hooks/useRTK';
import AsyncStorage from '@react-native-community/async-storage';

interface ProductCarouselProps {
  data: any[];
}

const ProductCarousel = (props: ProductCarouselProps) => {
  const {updateCart} = useCart();
  const {cart} = useAppSelector(state => state.cart);

  const handleAddToCart = async (product: any) => {
    const user = await AsyncStorage.getItem('@BlUser');
    if (!user) {
      Alert.alert('You need to login first');
      return;
    }

    const {products} = cart;
    let updated = products.find((p: any) => p.id === product.id);
    if (updated) {
      updated.quantity + 1;
      const index = products.findIndex((p: any) => p.id === product.id);
      products[index] = updated;
      updateCart(cart);
      return;
    } else {
      let newCart = {
        ...cart,
        products: [...products, product],
      };
      updateCart(newCart);
    }
  };

  return (
    <Carousel
      data={props?.data || []}
      renderItem={item => ProductSlide({...item, addToCart: handleAddToCart})}
      itemWidth={342}
      sliderWidth={342}
    />
  );
};

export default ProductCarousel;
