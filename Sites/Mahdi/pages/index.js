import Head from "next/head";
import Link from "next/link";
import Services from "@/components/Services";
import Additionalinfo from "@/components/Additionalinfo";
import Pricing from "@/components/Pricing";
import Advisor from "@/components/Advisor";
import Image from "next/image";
import Typed from 'typed.js';
import { useEffect, useRef } from "react";

export default function Home() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Problem Solving', 'Exploring science', 'Innovation'],
      loop: true,
      loopCount: Infinity,
      typeSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <title>RoboSuperior - Innovative Team from Bangladesh</title>
        <meta name="description" content="RoboSuperior: A passionate team from Bangladesh solving challenges with innovative solutions. Learn more about our projects and get in touch!" />
        <meta name="keywords" content="RoboSuperior, Bangladesh, innovation, technology, team, projects, contact, challenges, AI, machine learning, robotics, software development" />
        <meta name="author" content="RoboSuperior Team" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="rating" content="General" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="RoboSuperior - Innovative Team from Bangladesh" />
        <meta property="og:description" content="Discover the projects of RoboSuperior, a team from Bangladesh passionate about tackling challenges with innovative solutions." />
        <meta property="og:image" content="/img/Coder.png" />
        <meta property="og:url" content={process.env.SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RoboSuperior" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RoboSuperior - Innovative Team from Bangladesh" />
        <meta name="twitter:description" content="Join RoboSuperior, a team from Bangladesh, in solving real-world problems with cutting-edge technology." />
        <meta name="twitter:image" content="/img/Coder.png" />
        <meta name="twitter:image:alt" content="RoboSuperior logo" />
        <meta name="twitter:site" content="@RoboSuperior" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="overflow-hidden header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info" data-aos="fade-right">
            <h1>Hi, This is <span>RoboSuperior</span>.<br /> A team from Bangladesh</h1>
            <h3>We are passionate about <br className="hidden max-[680px]:block"/> <span ref={el} /></h3>
            <div className="flex gap-2">
              <Link href='/contact'><button>Contact Us</button></Link>
              <Link href='/about'><button>About Us</button></Link>
              <Link href='/members'><button>Members</button></Link>
            </div>
          </div>
          <div className="rightheader_img" data-aos="zoom-in">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <Image src="/img/Coder.png" alt="Coder working on a project" height="100" width="100" />
          </div>
        </div>
        <Additionalinfo />
        <Services />
        {/* <Pricing /> */}
        <Advisor />
      </section>
    </>
  );
}
