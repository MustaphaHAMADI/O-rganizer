import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './features/userAuth/userAuthSlice';
import planningReducer from './features/planningHandling/PlanningSlice';

// creation of the redux store
export const store = configureStore({
  reducer: {
    auth: userAuthReducer,
    planning: planningReducer,
  },
});
