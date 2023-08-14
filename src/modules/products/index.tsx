import React, {useEffect} from 'react';
import useProducts from '../../infra/hooks/useProducts';
import {useAppSelector} from '../../infra/hooks/useRTK';
import ProductCarousel from './products-carousel';

const Products = () => {
  const {getProducts} = useProducts();
  const {products} = useAppSelector(state => state.products);

  useEffect(() => {
    getProducts();
  }, []);
  return <ProductCarousel data={products} />;
};

export default Products;
