import { MutableRefObject, useEffect, useRef } from "react";
import { MENULINKS, PROJECTS } from "../../constants";
import ProjectTile from "../common/project-tile";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Draggable } from "gsap/dist/Draggable";

const Projects = ({ clientHeight }) => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const sectionTitle: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    const sidePadding =
      document.body.clientWidth -
      targetSection.current.querySelector(".inner-container").clientWidth;
    const elementWidth =
      sidePadding +
      targetSection.current.querySelector(".project-wrapper").clientWidth;
    targetSection.current.style.width = `${elementWidth}px`;
    const width = window.innerWidth - elementWidth;
    const duration = `${(elementWidth / window.innerHeight) * 100}%`;
    timeline
      .to(targetSection.current, { x: width })
      .to(sectionTitle.current, { x: -width }, "<");

    let projectScrollTrigger = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top top",
      end: duration,
      scrub: 0.3,
      pin: true,
      animation: timeline,
      pinSpacing: "margin",
    });

    let proxy = document.createElement("div");

    function updateProxy() {
      if (projectScrollTrigger) {
        gsap.set(proxy, {
          x: -projectScrollTrigger.scroll(),
          overwrite: "auto",
        });
      }
    }

    Draggable.create(proxy, {
      trigger: targetSection.current,
      type: "x",
      throwProps: true,
      onThrowUpdate: function () {
        projectScrollTrigger.scroll(-this.x);
      },
      onDrag: function () {
        projectScrollTrigger.scroll(-this.x);
      },
    });

    window.addEventListener("wheel", updateProxy);

    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl.from(
      targetSection.current.querySelectorAll(".seq"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 0,
      animation: revealTl,
    });
  }, [targetSection, sectionTitle]);

  return (
    <section
      ref={targetSection}
      className="w-full min-h-screen relative select-none section-container transform-gpu"
      id={MENULINKS[1].ref}
    >
      <div className="flex-col flex py-8 justify-center h-full">
        <div
          className="flex flex-col inner-container transform-gpu"
          ref={sectionTitle}
        >
          <p className="uppercase tracking-widest text-gray-200 text-sm seq">
            PROJECTS
          </p>
          <h1 className="md:text-5xl text-4xl font-bold text-gradient seq w-fit mt-2">
            My Works
          </h1>
          <h2 className="text-2xl md:max-w-3xl w-full seq max-w-sm mt-2">
            I have contributed in over 20+ projects ranging from Frontend
            development, UI/UX design, Open Source, and Motion Graphics
          </h2>
        </div>
        <div
          className={`${
            clientHeight > 650 ? "mt-12" : "mt-6"
          } flex project-wrapper w-fit seq`}
        >
          {PROJECTS.map((project, idx) => (
            <ProjectTile
              classes={idx === PROJECTS.length - 1 ? "" : "mr-10"}
              project={project}
              key={project.name}
            ></ProjectTile>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .project-wrapper::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;
