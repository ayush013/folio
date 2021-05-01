import { METADATA } from '../constants'
import Head from 'next/head'
import { useEffect } from 'react';

import Layout from '@/components/common/layout'
import Header from '@/components/common/header'
import Menu from '@/components/common/menu'
import ProgressIndicator from '@/components/common/progress-indicator'
import Cursor from '@/components/common/cursor'

let isDesktop;

export default function Home() {

  useEffect(() => {
     isDesktop = (typeof window.orientation === 'undefined') && (navigator.userAgent.indexOf('IEMobile') === -1);
  }, [isDesktop]);

  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
      </Head>
      <Layout>
        <ProgressIndicator></ProgressIndicator>
        <Header>
          <Menu></Menu>
        </Header>
        <Cursor isDesktop></Cursor>
        <section className='min-h-screen'></section>
        <section className='min-h-screen'></section>
        <section className='min-h-screen'></section>
        <section className='min-h-screen'></section>
        <section className='min-h-screen'></section>
      </Layout>
    </>
  )
}
