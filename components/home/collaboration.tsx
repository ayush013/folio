import { gsap, Linear } from "gsap";
import { MutableRefObject, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Collaboration = ({ clientHeight }) => {
  const quoteRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const smallScreen = document.body.clientWidth < 767;

    const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    timeline
      .from(quoteRef.current, { opacity: 0, duration: 2 })
      .to(quoteRef.current.querySelector(".text-strong"), {
        backgroundPositionX: "100%",
        duration: 1,
      });

    const slidingTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });

    slidingTl
      .to(targetSection.current.querySelector(".ui-left"), {
        xPercent: smallScreen ? -500 : -150,
      })
      .from(
        targetSection.current.querySelector(".ui-right"),
        { xPercent: smallScreen ? -500 : -150 },
        "<"
      );

    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center bottom",
      end: "center center",
      scrub: 0,
      animation: timeline,
    });

    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0,
      animation: slidingTl,
    });
  }, [quoteRef, targetSection]);

  return (
    <section className="w-full relative select-none" ref={targetSection}>
      <div
        className={`
          ${clientHeight > 650 ? "py-36" : "py-48"}
          section-container flex flex-col
        `}
      >
        <p className="opacity-20 text-5xl md:text-7xl font-bold whitespace-nowrap ui-left transform-gpu">
          {Array(5)
            .fill(" User Interface Design  User Experience Design ")
            .reduce((str, el) => str.concat(el), "")}{" "}
        </p>

        <h1
          ref={quoteRef}
          className="mt-6 md:mt-8 font-medium text-4xl md:text-5xl text-center"
        >
          Interested in{" "}
          <span className="text-strong font-bold">Collaboration</span>?
        </h1>

        <p className="mt-6 md:mt-8 opacity-20 text-5xl md:text-7xl font-bold whitespace-nowrap ui-right transform-gpu">
          {Array(5)
            .fill(" Frontend Development  Motion Graphics ")
            .reduce((str, el) => str.concat(el), "")}{" "}
        </p>
      </div>
      <style jsx global>{`
        .text-strong {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #ffffff 50%,
            #6dd5ed 51%,
            #2193b0 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
};

export default Collaboration;
