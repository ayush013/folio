import { EMAIL, MENULINKS, SOCIAL_LINKS, TYPED_STRINGS } from '../../constants';
import { MutableRefObject, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import Image from 'next/image';
import Button from '../common/button';
import { gsap, Linear } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Hero = () => {
    gsap.registerPlugin(ScrollTrigger);

    const typedEl: MutableRefObject<HTMLSpanElement> = useRef(null);
    const targetSection: MutableRefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedEl.current, {
            strings: TYPED_STRINGS,
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 8000,
            loop: true
        });

        const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
        revealTl
            .to(targetSection.current, { opacity: 1, duration: 2 })
            .from(targetSection.current.querySelectorAll('.seq'), { opacity: 0, duration: 0.5, stagger: 0.5 }, '<');

        return () => typed.destroy();
    }, [typedEl, targetSection]);

    return (
        <section className='w-full flex md:items-center py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen relative' id={MENULINKS[0].ref} ref={targetSection} style={{opacity: 0}}>
            <style global jsx>
                {`
                .typed-cursor {
                    font-size: 2rem;
                }`}
            </style>
            <div className='font-medium flex flex-col gap-5 pt-40 md:pt-0 select-none'>
                <div>
                    <p className='text-4xl seq'>Hello 👋🏻</p>
                    <h1 className='text-3xl seq'>I am Ayush Singh</h1>
                </div>
                <p>
                    <span className='text-xl sm:text-2xl md:text-4xl seq' ref={typedEl}></span>
                </p>
                <div className='flex md:gap-4 sm:gap-3 gap-2 seq'>
                    {Object.keys(SOCIAL_LINKS).map(el => <a href={SOCIAL_LINKS[el]} key={el} className='link hover:opacity-80 duration-300' rel='noreferrer' target='_blank'>
                        <Image src={`/social/${el}.svg`} alt={el} width={40} height={40} />
                    </a>
                    )}
                </div>
                <div className='flex gap-5 seq'>
                    <Button type='outline' name='Resume' newTab={true} href='/Ayush_Resume.pdf'></Button>
                    <Button type='primary' name={`Let's Talk`} href={'mailto:' + EMAIL}></Button>
                </div>
            </div>
            <div className='absolute hero-bg right-0 bottom-0 -z-1 md:w-3/4 w-full' style={{ maxHeight: '650px' }}>
                <Image src='/hero-bg.svg' alt='Illustration' width={1021} height={650} />
            </div>
        </section>
    )
}

export default Hero;