import { createSlice } from "@reduxjs/toolkit";

const intialUiState = {
  hero: {
    isLoading: false,
    currentIndex: 1,
    hasClicked: false,
    loadedVideos: 0,
  },
};

const heroSlice = createSlice({
  name: "hero",
  initialState: intialUiState,
  reducers: {
    setIsLoading: (state) => {
      state.hero.isLoading = !state.hero.isLoading;
    },
    setHasClicked: (state, action) => {
      state.hero.hasClicked = action.payload;
    },
    setLoadedVideos: (state) => {
      state.hero.loadedVideos = state.hero.loadedVideos + 1;
    },
    setCurrentIndex: (state, action) => {
      console.log(
        state.hero.currentIndex,
        action.payload,
        state.hero.loadedVideos
      );
      state.hero.currentIndex = (state.hero.currentIndex % action.payload) + 1;
    },
  },
});

export const heroActions = heroSlice.actions;

export default heroSlice;
