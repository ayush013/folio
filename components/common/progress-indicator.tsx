import { MutableRefObject, useEffect, useRef } from 'react';

const ProgressIndicator = () => {

    const progress: MutableRefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progress.current ? progress.current.style.width = scrolled + '%' : '';
        })
    }, [progress]);

    return (
        <div className='progress w-full fixed top-0 z-50'>
            <div className='progress-bar' ref={progress}></div>
        </div>
    )
}

export default ProgressIndicator;