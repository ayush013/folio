import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { MENULINKS, TIMELINE, TimelineContent, TimelineNode } from '../../constants';
import Image from 'next/image';
import { gsap, Linear } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const svgColor = '#9CA3AF';
const animColor = '#FCD34D';
const separation = 450;
const strokeWidth = 2;
const branch1X = 13;
const curveLength = 150;
const dotSize = 26;

const Timeline = ({ isDesktop }) => {

    const [svgWidth, setSvgWidth] = useState(400);
    const [branch2X, setBranch2X] = useState(109);

    const svgLength = TIMELINE.filter(el => el.type !== 'year')?.length * separation;

    const timelineSvg: MutableRefObject<SVGSVGElement> = useRef(null);
    const svgContainer: MutableRefObject<HTMLDivElement> = useRef(null);
    const screenContainer: MutableRefObject<HTMLDivElement> = useRef(null);


    const drawDot = (timelineNode: TimelineNode, y: number) => {
        let x = branch1X;
        if (timelineNode.branch === 2) {
            x = branch2X;
        }
        if (timelineNode.diverge) {
            y = y - curveLength + 6 * dotSize;
        }
        if (timelineNode.converge) {
            y = y + curveLength - 6 * dotSize;
        }

        const str = addText(timelineNode, y) + `<rect class='dot' width=${dotSize} height=${dotSize} fill='#111827' x=${x - dotSize / 2} y=${y - dotSize / 2} ></rect><circle cx=${x} cy=${y} r='7' stroke=${svgColor} class='dot' ></circle>`;

        return str;
    };

    const drawLine = (timelineNode: TimelineNode, y: number, i: number) => {
        if (timelineNode.converge || timelineNode.diverge) {
            if (timelineNode.diverge) {
                return `<line class='str' x1=${branch1X} y1=${y} x2=${branch1X} y2=${y + separation} stroke=${svgColor} /><line class='str line-${i}' x1=${branch1X} y1=${y} x2=${branch1X} y2=${y + separation} stroke=${animColor} />`
            } else {
                return `<line class='str' x1=${branch1X} y1=${y} x2=${branch1X} y2=${y + separation} stroke=${svgColor} /><line class='str line-${i}' x1=${branch1X} y1=${y} x2=${branch1X} y2=${y + separation} stroke=${animColor} />`
            }
        } else {
            let str = `<line class='str' x1=${timelineNode.branch === 1 ? branch1X : branch2X} y1=${y} x2=${timelineNode.branch === 1 ? branch1X : branch2X} y2=${Math.abs(y + separation)} stroke=${svgColor} /><line class='str line-${i}' x1=${timelineNode.branch === 1 ? branch1X : branch2X} y1=${y} x2=${timelineNode.branch === 1 ? branch1X : branch2X} y2=${Math.abs(y + separation)} stroke=${animColor} />`
            if (timelineNode.parallel) {
                str = str.concat(`<line class='str' x1=${timelineNode.parallel === 1 ? branch1X : branch2X} y1=${y} x2=${timelineNode.parallel === 1 ? branch1X : branch2X} y2=${Math.abs(y + separation)} stroke=${svgColor} /><line class='str line-${i}' x1=${timelineNode.parallel === 1 ? branch1X : branch2X} y1=${y} x2=${timelineNode.parallel === 1 ? branch1X : branch2X} y2=${Math.abs(y + separation)} stroke=${animColor} />`)
            }
            return str;
        }
    };

    const drawBranch = (timelineNode: TimelineNode, y: number, i: number) => {
        if (timelineNode.converge) {
            return `<path class='str' d='M ${branch2X} ${y + separation - curveLength} C ${branch2X} ${y + separation - curveLength + curveLength / 2} ${branch1X} ${y + separation - curveLength + curveLength / 2} ${branch1X} ${y + separation}' stroke=${svgColor} /><line class='str' x1=${branch2X} y1=${y} x2=${branch2X} y2=${Math.abs(y + separation - curveLength)} stroke=${svgColor} /><path class='str anim-branch branch-${i}' d='M ${branch2X} ${y + separation - curveLength} C ${branch2X} ${y + separation - curveLength + curveLength / 2} ${branch1X} ${y + separation - curveLength + curveLength / 2} ${branch1X} ${y + separation}' stroke=${animColor} /><line class='str branch-line-${i}' x1=${branch2X} y1=${y} x2=${branch2X} y2=${Math.abs(y + separation - curveLength)} stroke=${animColor} />`;
        } else {
            return `<path class='str' d='M ${branch1X} ${y} C ${branch1X} ${y + curveLength / 2} ${branch2X} ${y + curveLength / 2} ${branch2X} ${y + curveLength}' stroke=${svgColor} /><line class='str' x1=${branch2X} y1=${y + curveLength} x2=${branch2X} y2=${y + separation} stroke=${svgColor} /><path class='str anim-branch branch-${i}' d='M ${branch1X} ${y} C ${branch1X} ${y + curveLength / 2} ${branch2X} ${y + curveLength / 2} ${branch2X} ${y + curveLength}' stroke=${animColor} /><line class='str branch-line-${i}' x1=${branch2X} y1=${y + curveLength} x2=${branch2X} y2=${y + separation} stroke=${animColor} />`;
        }

    };

    const addText = (timelineNode: TimelineNode, y: number) => {
        const offset = (timelineNode.branch === 2 || timelineNode.parallel || timelineNode.diverge) ? branch2X : 10;
        if (timelineNode.type === 'year') {
            return `<foreignObject x=${dotSize / 2 + 10 + offset} y=${y - dotSize / 2} width=${svgWidth - (dotSize / 2 + 10 + offset)} height='100'><p class='text-6xl'>${timelineNode.content}</p></foreignObject>`
        } else {
            const { description, title, logo } = timelineNode.content as TimelineContent;
            let logoStr = '';
            if (logo) {
                logoStr = `<img src='/timeline/${logo}.svg' class='h-8 mb-2' loading='lazy' width='100' height='32' alt='${logo}' />`
            }
            return `<foreignObject x=${dotSize / 2 + 10 + offset} y=${y - dotSize / 2} width=${svgWidth - (dotSize / 2 + 10 + offset)} height=${separation}>${logoStr}<p class='text-2xl'>${title}</p><p class='text-xl mt-2 text-gray-200 font-medium tracking-wide'>${description}</p></foreignObject>`
        }
    }

    const createSvg = (timeline: TimelineNode[]) => {
        let dots = 0;
        let idx = 1;
        let y = dotSize / 2;
        let result = `<style>.str, .dot{stroke-width: ${strokeWidth}px}.anim-branch{stroke-dasharray: 186}</style>`;

        for (let node of timeline) {
            if (dots === 0) {
                result = result.concat(drawDot(node, y));
                dots++;
                continue;
            }
            if (dots === timeline.length - 1) {
                result = drawLine(node, y - separation / 2, idx) + result;
                result = result.concat(drawDot(node, y + separation / 2));
                dots++;
                idx++;
                continue;
            }
            if (node.type === 'year') {
                result = result.concat(drawDot(node, y));
            } else {
                if (node.diverge || node.converge) {
                    result = drawLine(node, y, idx) + result;
                    result = drawBranch(node, y, idx) + result;
                    result = result.concat(drawDot(node, y + separation / 2));
                } else {
                    result = drawLine(node, y, idx) + result;
                    result = result.concat(drawDot(node, y + separation / 2));
                }
                y = y + separation;
                idx++;
            }
            dots++;
        }

        return result
    }


    useEffect(() => {
        const width = svgContainer.current.clientWidth;
        setSvgWidth(width);

        const resultString = createSvg(TIMELINE);
        timelineSvg.current.innerHTML = resultString;

        if (document.body.clientWidth < 767) {
            setBranch2X(70);
        }

        const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone, duration: 0.44 } })
            .addLabel('start');
        let duration;

        if (isDesktop && document.body.clientWidth > 767) {

            timeline
                .to(screenContainer.current.querySelector('.slide-1'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-2'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-2'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-3'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-3'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-4'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-4'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-5'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-5'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-6'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-6'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-7'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-7'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-8'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-8'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-9'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-9'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-10'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-10'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-11'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-11'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-12'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-12'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-13'), { opacity: 0 }, { opacity: 1 })
                .to(screenContainer.current.querySelector('.slide-13'), { opacity: 0, delay: 2.35 })

                .fromTo(screenContainer.current.querySelector('.slide-14'), { opacity: 0 }, { opacity: 1 })

            const platformHeight = screenContainer.current.getBoundingClientRect().height;

            ScrollTrigger.create({
                trigger: screenContainer.current,
                start: `top ${(window.innerHeight - platformHeight) / 2}`,
                end: `+=${svgLength - platformHeight}`,
                pin: true,
                pinSpacing: true,
                scrub: 0,
                animation: timeline,
            });
            duration = timeline.totalDuration() / 14;

        } else {
            screenContainer.current.innerHTML = '';
            ScrollTrigger.create({
                trigger: svgContainer.current,
                start: 'top center',
                end: `+=${svgLength}`,
                scrub: 0,
                animation: timeline,
            });
            duration = 3;
        }


        timeline
            .from(svgContainer.current.querySelector('.line-1'), { scaleY: 0, duration: duration }, 'start')
            .from(svgContainer.current.querySelector('.branch-1'), { strokeDashoffset: 186, duration: duration - 2 }, 'start')
            .from(svgContainer.current.querySelector('.branch-line-1'), { scaleY: 0, duration: duration - 1 }, `start+=${duration - 2}`)

            .from(svgContainer.current.querySelector('.line-2'), { scaleY: 0, duration: duration }, `start+=${duration}`)
            .from(svgContainer.current.querySelector('.branch-line-2'), { scaleY: 0, duration: duration - 1 }, `start+=${duration}`)
            .from(svgContainer.current.querySelector('.branch-2'), { strokeDashoffset: 186, duration: duration - 2 }, `start+=${2 * duration - 1}`)

            .from(svgContainer.current.querySelector('.line-3'), { scaleY: 0, duration: duration }, `start+=${2 * duration}`)

            .from(svgContainer.current.querySelector('.line-4'), { scaleY: 0, duration: duration }, `start+=${3 * duration}`)

            .from(svgContainer.current.querySelector('.line-5'), { scaleY: 0, duration: duration }, `start+=${4 * duration}`)

            .from(svgContainer.current.querySelector('.line-6'), { scaleY: 0, duration: duration }, `start+=${5 * duration}`)
            .from(svgContainer.current.querySelector('.branch-6'), { strokeDashoffset: 186, duration: duration - 2 }, `start+=${5 * duration}`)
            .from(svgContainer.current.querySelector('.branch-line-6'), { scaleY: 0, duration: duration - 1 }, `start+=${6 * duration - 2}`)

            .from(svgContainer.current.querySelectorAll('.line-7'), { scaleY: 0, duration: duration }, `start+=${6 * duration}`)

            .from(svgContainer.current.querySelectorAll('.line-8'), { scaleY: 0, duration: duration }, `start+=${7 * duration}`)

            .from(svgContainer.current.querySelectorAll('.line-9'), { scaleY: 0, duration: duration }, `start+=${8 * duration}`)

            .from(svgContainer.current.querySelectorAll('.line-10'), { scaleY: 0, duration: duration }, `start+=${9 * duration}`)

            .from(svgContainer.current.querySelectorAll('.line-11'), { scaleY: 0, duration: duration }, `start+=${10 * duration}`)


            .from(svgContainer.current.querySelector('.line-12'), { scaleY: 0, duration: duration }, `start+=${11 * duration}`)
            .from(svgContainer.current.querySelector('.branch-line-12'), { scaleY: 0, duration: duration - 1 }, `start+=${11 * duration}`)
            .from(svgContainer.current.querySelector('.branch-12'), { strokeDashoffset: 186, duration: duration - 2 }, `start+=${12 * duration - 1}`)

            .from(svgContainer.current.querySelectorAll('.line-13'), { scaleY: 0, duration: duration }, `start+=${12 * duration}`)

            .from(svgContainer.current.querySelectorAll('.line-14'), { scaleY: 0, duration: duration }, `start+=${13 * duration - 1}`);



    }, [timelineSvg, svgContainer, svgWidth, branch2X, screenContainer])


    return (
        <section className='w-full relative select-none min-h-screen 2xl:container mx-auto py-8 xl:px-20 md:px-12 px-4 flex flex-col justify-center' id={MENULINKS[3].ref}>

            <div className='flex flex-col'>
                <p className='uppercase tracking-widest text-gray-200 text-sm seq'>MILESTONES</p>
                <h1 className='text-5xl font-bold text-gradient seq w-fit mt-2'>Timeline</h1>
                <h2 className='text-2xl md:max-w-2xl w-full seq mt-2'>A quick recap of proud moments</h2>
            </div>
            <div className='grid grid-cols-12 gap-4 mt-20'>
                <div className='col-span-12 md:col-span-6 line-svg' ref={svgContainer}>
                    <svg width={svgWidth} height={svgLength} viewBox={`0 0 ${svgWidth} ${svgLength}`} fill='none' ref={timelineSvg}>
                    </svg>
                </div>
                <div className='col-span-12 md:col-span-6 md:flex hidden'>
                    <div className="max-w-full h-96 shadow-xl bg-gray-800 rounded-2xl overflow-hidden" ref={screenContainer}>
                        <Image className='w-full h-8' src='/timeline/title-bar.svg' alt='Title bar' width={644} height={34} />
                        <div className="relative h-full w-full -mt-2">
                            <div className="absolute top-0 left-0 h-full w-full">
                                <Image className='w-full absolute top-0 object-cover slide-1' src='/timeline/huminos-freelance.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-2' src='/timeline/aftereffects.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-3' src='/timeline/dlt-website.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-4' src='/timeline/huminos-website.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-5' src='/timeline/farewell.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-6' src='/timeline/si-head.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-7' src='/timeline/svg-lecture.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-8' src='/timeline/ims-17.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-9' src='/timeline/js-17.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-10' src='/timeline/abes-17.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-11' src='/timeline/web-17.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-12' src='/timeline/ims-16.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-13' src='/timeline/si-start.jpg' alt='Timeline' layout='fill' />
                                <Image className='w-full absolute top-0 object-cover slide-14' src='/timeline/xda-rt.jpg' alt='Timeline' layout='fill' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Timeline;