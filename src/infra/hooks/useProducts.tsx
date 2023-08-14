import useLoading from './useLoading';
import productService from '../services/product-service';
import {useAppDispatch} from './useRTK';
import {setProducts} from '../redux/slices/productsSlice';

const useProducts = () => {
  const {toggleLoading} = useLoading();
  const dispatch = useAppDispatch();

  const getProducts = async () => {
    toggleLoading(true);
    const {data, status} = await productService.getProducts();
    if (status === 200) {
      toggleLoading(false);
      dispatch(
        setProducts({
          products: data.products,
        }),
      );
      return data;
    } else {
      toggleLoading(false);
      throw new Error('Something went wrong');
    }
  };

  return {getProducts};
};

export default useProducts;
