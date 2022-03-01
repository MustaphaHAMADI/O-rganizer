import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default userAuthSlice.reducer;
