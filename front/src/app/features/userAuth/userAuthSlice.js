import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './AuthService';
import { toast } from 'react-toastify';

// assign localStorage value to the user variable
const user = JSON.parse(localStorage.getItem('user'));
// initialise the state to equal user data from localStorage
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

// Functions that takes credentials as params and uses authService to call the API
export const login = createAsyncThunk(
  '/login',
  async ({ regNumber, password }, thunkAPI) => {
    try {
      const data = await authService.login({ regNumber, password });
      toast.success(`Connecté`);
      return { user: data };
    } catch (error) {
      toast.error('Couple identifiant, mot de passe invalides');
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Calls function that removes user data
export const logout = createAsyncThunk('/logout', async () => {
  await authService.logout();
  toast.success('Déconnecté');
});

// Info that will be given to the store
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
