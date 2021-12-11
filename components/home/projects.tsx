import { MutableRefObject, useEffect, useRef } from "react";
import { MENULINKS, PROJECTS } from "../../constants";
import ProjectTile from "../common/project-tile";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Projects = ({
  clientHeight,
  isDesktop,
}: {
  clientHeight: number;
  isDesktop: boolean;
}) => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
  const sectionTitle: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    let projectsScrollTrigger;
    let projectsTimeline;

    if (isDesktop) {
      [projectsTimeline, projectsScrollTrigger] = getProjectsSt();
    } else {
      const projectWrapper = targetSection.current.querySelector(
        ".project-wrapper"
      ) as HTMLDivElement;
      projectWrapper.style.width = "calc(100vw - 1rem)";
      projectWrapper.style.overflowX = "scroll";
    }

    const [revealTimeline, revealScrollTrigger] = getRevealSt();

    return () => {
      projectsScrollTrigger && projectsScrollTrigger.kill();
      projectsTimeline && projectsTimeline.kill();
      revealScrollTrigger && revealScrollTrigger.kill();
      revealTimeline && revealTimeline.progress(1);
    };
  }, [targetSection, sectionTitle, isDesktop]);

  const getRevealSt = (): [GSAPTimeline, ScrollTrigger] => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl.from(
      targetSection.current.querySelectorAll(".seq"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    const scrollTrigger = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 0,
      animation: revealTl,
    });

    return [revealTl, scrollTrigger];
  };

  const getProjectsSt = (): [GSAPTimeline, ScrollTrigger] => {
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

    const scrollTrigger = ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top top",
      end: duration,
      scrub: 0,
      pin: true,
      animation: timeline,
      pinSpacing: "margin",
    });

    return [timeline, scrollTrigger];
  };

  return (
    <section
      ref={targetSection}
      className={`${
        isDesktop && "min-h-screen"
      } w-full relative select-none section-container transform-gpu`}
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
              classes={idx !== PROJECTS.length - 1 && "md:mr-10 mr-6"}
              project={project}
              key={project.name}
              isDesktop={isDesktop}
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
