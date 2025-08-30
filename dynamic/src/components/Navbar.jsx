import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef(null);
  const dispatch = useDispatch();
  const navSlice = uiActions;
  const state = useSelector((state) => {
    return state.ui.nav;
  });

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

  const audioElementRef = useRef(null);

  function audioIndicator() {
    dispatch(navSlice.setAudioPlaying());
  }
  useEffect(() => {
    if (state.isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [state]);

  useEffect(() => {
    gsap.to(navRef.current, {
      y: isNavVisible ? 0 : "-100",
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navRef.current.classList.remove("floating-nav");
    }
    if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  return (
    <div
      ref={navRef}
      className="fixed top-4 z-50 h-16 border-none rounded-2xl transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                  key={item}
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={audioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              >
                {[1, 2, 3, 4].map((bar) => {
                  return (
                    <div
                      key={bar + "bar"}
                      className={`indicator-line ${
                        state.isIndicatorActive ? "active" : ""
                      }`}
                      style={{ animationDelay: `${bar * 0.1}s` }}
                    ></div>
                  );
                })}
              </audio>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
