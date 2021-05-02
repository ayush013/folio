import { EMAIL, MENULINKS, SOCIAL_LINKS } from '../../constants';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from './button';

const Footer = () => {

    const [height, setheight] = useState(0);

    useEffect(() => {
        setheight(window.innerWidth * 0.4);
    }, [height])


    return (
        <footer className='w-full relative select-none bg-cover bg-bottom' id={MENULINKS[4].ref} style={{ height, backgroundImage: `url(/footer.svg)` }}>
            <div className='2xl:container mx-auto xl:px-20 md:px-12 px-4 flex-col flex h-full justify-end gap-y-8 z-10 items-center py-12'>
                <h1 className='font-medium tracking-wide text-4xl text-center'>I’m looking for challenges! Feel free to Contact.</h1>
                <div className='flex gap-4'>
                    {Object.keys(SOCIAL_LINKS).map(el => <a href={SOCIAL_LINKS[el]} key={el} className='link hover:opacity-80 duration-300' rel='noreferrer' target='_blank'>
                        <Image src={`/social/${el}.svg`} alt={el} width={40} height={40} />
                    </a>
                    )}
                </div>
                <div className='flex gap-5'>
                    <Button type='outline' name='Resume' newTab={true} href='/Ayush_Resume.pdf'></Button>
                    <Button type='white' name={`Let's Talk`} href={'mailto:' + EMAIL}></Button>
                </div>
                <p className='text-center'>Designed and Developed with ❤️ by Ayush</p>
            </div>
        </footer>
    )
}

export default Footer;