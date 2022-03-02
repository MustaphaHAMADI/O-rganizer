import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './AuthService';
import { toast } from 'react-toastify';
const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const login = createAsyncThunk(
  '/login',
  async ({ regNumber, password }) => {
    try {
      const data = await authService.login({ regNumber, password });
      toast.success('Connecté');
      return { user: data };
    } catch (error) {
      toast.error('Couple identifiant, mot de passe invalides');
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk('/logout', async () => {
  await authService.logout();
  toast.success('Déconnecté');
});

export const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export default userAuthSlice.reducer;
