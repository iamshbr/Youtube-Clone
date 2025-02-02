import { configureStore } from "@reduxjs/toolkit";
import youtubeSlice from "../features/Youtube/youtubeSlice";

const store = configureStore({
  reducer: {
    youtubeCloneApp: youtubeSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>; // Type for state when you use useSelector
export type AppDispatch = typeof store.dispatch; // Type for dispatch, safe when you want to dispatch anything
