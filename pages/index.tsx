import { METADATA } from '../constants'
import Head from 'next/head'
import Layout from '@/components/layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
      </Head>
      <Layout>

      </Layout>
    </>
  )
}
