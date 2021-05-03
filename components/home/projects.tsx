import { MutableRefObject, useEffect, useRef } from 'react';
import { MENULINKS, PROJECTS } from '../../constants';
import ProjectTile from '../common/project-tile'
import { gsap, Power0 } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Projects = ({ isDesktop, clientHeight }) => {

    const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);
    const sectionTitle: MutableRefObject<HTMLDivElement> = useRef(null);

    const screens = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536
    }

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (isDesktop && targetSection.current && document.body.clientWidth > 767) {

            const timeline = gsap.timeline({ defaults: { ease: Power0.easeNone } });
            const cardWidth = 38;
            const gapX = 4;
            const sidePadding = window.innerWidth > screens.md ? 10 : 6;
            const elementWidth = PROJECTS.length * cardWidth + sidePadding + PROJECTS.length * gapX;
            targetSection.current.style.width = `${elementWidth}rem`;
            const width = window.innerWidth - targetSection.current.offsetWidth;
            const duration = `${(targetSection.current.offsetWidth / window.innerHeight * 100)}%`;
            timeline
                .to(targetSection.current, { x: width })
                .to(sectionTitle.current, { x: -width }, '<');

            ScrollTrigger.create({
                trigger: targetSection.current,
                start: 'top top',
                end: duration,
                scrub: 0,
                pin: true,
                animation: timeline,
                pinSpacing: 'margin'
            });

        } else {
            targetSection.current.querySelector('.project-wrapper').classList.add('overflow-y-scroll')
        }
    }, [targetSection, PROJECTS, sectionTitle])


    return (
        <section ref={targetSection} className='w-full min-h-screen relative select-none' id={MENULINKS[1].ref}>
            <div className={(clientHeight > 650 ? 'gap-y-20' : 'gap-y-10') + ' flex-col flex 2xl:container py-8 mx-auto xl:px-20 md:px-12 px-4 justify-center h-full'}>
                <div className='flex flex-col gap-2' ref={sectionTitle}>
                    <p className='uppercase tracking-widest text-gray-200 text-sm'>PROJECTS</p>
                    <h1 className='text-5xl font-bold text-gradient'>My Works</h1>
                    <h2 className='text-2xl md:max-w-3xl w-full'>I have contributed in over 20+ projects ranging from Frontend Development, UI/UX, Open Source, and Motion Graphics</h2>
                </div>
                <div className='flex gap-x-16 project-wrapper'>
                    {PROJECTS.map(project => <ProjectTile project={project} key={project.name}></ProjectTile>)}
                </div>
            </div>
            <style jsx global>{`
            .project-wrapper::-webkit-scrollbar {
                display: none;
            }
            `}</style>
        </section>
    )
}

export default Projects;