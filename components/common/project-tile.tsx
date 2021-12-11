import styles from "./ProjectTile.module.scss";
import Image from "next/image";
import { MutableRefObject, useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

const ProjectTile = ({ project, classes, isDesktop }) => {
  const projectCard: MutableRefObject<HTMLDivElement> = useRef(null);
  let additionalClasses = "";
  if (classes) {
    additionalClasses = classes;
  }

  useEffect(() => {
    VanillaTilt.init(projectCard.current, {
      max: 5,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      gyroscope: false,
    });
  }, [projectCard]);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={`link overflow-hidden rounded-3xl ${additionalClasses}`}
      style={{
        maxWidth: isDesktop ? "calc(100vw - 2rem)" : "calc(100vw - 4rem)",
        flex: "1 0 auto",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
    >
      <div
        ref={projectCard}
        className={`
          ${styles.ProjectTile}
           rounded-3xl relative p-6 flex-col flex justify-between max-w-full
        `}
        style={{
          background: `linear-gradient(90deg, ${project.gradient[0]} 0%, ${project.gradient[1]} 100%)`,
        }}
      >
        <img
          src="/project-bg.svg"
          alt="Project"
          className="absolute w-full h-full top-0 left-0 opacity-20"
        />
        <Image
          placeholder="blur"
          blurDataURL={project.blurImage}
          src={project.image}
          alt={project.name}
          layout="fill"
          className={`${styles.ProjectImg} z-0`}
        />
        <div
          className="absolute top-0 left-0 w-full h-20"
          style={{
            background: `linear-gradient(180deg, ${project.gradient[0]} 0%, rgba(0,0,0,0) 100%)`,
          }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-32"
          style={{
            background: `linear-gradient(0deg, ${project.gradient[0]} 10%, rgba(0,0,0,0) 100%)`,
          }}
        ></div>
        <h1
          className="text-2xl sm:text-3xl z-10 pl-2 transform-gpu"
          style={{ transform: "translateZ(3rem)" }}
        >
          {project.name}
        </h1>
        <div
          className={`
            ${styles.techIcons} w-1/2 h-full absolute left-24 top-0 sm:flex items-center hidden
          `}
        >
          <div className="flex flex-col pb-8">
            {project.tech.map((el, i) => (
              <img
                className={`${i % 2 === 0 && "ml-16"} mb-4`}
                src={`/projects/tech/${el}.svg`}
                alt={el}
                height={45}
                width={45}
                key={el}
              />
            ))}
          </div>
        </div>
        <h2
          className="text-lg z-10 tracking-wide font-medium transform-gpu"
          style={{ transform: "translateZ(0.8rem)" }}
        >
          {project.description}
        </h2>
      </div>
    </a>
  );
};

export default ProjectTile;
