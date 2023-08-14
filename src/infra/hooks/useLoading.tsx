import {useAppDispatch, useAppSelector} from './useRTK';
import {setloading} from '../redux/slices/loadingSlice';

const useLoading = () => {
  const loading = useAppSelector((state: any) => state.loading.value);
  const dispatch = useAppDispatch();

  const toggleLoading = async (toggle: boolean) => {
    dispatch(setloading(toggle));
  };

  return {loading, toggleLoading};
};

export default useLoading;
