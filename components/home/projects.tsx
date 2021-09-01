import { MutableRefObject, useEffect, useRef } from "react";
import { MENULINKS, PROJECTS } from "../../constants";
import ProjectTile from "../common/project-tile";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Projects = ({ clientHeight }) => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const sectionTitle: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
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

    ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top top",
      end: duration,
      scrub: 0,
      pin: true,
      animation: timeline,
      pinSpacing: "margin",
    });

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
      className="w-full min-h-screen relative select-none 2xl:container mx-auto transform-gpu"
      id={MENULINKS[1].ref}
    >
      <div
        className={
          " flex-col flex py-8 xl:px-20 md:px-12 px-4 justify-center h-full"
        }
      >
        <div
          className="flex flex-col inner-container transform-gpu"
          ref={sectionTitle}
        >
          <p className="uppercase tracking-widest text-gray-200 text-sm seq">
            PROJECTS
          </p>
          <h1 className="text-5xl font-bold text-gradient seq w-fit mt-2">
            My Works
          </h1>
          <h2 className="text-2xl md:max-w-3xl w-full seq max-w-sm mt-2">
            I have contributed in over 20+ projects ranging from Frontend
            Development, UI/UX, Open Source, and Motion Graphics
          </h2>
        </div>
        <div
          className={
            (clientHeight > 650 ? "mt-20" : "mt-10") +
            " flex project-wrapper w-fit seq"
          }
        >
          {PROJECTS.map((project, idx) => (
            <ProjectTile
              classes={idx === PROJECTS.length - 1 ? "" : "mr-16"}
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
