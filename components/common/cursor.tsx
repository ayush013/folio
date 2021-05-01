import styles from './Cursor.module.scss';
import { MutableRefObject, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Cursor = ({ isDesktop }) => {
    const cursor: MutableRefObject<HTMLDivElement> = useRef(null);
    const follower: MutableRefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        if (isDesktop) {

            let posX = 0;
            let posY = 0;

            let mouseX = 0;
            let mouseY = 0;

            gsap.to({}, {
                repeat: -1,
                duration: 0.005,
                onRepeat: function () {
                    posX += (mouseX - posX) / 9;
                    posY += (mouseY - posY) / 9;

                    gsap.set(follower.current, {
                        css: {
                            left: posX - 12,
                            top: posY - 12
                        }
                    });

                    gsap.set(cursor.current, {
                        css: {
                            left: mouseX,
                            top: mouseY
                        }
                    });
                }
            });

            document.addEventListener('mousemove', e => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            })


            document.querySelectorAll('.link').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.current.classList.add(styles.cursorActive);
                    follower.current.classList.add(styles.followerActive);
                });
                el.addEventListener('mouseleave', () => {
                    cursor.current.classList.remove(styles.cursorActive);
                    follower.current.classList.remove(styles.followerActive);
                });
            });

        } else {
            follower.current.classList.add('hidden');
            cursor.current.classList.add('hidden');
        }

    }, [cursor, follower])

    return (
        <>
            <div ref={cursor} className={styles.cursor + ' fixed bg-white w-4 h-4 select-none pointer-events-none z-50'}></div>
            <div ref={follower} className={styles.cursorFollower + ' fixed h-8 w-8 select-none pointer-events-none z-50'}></div>
        </>
    )
}

export default Cursor;