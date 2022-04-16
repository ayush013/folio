import { MENULINKS, SKILLS } from "../../constants";
import Image from "next/image";
import { MutableRefObject, useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const SKILL_STYLES = {
  SECTION:
    "w-full relative select-none mb-24 section-container py-12 flex flex-col justify-center",
  SKILL_TITLE: "section-title-sm mb-4 seq",
};

const SkillsSection = () => {
  const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

  const initRevealAnimation = (
    targetSection: MutableRefObject<HTMLDivElement>
  ): ScrollTrigger => {
    const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
    revealTl.from(
      targetSection.current.querySelectorAll(".seq"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<"
    );

    return ScrollTrigger.create({
      trigger: targetSection.current.querySelector(".skills-wrapper"),
      start: "100px bottom",
      end: `center center`,
      animation: revealTl,
      scrub: 0,
    });
  };

  useEffect(() => {
    const revealAnimationRef = initRevealAnimation(targetSection);

    return revealAnimationRef.kill;
  }, [targetSection]);

  const renderSectionTitle = (): React.ReactNode => (
    <div className="flex flex-col">
      <p className="section-title-sm seq">SKILLS</p>
      <h1 className="section-heading seq mt-2">My Skills</h1>
      <h2 className="text-2xl md:max-w-2xl w-full seq mt-2">
        I like to take responsibility to craft aesthetic user experience using
        modern frontend architecture.{" "}
      </h2>
    </div>
  );

  const renderBackgroundPattern = (): React.ReactNode => (
    <>
      <div className="absolute right-0 -bottom-2/3 w-1/5 max-w-xs md:block hidden">
        <Image
          src="/pattern-r.svg"
          loading="lazy"
          height={700}
          width={320}
          alt="pattern"
        />
      </div>
      <div className="absolute left-0 -bottom-1/3 w-1/12 max-w-xs md:block hidden">
        <Image
          src="/pattern-l.svg"
          loading="lazy"
          height={335}
          width={140}
          alt="pattern"
        />
      </div>
    </>
  );

  const renderSkillColumn = (
    title: string,
    skills: string[]
  ): React.ReactNode => (
    <>
      <h3 className={SKILL_STYLES.SKILL_TITLE}>{title}</h3>
      <div className="flex flex-wrap seq transform-gpu">
        {skills.map((skill) => (
          <Image
            key={skill}
            src={`/skills/${skill}.svg`}
            alt={skill}
            width={76}
            height={76}
            className="skill"
          />
        ))}
      </div>
    </>
  );

  return (
    <section
      className={SKILL_STYLES.SECTION}
      id={MENULINKS[2].ref}
      ref={targetSection}
    >
      {renderBackgroundPattern()}
      <div className="flex flex-col skills-wrapper">
        {renderSectionTitle()}
        <div className="mt-10">
          {renderSkillColumn("FRONTEND DEVELOPMENT", SKILLS.frontend)}
        </div>
        <div className="flex flex-wrap mt-10">
          <div className="mr-6 mb-6">
            {renderSkillColumn(
              "User Interface, User Experience Design",
              SKILLS.userInterface
            )}
          </div>
          <div>{renderSkillColumn("Other Skills", SKILLS.other)}</div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
