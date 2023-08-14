import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Cart} from '../../types';

interface CartState {
  cart: Cart;
}

const initialState: CartState = {
  cart: {
    id: 0,
    products: [],
    total: 0,
    userId: 0,
    totalProducts: 0,
    totalQuantity: 0,
  },
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      const {cart} = action.payload;
      state.cart = cart;
    },
  },
});

export const {setCart} = cartSlice.actions;

export default cartSlice.reducer;
