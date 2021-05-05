export const METADATA = {
    title: 'Portfolio | Ayush Singh',
    description: 'I bridge the gap between design and development. I take responsibility to craft an aesthetic user experience using modern frontend architecture.',
    siteUrl: 'https://ayushsingh.net/'
}

export const MENULINKS = [
    {
        name: 'Home',
        ref: 'home'
    },
    {
        name: 'Works',
        ref: 'works'
    },
    {
        name: 'Skills',
        ref: 'skills'
    },
    {
        name: 'Timeline',
        ref: 'timeline'
    },
    {
        name: 'Contact',
        ref: 'contact'
    }
]

export const TYPED_STRINGS = [
    'I design and develop things',
    'I develop modern frontend apps',
    'I design dynamic user experience',
    'I design and develop motion'
]

export const EMAIL = 'ayush.singh.xda@gmail.com'

export const SOCIAL_LINKS = {
    linkedin: 'https://www.linkedin.com/in/alphaayush/',
    github: 'https://github.com/ayush013',
    medium: 'https://alphaayush.medium.com/',
    instagram: 'https://www.instagram.com/alphaayush/',
    facebook: 'https://www.facebook.com/ayush013',
    twitter: 'https://twitter.com/ayush013',
    dribbble: 'https://dribbble.com/alphaayush',
    behance: 'https://www.behance.net/alphaayush/',
}

export const PROJECTS = [
    {
        name: 'DLT Labs Website',
        image: '/projects/dlt-website.jpg',
        description: 'Built the application from zero to production 🚀',
        gradient: ['#245B57', '#004741'],
        url: 'https://www.dltlabs.com/',
        tech: ['figma', 'angular', 'gsap']
    },
    {
        name: 'DL Unify',
        image: '/projects/dl-unify.jpg',
        description: 'Built the application from zero to production 🚀',
        gradient: ['#003052', '#167187'],
        url: 'https://dlunify.dltlabs.com/',
        tech: ['tailwind', 'angular', 'gsap', 'figma']
    },
    {
        name: 'ngx-quill-upload',
        image: '/projects/ngx-quill-upload.jpg',
        description: 'NPM Package for Quill JS uploads from Angular',
        gradient: ['#3A0000', '#771E1E'],
        url: 'https://www.npmjs.com/package/ngx-quill-upload',
        tech: ['npm', 'angular', 'typescript']
    },
    {
        name: 'Huminos website',
        image: '/projects/huminos.jpg',
        description: 'Redesigned and developed the website from scratch',
        gradient: ['#17007B', '#3A2C79'],
        url: 'https://www.huminos.com/',
        tech: ['javascript', 'sass', 'svg', 'gulp']
    },
    {
        name: 'DL Orchestrator',
        image: '/projects/orchestrator.jpg',
        description: 'Contributed to design and development of the platform',
        gradient: ['#00765F', '#238975'],
        url: 'http://orchestrator.dltlabs.com/',
        tech: ['angular', 'sass', 'figma']
    },
    {
        name: 'Alpha Aesthetics',
        image: '/projects/alpha.jpg',
        description: 'Designed and developed the platform',
        gradient: ['#172839', '#334659'],
        url: 'https://alpha-aesthetics.ayushsingh.net/',
        tech: ['illustrator', 'javascript', 'angular']
    },
    {
        name: 'DL Gateway',
        image: '/projects/gateway.jpg',
        description: 'Contributed to design and development of the platform',
        gradient: ['#1C776F', '#13534D'],
        url: 'https://dlgateway.dltlabs.com/',
        tech: ['angular', 'sass', 'figma']
    },
    {
        name: 'Amantrya - Polling Web App',
        image: '/projects/farewell18.jpg',
        description: 'Dark mode dated from 2017 🔥',
        gradient: ['#142D46', '#2E4964'],
        url: 'https://farewell18.ayushsingh.net/',
        tech: ['javascript', 'html', 'css']
    },
    {
        name: 'AKGEC - College Website',
        image: '/projects/akgec.jpg',
        description: 'Contributed in overall design and development',
        gradient: ['#5E4C06', '#746528'],
        url: 'https://www.akgec.ac.in/',
        tech: ['javascript', 'html', 'css']
    },
    {
        name: 'BDC 2018 Web Portal',
        image: '/projects/bdc18.jpg',
        description: 'Built the portal from zero to production 🚀',
        gradient: ['#470700', '#712A23'],
        url: 'https://bdc2018.ayushsingh.net/',
        tech: ['javascript', 'html', 'css']
    },
    {
        name: 'Scrolls 2017 - Website',
        image: '/projects/scrolls.jpg',
        description: 'Built the portal from zero to production 🚀',
        gradient: ['#685506', '#7B6921'],
        url: 'https://scrolls-17.ayushsingh.net/',
        tech: ['angular', 'html', 'css']
    },
    {
        name: 'Cardize - Visiting Cards',
        image: '/projects/cardize.jpg',
        description: 'First web project! Custom visiting card generator',
        gradient: ['#552A04', '#614023'],
        url: 'https://cardize.ayushsingh.net/',
        tech: ['javascript', 'html', 'css']
    }
]

