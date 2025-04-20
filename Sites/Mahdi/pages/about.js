import AboutSection from '@/components/AboutSection'
import Head from 'next/head'
import React from 'react'

const about = () => {
    return (
        <>
            <Head>
                <title>About Us | ROBO Superior</title>
                <meta name="description" content="ROBO Superior is a leading organization in Bangladesh dedicated to advancing robotics, mechatronics, and electrical project management through comprehensive educational programs and initiatives. Our team, Team EXO MAX, achieved 5th place in the NASA Conrad Challenge 2024." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="About Us | ROBO Superior" />
                <meta property="og:description" content="ROBO Superior is a leading organization in Bangladesh committed to advancing robotics and mechatronics through educational programs and initiatives. Our notable achievement includes Team EXO MAX securing 5th place in the NASA Conrad Challenge 2024." />
                <meta property="og:image" content="/img/about.png" />
                <meta property="og:url" content={`${process.env.SITE_URL}/about`} />
                <meta property="og:type" content="website" />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Us | ROBO Superior" />
                <meta name="twitter:description" content="ROBO Superior is a leading organization in Bangladesh dedicated to advancing robotics and mechatronics. Our team, Team EXO MAX, achieved 5th place in the NASA Conrad Challenge 2024." />
                <meta name="twitter:image" content="/img/about.png" />
                <meta name="twitter:site" content="@yourtwitterhandle" />
            </Head>

            <AboutSection />
        </>
    )
}

export default about
