import { gsap, Linear } from "gsap";
import { MutableRefObject, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Quote = ({ clientHeight }) => {
  const quoteRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    timeline
      .from(quoteRef.current, { opacity: 0, duration: 2 })
      .to(quoteRef.current.querySelector(".text-strong"), {
        backgroundPositionX: "100%",
        duration: 1,
      });

    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center bottom",
      end: "center center",
      scrub: 0,
      animation: timeline,
    });
  }, [quoteRef, targetSection]);

  return (
    <section className="w-full relative select-none" ref={targetSection}>
      <div
        className={`${
          clientHeight > 650 ? "py-60" : "py-72"
        } section-container`}
      >
        <h1
          ref={quoteRef}
          className="font-medium text-4xl md:text-5xl text-center"
        >
          I have a <span className="text-strong font-bold">strong</span>{" "}
          obsession for attention to detail.
        </h1>
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

export default Quote;
