import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice'; // userReducer is the value exported from userSlice.reducer
import cartReducer from './features/cart/CartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
