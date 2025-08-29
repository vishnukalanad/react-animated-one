import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { heroActions } from "../store/uiSlice";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const totalVideos = 4;
  const nextVidoRef = useRef(null);

  const heroAction = heroActions;
  const dispatch = useDispatch();

  function handleMiniVidClick() {
    dispatch(heroAction.setHasClicked(true));
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

  useGSAP(
    () => {
      if (state.hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 0.5,
          ease: "power1.inOut",
          onStart: () => nextVidoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [state.currentIndex], revertOnUpdate: true }
  );

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div className="relative h-dvh w-screen z-10 overflow-x-hidden rounded-lg">
        <div>
          <div className="mask-clip-path absolute absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-xl">
            <div
              onClick={handleMiniVidClick}
              className="origin-center opacity-0 scale-50 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVidoRef}
                src={getVideoSrc((state.currentIndex % totalVideos) + 1)}
                autoPlay
                loop
                muted
                id="current-video"
                className="origin-center size-64 scale-150 object-cover object-center"
                onLoadedData={handleVideoOnLoad}
              />
            </div>
          </div>
          <video
            ref={nextVidoRef}
            src={getVideoSrc(state.currentIndex)}
            autoPlay
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-center object-cover"
          />

          <video
            src={getVideoSrc(
              state.currentIndex === totalVideos - 1 ? 1 : state.currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 size-full object-center object-cover"
            onLoadedData={handleVideoOnLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 text-white right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the metagame layer <br />
              Unleash the play economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 text-black right-5 text-blue-75">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
