import { gsap, Linear } from "gsap";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { isSmallScreen, NO_MOTION_PREFERENCE_QUERY } from "pages";

const COLLABORATION_STYLE = {
  SLIDING_TEXT: "opacity-20 text-5xl md:text-7xl font-bold whitespace-nowrap",
  SECTION:
    "w-full relative select-none tall:py-36 py-48 section-container flex flex-col",
  TITLE: "mt-6 md:mt-8 font-medium text-4xl md:text-5xl text-center",
};

const CollaborationSection = () => {
  const quoteRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  const [willChange, setwillChange] = useState(false);

  const initTextGradientAnimation = (
    targetSection: MutableRefObject<HTMLDivElement>
  ): ScrollTrigger => {
    const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    timeline
      .from(quoteRef.current, { opacity: 0, duration: 2 })
      .to(quoteRef.current.querySelector(".text-strong"), {
        backgroundPositionX: "100%",
        duration: 1,
      });

    return ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center bottom",
      end: "center center",
      scrub: 0,
      animation: timeline,
      onToggle: (self) => setwillChange(self.isActive),
    });
  };

  const initSlidingTextAnimation = (
    targetSection: MutableRefObject<HTMLDivElement>
  ) => {
    const slidingTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });

    slidingTl
      .to(targetSection.current.querySelector(".ui-left"), {
        xPercent: isSmallScreen() ? -500 : -150,
      })
      .from(
        targetSection.current.querySelector(".ui-right"),
        { xPercent: isSmallScreen() ? -500 : -150 },
        "<"
      );

    return ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0,
      animation: slidingTl,
    });
  };

  useEffect(() => {
    const textBgAnimation = initTextGradientAnimation(targetSection);
    let slidingAnimation: ScrollTrigger | undefined;

    const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY);

    if (matches) {
      slidingAnimation = initSlidingTextAnimation(targetSection);
    }

    return () => {
      textBgAnimation.kill();
      slidingAnimation?.kill();
    };
  }, [quoteRef, targetSection]);

  const renderSlidingText = (text: string, layoutClasses: string) => (
    <p className={`${layoutClasses} ${COLLABORATION_STYLE.SLIDING_TEXT}`}>
      {Array(5)
        .fill(text)
        .reduce((str, el) => str.concat(el), "")}
    </p>
  );

  const renderTitle = () => (
    <h1
      ref={quoteRef}
      className={`${COLLABORATION_STYLE.TITLE} ${
        willChange ? "will-change-opacity" : ""
      }`}
    >
      Interested in <span className="text-strong font-bold">Collaboration</span>
      ?
    </h1>
  );

  return (
    <section className={COLLABORATION_STYLE.SECTION} ref={targetSection}>
      {renderSlidingText(
        " User Interface Design  User Experience Design ",
        "ui-left"
      )}

      {renderTitle()}

      {renderSlidingText(
        " Frontend Development  Motion Graphics ",
        "mt-6 md:mt-8 ui-right"
      )}
    </section>
  );
};

export default CollaborationSection;
