import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './features/userAuth/userAuthSlice';

// creation of the redux store
export const store = configureStore({
  reducer: {
    auth: userAuthReducer,
  },
});
