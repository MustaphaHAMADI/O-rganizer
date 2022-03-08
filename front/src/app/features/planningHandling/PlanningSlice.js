import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PlanningService from './PlanningService';
import { startOfToday } from 'date-fns';
import { toast } from 'react-toastify';

const date = startOfToday().getTime();

const initialState = {
  planning: [],
  range: 30,
  teams: [],
  status: [],
};

// Functions that takes credentials as params and uses authService to call the API
export const loadPlanning = createAsyncThunk('/planning', async (thunkAPI) => {
  try {
    const res = await PlanningService.getPlanning();
    const data = await res.data;

    return { planning: data };

    // data.forEach((e, idx) => {
    //   if (new Date(e.date).getTime() === date) {
    //     return { planning: data.slice(idx, idx + initialState.range) };
    //   }
    // });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Info that will be given to the store
export const PlanningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPlanning.fulfilled, (state, action) => {
      state.planning = action.payload.planning
    });
  },
});

export default PlanningSlice.reducer;
