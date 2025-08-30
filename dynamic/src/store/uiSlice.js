import { createSlice } from "@reduxjs/toolkit";

const intialUiState = {
  hero: {
    isLoading: true,
    currentIndex: 1,
    hasClicked: false,
    loadedVideos: 1,
  },
  nav: {
    isAudioPlaying: false,
    isIndicatorActive: false,
  },
};

const uiSlice = createSlice({
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
    setAudioPlaying: (state, action) => {
      state.nav.isAudioPlaying = action;
    },
  },
});


export const uiActions = uiSlice.actions;

export default uiSlice;
