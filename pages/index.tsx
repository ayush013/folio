import { METADATA } from '../constants'
import Head from 'next/head'
import { useEffect, useState } from 'react';

import Layout from '@/components/common/layout'
import Header from '@/components/common/header'
import Menu from '@/components/common/menu'
import ProgressIndicator from '@/components/common/progress-indicator'
import Cursor from '@/components/common/cursor'
import Hero from '@/components/home/hero';
import Projects from '@/components/home/projects';
import Quote from '@/components/home/quote';
import Skills from '@/components/home/skills';
import Collaboration from '@/components/home/collaboration';
import Footer from '@/components/common/footer';
import Timeline from '@/components/home/timeline';
import Scripts from '@/components/common/scripts';

export default function Home() {

  const [isDesktop, setisDesktop] = useState(true);
  const [clientHeight, setHeight] = useState(0);

  useEffect(() => {
    const result = (typeof window.orientation === 'undefined') && (navigator.userAgent.indexOf('IEMobile') === -1);
    window.history.scrollRestoration = 'manual';

    setisDesktop(result);
    setHeight(window.innerHeight);

  }, [isDesktop, clientHeight]);

  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
      </Head>
      <Layout>
        <Header>
          <Menu></Menu>
        </Header>
        <ProgressIndicator></ProgressIndicator>
        <Cursor isDesktop={isDesktop}></Cursor>
        <main className='flex-col flex gap-y-28'>
          <div className='fixed top-0 left-0 h-screen w-screen bg-gray-900 -z-1'></div>
          <Hero></Hero>
          <Projects isDesktop={isDesktop} clientHeight={clientHeight}></Projects>
          <Quote clientHeight={clientHeight}></Quote>
          <Skills></Skills>
          <Timeline isDesktop={isDesktop}></Timeline>
          <Collaboration clientHeight={clientHeight}></Collaboration>
          <Footer></Footer>
        </main>
        <Scripts></Scripts>
      </Layout>
    </>
  )
}
