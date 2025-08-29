import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    hero: heroSlice.reducer,
  },
});

export default store;
