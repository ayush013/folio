// Copyright Ayush Singh 2021,2022. All Rights Reserved.
// Project: folio
// Author contact: https://www.linkedin.com/in/alphaayush/
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Head from "next/head";
import { METADATA } from "../../constants";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content={METADATA.description} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={METADATA.title} />
        <meta property="og:description" content={METADATA.description} />
        <meta property="og:url" content={METADATA.siteUrl} />
        <meta property="og:site_name" content={METADATA.title} />
        <meta
          property="og:image"
          content="https://www.ayushsingh.net/preview.jpg"
        />
        <meta property="og:image:secure_url" content={METADATA.siteUrl} />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="800" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
