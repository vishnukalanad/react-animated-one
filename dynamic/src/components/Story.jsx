import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";

const Story = () => {
  const storyImgRef = useRef();

  function handleMouseLeave() {
    const elem = storyImgRef.current;
    gsap.to(elem, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  }
  function handleMouseMove(e) {
    const { clientX, clientY } = e;
    const elem = storyImgRef.current;

    if (!elem) return;

    const rect = elem.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(elem, {
      duration: 0.3,
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  }
  return (
    <section className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          the universal ip world
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="The st<b>o</b>ry of<br /> a hidden real<b>m</b>"
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  src="/img/entrance.webp"
                  alt="entrance"
                  className="object-contain"
                  ref={storyImgRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseOut={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                />
              </div>
            </div>

            <RoundedCorners />
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-md-63 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm font-circular text-z_blue-50 text-center md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>
            <Button
              id={"realm-button"}
              title={"Discover prologue"}
              containerClass="mt-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
