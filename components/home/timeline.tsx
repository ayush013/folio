import { MutableRefObject, useEffect, useRef, useState } from "react";
import {
  Branch,
  BranchNode,
  CheckpointNode,
  ItemSize,
  MENULINKS,
  NodeTypes,
  TIMELINE,
  TimelineNodeV2,
} from "../../constants";
import Image from "next/image";
import { gsap, Linear } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { IDesktop, isSmallScreen } from "pages";

const svgColor = "#9CA3AF";
const animColor = "#FCD34D";
const separation = 450;
const strokeWidth = 2;
const leftBranchX = 13;
const curveLength = 150;
const dotSize = 26;

const TimelineSection = ({ isDesktop }: IDesktop) => {
  const [svgWidth, setSvgWidth] = useState(400);
  const [rightBranchX, setRightBranchX] = useState(109);

  const svgLength =
    TIMELINE.filter(
      (item) => item.type === NodeTypes.CHECKPOINT && item.shouldDrawLine
    )?.length * separation;

  const timelineSvg: MutableRefObject<SVGSVGElement> = useRef(null);
  const svgContainer: MutableRefObject<HTMLDivElement> = useRef(null);
  const screenContainer: MutableRefObject<HTMLDivElement> = useRef(null);

  const addNodeRefsToItems = (
    timeline: TimelineNodeV2[]
  ): LinkedTimelineNode[] => {
    return timeline.map((node, idx) => ({
      ...node,
      next: timeline[idx + 1],
      prev: timeline[idx - 1],
    }));
  };

  const generateTimelineSvg = (timeline: Array<TimelineNodeV2>): string => {
    let index = 1;
    let y = dotSize / 2;
    const timelineStyle = `<style>.str, .dot{stroke-width: ${strokeWidth}px}.anim-branch{stroke-dasharray: 186}</style>`;
    let isDiverged = false;

    const timelineSvg = addNodeRefsToItems(timeline).reduce(
      (svg: string, node: LinkedTimelineNode) => {
        const { type, next, prev } = node;
        let lineY = y;
        let dotY = y + separation / 2;

        switch (type) {
          case NodeTypes.CHECKPOINT:
            {
              const { shouldDrawLine } = node;

              // special handling for last checkpoint
              if (!next) {
                lineY = y - separation / 2;
              }

              // special handling for dot without line
              if (!shouldDrawLine) {
                dotY = y;
              }

              if (shouldDrawLine) {
                // TO DO fix syntax
                svg = shouldDrawLine
                  ? drawLine(node, lineY, index, isDiverged) + svg
                  : svg;
                y = y + separation;
                index++;
              }

              svg = svg.concat(drawDot(node, dotY, isDiverged));
            }
            break;
          case NodeTypes.DIVERGE:
            {
              isDiverged = true;

              svg = drawBranch(node, y, index) + svg;
            }
            break;
          case NodeTypes.CONVERGE:
            {
              isDiverged = false;

              // To Do fix syntax
              // Drawing CONVERGE branch with previous line and index
              svg = drawBranch(node, y - separation, index - 1) + svg;
            }
            break;
        }

        return svg;
      },
      timelineStyle
    );

    return timelineSvg;
  };

  const getDotString = (x: number, y: number) => {
    return `<rect class='dot' width=${dotSize} height=${dotSize} fill='#111827' x=${
      x - dotSize / 2
    } y=${
      y - dotSize / 2
    } ></rect><circle cx=${x} cy=${y} r='7' stroke=${svgColor} class='dot' ></circle>`;
  };

  const drawDot = (
    timelineNode: LinkedCheckpointNode,
    y: number,
    isDiverged: boolean
  ) => {
    const { next, alignment } = timelineNode as LinkedCheckpointNode;

    // Diverging
    if (next && next.type === NodeTypes.DIVERGE) {
      y = y - curveLength + 6 * dotSize;
    }

    // Converging
    if (next && next.type === NodeTypes.CONVERGE) {
      y = y + curveLength - 6 * dotSize;
    }

    const dotString = getDotString(
      alignment === Branch.LEFT ? leftBranchX : rightBranchX,
      y
    );

    const textString = addText(timelineNode, y, isDiverged);

    return `${textString}${dotString}`;
  };

  const addText = (
    timelineNode: LinkedCheckpointNode,
    y: number,
    isDiverged: boolean
  ) => {
    const { title, subtitle, size, image } = timelineNode;

    const offset = isDiverged ? rightBranchX : 10;
    const foreignObjectX = dotSize / 2 + 10 + offset;
    const foreignObjectY = y - dotSize / 2;
    const foreignObjectWidth = svgWidth - (dotSize / 2 + 10 + offset);

    const titleSizeClass = size === ItemSize.LARGE ? "text-6xl" : "text-2xl";
    const logoString = image
      ? `<img src='${image}' class='h-8 mb-2' loading='lazy' width='100' height='32' alt='${image}' />`
      : "";
    const subtitleString = subtitle
      ? `<p class='text-xl mt-2 text-gray-200 font-medium tracking-wide'>${subtitle}</p>`
      : "";

    return `<foreignObject x=${foreignObjectX} y=${foreignObjectY} width=${foreignObjectWidth} 
        height=${separation}>${logoString}<p class='${titleSizeClass}'>${title}</p>${subtitleString}</foreignObject>`;
  };

  const drawLine = (
    timelineNode: LinkedCheckpointNode,
    y: number,
    i: number,
    isDiverged: boolean
  ) => {
    const { alignment, prev, next } = timelineNode as LinkedCheckpointNode;

    const isPrevDiverge = prev && prev.type === NodeTypes.DIVERGE;
    const isNextConverge = next && next.type === NodeTypes.CONVERGE;

    const lineY = Math.abs(y + separation);

    // Smaller line for Diverging
    if (isPrevDiverge) {
      return `<line class='str' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${animColor} />`;
    }

    // Smaller line for Converging
    if (isNextConverge) {
      return `<line class='str' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${leftBranchX} y1=${y} x2=${leftBranchX} y2=${lineY} stroke=${animColor} />`;
    }

    const lineX = alignment === Branch.LEFT ? leftBranchX : rightBranchX;
    const divergedLineX =
      alignment === Branch.LEFT ? rightBranchX : leftBranchX;
    let str = `<line class='str' x1=${lineX} y1=${y} x2=${lineX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${lineX} y1=${y} x2=${lineX} y2=${lineY} stroke=${animColor} />`;
    if (isDiverged) {
      str = str.concat(
        `<line class='str' x1=${divergedLineX} y1=${y} x2=${divergedLineX} y2=${lineY} stroke=${svgColor} /><line class='str line-${i}' x1=${divergedLineX} y1=${y} x2=${divergedLineX} y2=${lineY} stroke=${animColor} />`
      );
    }
    return str;
  };

  const drawBranch = (timelineNode: LinkedBranchNode, y: number, i: number) => {
    const { type } = timelineNode;

    switch (type) {
      case NodeTypes.DIVERGE:
        return `<path class='str' d='M ${leftBranchX} ${y} C ${leftBranchX} ${
          y + curveLength / 2
        } ${rightBranchX} ${y + curveLength / 2} ${rightBranchX} ${
          y + curveLength
        }' stroke=${svgColor} /><line class='str' x1=${rightBranchX} y1=${
          y + curveLength
        } x2=${rightBranchX} y2=${
          y + separation
        } stroke=${svgColor} /><path class='str anim-branch branch-${i}' d='M ${leftBranchX} ${y} C ${leftBranchX} ${
          y + curveLength / 2
        } ${rightBranchX} ${y + curveLength / 2} ${rightBranchX} ${
          y + curveLength
        }' stroke=${animColor} /><line class='str branch-line-${i}' x1=${rightBranchX} y1=${
          y + curveLength
        } x2=${rightBranchX} y2=${y + separation} stroke=${animColor} />`;
      case NodeTypes.CONVERGE:
        return `<path class='str' d='M ${rightBranchX} ${
          y + separation - curveLength
        } C ${rightBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation
        }' stroke=${svgColor} /><line class='str' x1=${rightBranchX} y1=${y} x2=${rightBranchX} y2=${Math.abs(
          y + separation - curveLength
        )} stroke=${svgColor} /><path class='str anim-branch branch-${i}' d='M ${rightBranchX} ${
          y + separation - curveLength
        } C ${rightBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation - curveLength + curveLength / 2
        } ${leftBranchX} ${
          y + separation
        }' stroke=${animColor} /><line class='str branch-line-${i}' x1=${rightBranchX} y1=${y} x2=${rightBranchX} y2=${Math.abs(
          y + separation - curveLength
        )} stroke=${animColor} />`;
      default:
        return "";
    }
  };

  useEffect(() => {
    const containerWidth = svgContainer.current.clientWidth;
    setSvgWidth(containerWidth);

    const resultSvgString = generateTimelineSvg(TIMELINE);
    timelineSvg.current.innerHTML = resultSvgString;

    if (isSmallScreen()) {
      setRightBranchX(70);
    }

    const timeline = gsap
      .timeline({ defaults: { ease: Linear.easeNone, duration: 0.44 } })
      .addLabel("start");
    let duration;

    if (isDesktop && !isSmallScreen()) {
      timeline
        .to(screenContainer.current.querySelector(".slide-1"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-2"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-2"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-3"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-3"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-4"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-4"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-5"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-5"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-6"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-6"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-7"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-7"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-8"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-8"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-9"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-9"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-10"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-10"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-11"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-11"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-12"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-12"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-13"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-13"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-14"),
          { opacity: 0 },
          { opacity: 1 }
        )
        .to(screenContainer.current.querySelector(".slide-14"), {
          opacity: 0,
          delay: 2.35,
        })

        .fromTo(
          screenContainer.current.querySelector(".slide-15"),
          { opacity: 0 },
          { opacity: 1 }
        );

      const platformHeight =
        screenContainer.current.getBoundingClientRect().height;

      ScrollTrigger.create({
        trigger: screenContainer.current,
        start: `top ${(window.innerHeight - platformHeight) / 2}`,
        end: `+=${svgLength - platformHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: 0,
        animation: timeline,
      });
      duration = timeline.totalDuration() / 15;
    } else {
      screenContainer.current.innerHTML = "";
      ScrollTrigger.create({
        trigger: svgContainer.current,
        start: "top center",
        end: `+=${svgLength}`,
        scrub: 0,
        animation: timeline,
      });
      duration = 3;
    }

    timeline
      .from(
        svgContainer.current.querySelector(".line-1"),
        { scaleY: 0, duration: duration },
        "start"
      )

      .from(
        svgContainer.current.querySelector(".line-2"),
        { scaleY: 0, duration: duration },
        `start+=${duration}`
      )
      .from(
        svgContainer.current.querySelector(".branch-2"),
        { strokeDashoffset: 186, duration: duration - 2 },
        `start+=${duration}`
      )
      .from(
        svgContainer.current.querySelector(".branch-line-2"),
        { scaleY: 0, duration: duration - 1 },
        `start+=${2 * duration - 2}`
      )

      .from(
        svgContainer.current.querySelector(".line-3"),
        { scaleY: 0, duration: duration },
        `start+=${2 * duration}`
      )
      .from(
        svgContainer.current.querySelector(".branch-line-3"),
        { scaleY: 0, duration: duration - 1 },
        `start+=${2 * duration}`
      )
      .from(
        svgContainer.current.querySelector(".branch-3"),
        { strokeDashoffset: 186, duration: duration - 2 },
        `start+=${3 * duration - 1}`
      )

      .from(
        svgContainer.current.querySelector(".line-4"),
        { scaleY: 0, duration: duration },
        `start+=${3 * duration}`
      )

      .from(
        svgContainer.current.querySelector(".line-5"),
        { scaleY: 0, duration: duration },
        `start+=${4 * duration}`
      )

      .from(
        svgContainer.current.querySelector(".line-6"),
        { scaleY: 0, duration: duration },
        `start+=${5 * duration}`
      )

      .from(
        svgContainer.current.querySelector(".line-7"),
        { scaleY: 0, duration: duration },
        `start+=${6 * duration}`
      )
      .from(
        svgContainer.current.querySelector(".branch-7"),
        { strokeDashoffset: 186, duration: duration - 2 },
        `start+=${6 * duration}`
      )
      .from(
        svgContainer.current.querySelector(".branch-line-7"),
        { scaleY: 0, duration: duration - 1 },
        `start+=${7 * duration - 2}`
      )

      .from(
        svgContainer.current.querySelectorAll(".line-8"),
        { scaleY: 0, duration: duration },
        `start+=${7 * duration}`
      )

      .from(
        svgContainer.current.querySelectorAll(".line-9"),
        { scaleY: 0, duration: duration },
        `start+=${8 * duration}`
      )

      .from(
        svgContainer.current.querySelectorAll(".line-10"),
        { scaleY: 0, duration: duration },
        `start+=${9 * duration}`
      )

      .from(
        svgContainer.current.querySelectorAll(".line-11"),
        { scaleY: 0, duration: duration },
        `start+=${10 * duration}`
      )

      .from(
        svgContainer.current.querySelectorAll(".line-12"),
        { scaleY: 0, duration: duration },
        `start+=${11 * duration}`
      )

      .from(
        svgContainer.current.querySelector(".line-13"),
        { scaleY: 0, duration: duration },
        `start+=${12 * duration}`
      )
      .from(
        svgContainer.current.querySelector(".branch-line-13"),
        { scaleY: 0, duration: duration - 1 },
        `start+=${12 * duration}`
      )
      .from(
        svgContainer.current.querySelector(".branch-13"),
        { strokeDashoffset: 186, duration: duration - 2 },
        `start+=${13 * duration - 1}`
      )

      .from(
        svgContainer.current.querySelectorAll(".line-14"),
        { scaleY: 0, duration: duration },
        `start+=${13 * duration}`
      )

      .from(
        svgContainer.current.querySelectorAll(".line-15"),
        { scaleY: 0, duration: duration },
        `start+=${14 * duration - 1}`
      );
  }, [
    timelineSvg,
    svgContainer,
    svgWidth,
    rightBranchX,
    screenContainer,
    isDesktop,
    svgLength,
  ]);

  return (
    <section
      className="w-full relative select-none min-h-screen section-container py-8 flex flex-col justify-center"
      id={MENULINKS[3].ref}
    >
      <div className="flex flex-col">
        <p className="uppercase tracking-widest text-gray-200 text-sm seq">
          MILESTONES
        </p>
        <h1 className="md:text-5xl text-4xl font-bold text-gradient seq w-fit mt-2">
          Timeline
        </h1>
        <h2 className="text-2xl md:max-w-2xl w-full seq mt-2">
          A quick recap of proud moments
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-20">
        <div className="col-span-12 md:col-span-6 line-svg" ref={svgContainer}>
          <svg
            width={svgWidth}
            height={svgLength}
            viewBox={`0 0 ${svgWidth} ${svgLength}`}
            fill="none"
            ref={timelineSvg}
          ></svg>
        </div>
        <div className="col-span-12 md:col-span-6 md:flex hidden">
          <div
            className="max-w-full h-96 shadow-xl bg-gray-800 rounded-2xl overflow-hidden"
            ref={screenContainer}
          >
            <Image
              className="w-full h-8"
              src="/timeline/title-bar.svg"
              alt="Title bar"
              width={644}
              height={34}
            />
            <div className="relative h-full w-full -mt-2">
              <div className="absolute top-0 left-0 h-full w-full">
                <Image
                  className="w-full absolute top-0 object-cover slide-1"
                  src="/timeline/flipkart.gif"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-2"
                  src="/timeline/huminos-freelance.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-3"
                  src="/timeline/aftereffects.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-4"
                  src="/timeline/dlt-website.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-5"
                  src="/timeline/huminos-website.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-6"
                  src="/timeline/farewell.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-7"
                  src="/timeline/si-head.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-8"
                  src="/timeline/svg-lecture.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-9"
                  src="/timeline/ims-17.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-10"
                  src="/timeline/js-17.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-11"
                  src="/timeline/abes-17.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-12"
                  src="/timeline/web-17.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-13"
                  src="/timeline/ims-16.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-14"
                  src="/timeline/si-start.jpg"
                  alt="Timeline"
                  layout="fill"
                />
                <Image
                  className="w-full absolute top-0 object-cover slide-15"
                  src="/timeline/xda-rt.jpg"
                  alt="Timeline"
                  layout="fill"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

type LinkedTimelineNode = LinkedCheckpointNode | LinkedBranchNode;

type LinkedCheckpointNode = LinkNode & CheckpointNode;

type LinkedBranchNode = LinkNode & BranchNode;

interface LinkNode {
  next?: LinkedTimelineNode;
  prev?: LinkedTimelineNode;
}
