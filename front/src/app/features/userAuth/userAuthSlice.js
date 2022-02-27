import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  role: '',
};

export const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default userAuthSlice.reducer;
