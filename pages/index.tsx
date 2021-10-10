import { METADATA } from "../constants";
import Head from "next/head";
import { useEffect, useState } from "react";

import Layout from "@/components/common/layout";
import Header from "@/components/common/header";
import Menu from "@/components/common/menu";
import ProgressIndicator from "@/components/common/progress-indicator";
import Cursor from "@/components/common/cursor";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import Quote from "@/components/home/quote";
import Skills from "@/components/home/skills";
import Collaboration from "@/components/home/collaboration";
import Footer from "@/components/common/footer";
import Timeline from "@/components/home/timeline";
import Scripts from "@/components/common/scripts";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import About from "@/components/home/about";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  const [isDesktop, setisDesktop] = useState(true);
  const [clientHeight, setHeight] = useState(0);

  useEffect(() => {
    let timer = null;
    const callback = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const result =
          typeof window.orientation === "undefined" &&
          navigator.userAgent.indexOf("IEMobile") === -1;
        window.history.scrollRestoration = "manual";
        setisDesktop(result);
        setHeight(window.innerHeight);
      }, 100);
    };

    callback();

    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
      </Head>
      <Layout>
        <Header>
          <Menu />
        </Header>
        <ProgressIndicator />
        <Cursor isDesktop={isDesktop} />
        <main className="flex-col flex">
          <div className="fixed top-0 left-0 h-screen w-screen bg-gray-900 -z-1"></div>
          <Hero />
          <About clientHeight={clientHeight} />
          <Projects clientHeight={clientHeight} />
          <Quote clientHeight={clientHeight} />
          <Skills />
          <Timeline isDesktop={isDesktop} />
          <Collaboration clientHeight={clientHeight} />
          <Footer />
        </main>
        <Scripts />
      </Layout>
    </>
  );
}
