import { MENULINKS, SKILLS } from '../../constants';
import Image from 'next/image';

const Skills = () => {
    return (
        <section className='w-full relative select-none min-h-screen 2xl:container mx-auto py-8  xl:px-20 md:px-12 px-4' id={MENULINKS[2].ref}>
            <div className='flex flex-col justify-center gap-y-8'>
                <div className='flex flex-col gap-2'>
                    <p className='uppercase tracking-widest text-gray-200 text-sm'>SKILLS</p>
                    <h1 className='text-5xl font-bold text-gradient'>My Skills</h1>
                    <h2 className='text-2xl md:max-w-2xl w-full'>I like to take responsibility to craft aesthetic user experience using modern frontend architecture. </h2>
                </div>
                <div>
                    <h3 className='uppercase tracking-widest text-gray-200 text-sm mb-6'>FRONTEND DEVELOPMENT</h3>
                    <div className='flex gap-5 flex-wrap'>
                        {SKILLS.frontend.map(skill => <Image key={skill} src={`/skills/${skill}.svg`} alt={skill} width={60} height={60} />)}
                    </div>
                </div>
                <div className='flex gap-10 flex-wrap'>
                    <div>
                        <h3 className='uppercase tracking-widest text-gray-200 text-sm mb-6'>User Interface, User Experience Design</h3>
                        <div className='flex gap-5 flex-wrap'>
                            {SKILLS.userInterface.map(skill => <Image key={skill} src={`/skills/${skill}.svg`} alt={skill} width={60} height={60} />)}
                        </div>
                    </div>
                    <div>
                        <h3 className='uppercase tracking-widest text-gray-200 text-sm mb-6'>Other Skills</h3>
                        <div className='flex gap-5 flex-wrap'>
                            {SKILLS.other.map(skill => <Image key={skill} src={`/skills/${skill}.svg`} alt={skill} width={60} height={60} />)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills;