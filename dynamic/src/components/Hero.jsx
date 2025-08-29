import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { heroActions } from "../store/uiSlice";

const Hero = () => {
  const totalVideos = 4;
  const nextVidoRef = useRef(null);

  const heroAction = heroActions;
  const dispatch = useDispatch();

  function handleMiniVidClick() {
    dispatch(heroAction.setCurrentIndex(totalVideos));
  }

  const state = useSelector((state) => {
    // console.log(state);
    return state.hero.hero;
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  function handleVideoOnLoad() {
    dispatch(heroAction.setLoadedVideos());
  }

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div className="relative h-dvh w-screen z-10 overflow-x-hidden rounded-lg">
        <div>
          <div className="mask-clip-path absolute absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVidClick}
              className="origin-center opacity-0 scale-50 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVidoRef}
                src={getVideoSrc(state.currentIndex + 1)}
                autoPlay
                loop
                muted
                id="current-video"
                className="origin-center size-64 scale-150 object-cover object-center"
                onLoadedData={handleVideoOnLoad}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
