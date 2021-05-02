import styles from './ProjectTile.module.scss';
import Image from 'next/image';
import { MutableRefObject, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

const ProjectTile = ({ project }) => {

    const projectCard: MutableRefObject<HTMLDivElement> = useRef(null);

    useEffect(() => {
        VanillaTilt.init(projectCard.current, {
            max: 5,
            speed: 400,
            glare: true,
            'max-glare': 0.2
        });
    }, [projectCard]);


    return (
        <a href={project.url} target='_blank' rel='noreferrer' className='link'>
            <div ref={projectCard} className={styles.ProjectTile + ' rounded-3xl relative overflow-hidden p-6 flex-col flex justify-between'} style={{ background: `linear-gradient(90deg, ${project.gradient[0]} 0%, ${project.gradient[1]} 100%)` }}>
                <Image src='/project-bg.svg' alt='Project' layout='fill' className='absolute w-full h-full top-0 left-0 opacity-20' />
                <img src={project.image} alt={project.name} className={styles.ProjectImg + ' z-0'} />
                <div className="absolute top-0 left-0 w-full h-20" style={{ background: `linear-gradient(180deg, ${project.gradient[0]} 0%, rgba(0,0,0,0) 100%)` }}></div>
                <div className="absolute bottom-0 left-0 w-full h-32" style={{ background: `linear-gradient(0deg, ${project.gradient[0]} 10%, rgba(0,0,0,0) 100%)` }}></div>
                <h1 className='text-4xl z-10'>{project.name}</h1>
                <div className={styles.techIcons + ' w-1/2 h-full absolute left-24 top-0 flex items-center'}>
                    <div className="flex flex-col gap-4 pb-8">
                        {project.tech.map((el, i) => <img className={i % 2 === 0 ? 'ml-16' : ''} src={`/projects/tech/${el}.svg`} alt={el} height={45} width={45} key={el} />)}
                    </div>
                </div>
                <h2 className='text-xl z-10 tracking-wide font-medium'>{project.description}</h2>
            </div>
        </a>
    )
}

export default ProjectTile;