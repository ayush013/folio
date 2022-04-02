import { gsap, Linear } from "gsap";
import { MutableRefObject, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const AboutSection = ({ clientHeight }) => {
  const quoteRef: MutableRefObject<HTMLDivElement> = useRef(null);
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: Linear.easeNone, duration: 0.1 },
    });
    timeline
      .fromTo(
        quoteRef.current.querySelector(".about-1"),
        { opacity: 0.2 },
        { opacity: 1 }
      )
      .to(quoteRef.current.querySelector(".about-1"), {
        opacity: 0.2,
        delay: 0.5,
      })
      .fromTo(
        quoteRef.current.querySelector(".about-2"),
        { opacity: 0.2 },
        { opacity: 1 },
        "<"
      )
      .to(quoteRef.current.querySelector(".about-2"), {
        opacity: 0.2,
        delay: 1,
      });

    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center 80%",
      end: "center top",
      scrub: 0,
      animation: timeline,
    });
  }, [quoteRef, targetSection]);

  return (
    <section className="w-full relative select-none" ref={targetSection}>
      <div
        className={`
          ${
            clientHeight > 650 ? "pt-20 pb-16" : "pt-40 pb-24"
          } section-container
        `}
      >
        <h1
          ref={quoteRef}
          className="font-medium text-3xl sm:text-4xl md:text-6xl"
        >
          <span className="about-1 leading-tight">
            I am a passionate UI Engineer who bridges the gap between
            development and design.{" "}
          </span>
          <span className="about-2 leading-tight">
            I take responsibility to craft a good user experience using modern
            frontend architecture.{" "}
          </span>
        </h1>
      </div>
    </section>
  );
};

export default AboutSection;
