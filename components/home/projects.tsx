import { MENULINKS, PROJECTS } from '../../constants';
import ProjectTile from '../common/project-tile'

const Projects = () => {
    return (
        <section className='w-full py-8 flex-col flex gap-y-20 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen relative select-none' id={MENULINKS[1].ref}>
            <div className='flex flex-col gap-2'>
                <p className='uppercase tracking-widest text-gray-200 text-sm'>PROJECTS</p>
                <h1 className='text-5xl font-bold text-gradient'>My Works</h1>
                <h2 className='text-2xl md:w-3/5 w-full'>I have contributed in over 20+ projects ranging from Frontend Development, UI/UX, Open Source, and Motion Graphics</h2>
            </div>
            <div className='flex gap-x-16'>
                {PROJECTS.map(project => <ProjectTile project={project} key={project.name}></ProjectTile> )}
            </div>
        </section>
    )
}

export default Projects;