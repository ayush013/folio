import { METADATA } from '../constants'
import Head from 'next/head'
import Layout from '@/components/layout'
import Header from '@/components/header'

export default function Home() {
  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
      </Head>
      <Layout>
        <Header />
      </Layout>
    </>
  )
}
