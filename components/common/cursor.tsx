import styles from "./Cursor.module.scss";
import { MutableRefObject, useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";

const Cursor = ({ isDesktop }) => {
  const cursor: MutableRefObject<HTMLDivElement> = useRef(null);
  const follower: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (isDesktop && document.body.clientWidth > 767) {
      follower.current.classList.remove("hidden");
      cursor.current.classList.remove("hidden");

      const moveCircle = (e) => {
        gsap.to(cursor.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: Linear.easeNone,
        });
        gsap.to(follower.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: Linear.easeNone,
        });
      };

      const hoverFunc = (e) => {
        gsap.to(cursor.current, {
          scale: 0.5,
          duration: 0.3,
        });
        gsap.to(follower.current, {
          scale: 3,
          duration: 0.3,
        });
      };

      const unhoverFunc = (e) => {
        gsap.to(cursor.current, {
          scale: 1,
          duration: 0.3,
        });
        gsap.to(follower.current, {
          scale: 1,
          duration: 0.3,
        });
      };

      document.addEventListener("mousemove", moveCircle);

      document.querySelectorAll(".link").forEach((el) => {
        el.addEventListener("mouseenter", hoverFunc);
        el.addEventListener("mouseleave", unhoverFunc);
      });
    }
  }, [cursor, follower, isDesktop]);

  return (
    <>
      <div
        ref={cursor}
        className={`
          ${styles.cursor}
           fixed hidden bg-white w-4 h-4 select-none pointer-events-none z-50
        `}
      ></div>
      <div
        ref={follower}
        className={`
          ${styles.cursorFollower} 
           fixed hidden h-8 w-8 select-none pointer-events-none z-50
        `}
      ></div>
    </>
  );
};

export default Cursor;
