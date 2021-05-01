import { useEffect } from 'react';

const ProgressIndicator = () => {

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById('progress').style.width = scrolled + '%';
        })
    });

    return (
        <div className='progress scroll-indicator w-full fixed top-0 z-50'>
            <div className='progress-bar' id='progress'></div>
        </div>
    )
}

export default ProgressIndicator;