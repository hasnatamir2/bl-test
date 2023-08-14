import {configureStore} from '@reduxjs/toolkit';

import loadingReducer from './slices/loadingSlice';
import userReducer from './slices/userSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
  },

  devTools: process.env.NODE_ENV === 'development',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