export const SKILLS = {
    frontend: ['javascript', 'angular', 'next', 'react', 'gsap', 'tailwind', 'sass', 'svg', 'html', 'css'],
    userInterface: ['figma', 'sketch', 'illustrator', 'photoshop'],
    other: ['git', 'webpack', 'gulp', 'lightroom', 'aftereffects']
}

export const TIMELINE: TimelineNode[] = [
    {
        content: '2020',
        branch: 1,
        type: 'year'
    },
    {
        content: {
            title: 'UI Engineer (freelance)',
            description: 'Building solutions for employee engagement, productivity and performance 🎯',
            logo: 'huminos'
        },
        branch: 2,
        type: 'checkpoint',
        diverge: true
    },
    {
        content: {
            title: 'Motion Graphics (freelance)',
            description: 'Motion Graphics content for Product Launch 🚀',
            logo: 'octanner'
        },
        branch: 2,
        type: 'checkpoint',
        converge: true
    },
    {
        content: '2019',
        branch: 1,
        type: 'year'
    },
    {
        content: {
            title: 'UI Engineer',
            description: 'Working on enterprise blockchain solutions for web. Transforming UI/UX and frontend framework. Building a design system.',
            logo: 'dltlabs'
        },
        branch: 1,
        type: 'checkpoint'
    },
    {
        content: {
            title: 'UX Engineer (freelance)',
            description: 'Product design and development for employee engagement chatbot suite for workplace by facebook',
            logo: 'huminos'
        },
        branch: 1,
        type: 'checkpoint'
    },
    {
        content: {
            title: 'Graduated from College 🎓',
            description: 'Spent 4 years laying the foundation of Frontend Engineering, UI/UX, and Fitness!',
            logo: 'akgec'
        },
        branch: 1,
        type: 'checkpoint'
    },
    {
        content: '2018',
        branch: 1,
        type: 'year',
    },
    {
        content: {
            title: 'Student lead at SDC-SI',
            description: 'Represented a team of 39 talented developers. Served different roles of leadership, project management and delivery.',
            logo: 'si'
        },
        branch: 1,
        type: 'checkpoint',
        diverge: true
    },
    {
        content: {
            title: 'Lecture on SVG animations',
            description: 'Guided 200 students to create their first animated SVG using CSS/SMIL at PHP Workshop, SDC-SI'
        },
        branch: 1,
        type: 'checkpoint',
        parallel: 2
    },
    {
        content: '2017',
        branch: 2,
        type: 'year'
    },
    {
        content: {
            title: '1st position in Web Designing, IMSU',
            description: 'Competed against 20+ teams for design and development of web project from scratch'
        },
        branch: 2,
        type: 'checkpoint',
        parallel: 1
    },
    {
        content: {
            title: 'Lecture on Javascript',
            description: 'Guided 200 students for javascript fundamentals at Game Development workshop, SDC-SI'
        },
        branch: 1,
        type: 'checkpoint',
        parallel: 2
    },
    {
        content: {
            title: '1st position in Web Design, ABES ACM',
            description: 'Competed in web and graphic design challenge with 100+ participants.'
        },
        branch: 2,
        type: 'checkpoint',
        parallel: 1
    },
    {
        content: {
            title: 'Lecture on Web Technologies',
            description: 'Guided 300+ students on getting started with web technologies like HTML/CSS and JS'
        },
        branch: 1,
        type: 'checkpoint',
        parallel: 2
    },
    {
        content: '2016',
        branch: 2,
        type: 'year'
    },
    {
        content: {
            title: '1st position in Web Designing, IMSU',
            description: 'Secured 1st prize in Web design challenge against 50+ teams'
        },
        branch: 2,
        type: 'checkpoint',
        converge: true
    },
    {
        content: '',
        branch: 1,
        type: 'year'
    },
    {
        content: {
            title: 'UI/UX, Frontend Engineer',
            description: 'Started journey in SDC-SI, where I worked on 10+ web projects. Learnt the fundamentals of Frontend, UI/UX,  Graphic design and more...',
            logo: 'si'
        },
        branch: 1,
        type: 'checkpoint'
    },
    {
        content: '2014',
        branch: 1,
        type: 'year'
    },
    {
        content: {
            title: 'Recognized Themer',
            description: 'Awarded as recognized themer,  Developed themes and ROMs for Xperia 2011 devices lineup with over 15k+ downloads. Featured on xda portal twice.',
            logo: 'xda'
        
        },
        branch: 1,
        type: 'checkpoint'
    }
]

export interface TimelineNode {
    content: string | TimelineContent,
    branch: 1 | 2,
    type: 'year' | 'checkpoint',
    converge?: boolean,
    diverge?: boolean,
    parallel?: 1 | 2
}

export interface TimelineContent {
    title: string,
    description: string,
    logo?: string
}