import { EMAIL, MENULINKS, SOCIAL_LINKS, TYPED_STRINGS } from '../../constants';
import { MutableRefObject, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import Image from 'next/image';
import Button from '../common/button';

const Hero = () => {

    const typedEl: MutableRefObject<HTMLSpanElement> = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedEl.current, {
            strings: TYPED_STRINGS,
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 8000,
            loop: true
        });

        return () => typed.destroy();
    }, [typedEl]);

    return (
        <section className='w-full flex md:items-center py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen relative' id={MENULINKS[0].ref}>
            <style global jsx>
                {`
                .typed-cursor {
                    font-size: 2rem;
                }`}
            </style>
            <div className='font-medium flex flex-col gap-5 pt-40 md:pt-0 select-none'>
                <div>
                    <p className='text-4xl'>Hello 👋🏻</p>
                    <h1 className='text-3xl'>I am Ayush Singh</h1>
                </div>
                <p>
                    <span className='text-4xl' ref={typedEl}></span>
                </p>
                <div className='flex gap-4'>
                    {Object.keys(SOCIAL_LINKS).map(el => <a href={SOCIAL_LINKS[el]} key={el} className='link hover:opacity-80 duration-300' rel='noreferrer' target='_blank'>
                        <Image src={`/social/${el}.svg`} alt={el} width={40} height={40} />
                    </a>
                    )}
                </div>
                <div className='flex gap-5'>
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