import { TYPED_STRINGS } from "../../constants";
import { MutableRefObject, useEffect, useRef } from "react";
import Typed from 'typed.js';

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
        <section className='w-full flex items-center py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen'>
            <div className='font-medium flex flex-col gap-5'>
                <div>
                    <p className='text-4xl'>Hello 👋🏻</p>
                    <h1 className='text-3xl'>I am Ayush Singh</h1>
                </div>

                <p>
                    <span className="text-4xl" ref={typedEl}></span>
                </p>
                <style global jsx>
                    {`
                    .typed-cursor {
                        font-size: 2rem;
                    }`}
                </style>
            </div>
        </section>
    )
}

export default Hero;