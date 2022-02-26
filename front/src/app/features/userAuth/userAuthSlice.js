import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  role: '',
};

export const userAuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userAuthSlice.reducer;
