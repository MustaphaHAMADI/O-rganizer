import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  role: '',
};

export const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default userAuthSlice.reducer;
