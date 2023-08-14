import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Product} from '../../types';

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductsState>) => {
      const {products} = action.payload;
      state.products = products;
    },
  },
});

export const {setProducts} = productsSlice.actions;

export default productsSlice.reducer;
