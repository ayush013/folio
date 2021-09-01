import { MutableRefObject, useEffect, useRef } from "react";

const ProgressIndicator = () => {
  const progress: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = winScroll / height;
      progress.current
        ? (progress.current.style.transform = `scaleX(${scrolled})`)
        : "";
    });
  }, [progress]);

  return (
    <div className="progress w-full fixed top-0 z-50">
      <div className="progress-bar" ref={progress}></div>
    </div>
  );
};

export default ProgressIndicator;
