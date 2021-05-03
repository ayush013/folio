import { MENULINKS, SKILLS } from '../../constants';
import Image from 'next/image';
import { MutableRefObject, useEffect, useRef } from 'react';
import { gsap, Linear } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Skills = () => {

    const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {

        const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
        revealTl
            .from(targetSection.current.querySelectorAll('.seq'), { opacity: 0, duration: 0.5, stagger: 0.5 }, '<');

        ScrollTrigger.create({
            trigger: targetSection.current,
            start: 'top bottom',
            end: 'bottom bottom',
            animation: revealTl,
            onEnter: (e) => revealTl.restart()
        });

    }, [targetSection])

    return (
        <section className='w-full relative select-none min-h-screen' id={MENULINKS[2].ref} ref={targetSection}>
            <div className='2xl:container mx-auto py-8 xl:px-20 md:px-12 px-4 flex flex-col justify-center gap-y-10'>
                <img src='/pattern-r.svg' className='absolute right-0 -bottom-52 w-1/5 max-w-xs md:block hidden' loading='lazy' height={700} width={320} />
                <img src='/pattern-l.svg' className='absolute left-0 -bottom-40 w-1/12 max-w-xs md:block hidden' loading='lazy' height={335} width={140} />
                <div className='flex flex-col gap-2'>
                    <p className='uppercase tracking-widest text-gray-200 text-sm seq'>SKILLS</p>
                    <h1 className='text-5xl font-bold text-gradient seq'>My Skills</h1>
                    <h2 className='text-2xl md:max-w-2xl w-full seq'>I like to take responsibility to craft aesthetic user experience using modern frontend architecture. </h2>
                </div>
                <div>
                    <h3 className='uppercase tracking-widest text-gray-200 text-sm mb-6 seq'>FRONTEND DEVELOPMENT</h3>
                    <div className='flex gap-5 flex-wrap seq'>
                        {SKILLS.frontend.map(skill => <Image key={skill} src={`/skills/${skill}.svg`} alt={skill} width={60} height={60} />)}
                    </div>
                </div>
                <div className='flex gap-10 flex-wrap'>
                    <div>
                        <h3 className='uppercase tracking-widest text-gray-200 text-sm mb-6 seq'>User Interface, User Experience Design</h3>
                        <div className='flex gap-5 flex-wrap seq'>
                            {SKILLS.userInterface.map(skill => <Image key={skill} src={`/skills/${skill}.svg`} alt={skill} width={60} height={60} />)}
                        </div>
                    </div>
                    <div>
                        <h3 className='uppercase tracking-widest text-gray-200 text-sm mb-6 seq'>Other Skills</h3>
                        <div className='flex gap-5 flex-wrap seq'>
                            {SKILLS.other.map(skill => <Image key={skill} src={`/skills/${skill}.svg`} alt={skill} width={60} height={60} />)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills;