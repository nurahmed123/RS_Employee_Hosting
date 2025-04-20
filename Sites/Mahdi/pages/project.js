import Head from "next/head";
import Link from "next/link";
import GalleryView from "@/components/GalleryView";
import { useState } from "react";
import Image from "next/image";
import Script from "next/script";

function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
        return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
}

export default function Blog({ blogs }) {
    const LogoImage = `https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/37b0a981-7d1e-4c79-ae16-47d31e4be6fa.png`;
    const [displayedBlogs, setDisplayedBlogs] = useState(blogs.slice(0, 5));
    const [currentCount, setCurrentCount] = useState(5);
    const perPage = 5;

    const loadMoreBlogs = () => {
        const nextCount = currentCount + perPage;
        setDisplayedBlogs((prev) => [...prev, ...blogs.slice(currentCount, nextCount)]);
        setCurrentCount(nextCount);
    };

    return (
        <>
            {/* Adsterra Ad JSScript */}
            <Script
                id="adsterra-ad"
                strategy="lazyOnload"
                data-cfasync="false"
                src="//pl25948868.effectiveratecpm.com/ce15f12e9d1b6592798b163f7a7b3f15/invoke.js"
            />

            <Head>
                <title>Our Projects | RoboSuperior - Robotics & Innovation</title>
                <meta
                    name="description"
                    content="Explore RoboSuperior's innovative robotics projects, technology milestones, and recent achievements. Learn about our groundbreaking work in education and automation."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Our Projects | RoboSuperior" />
                <meta
                    property="og:description"
                    content="Explore RoboSuperior's innovative projects and groundbreaking work in robotics, automation, and education. Stay up to date with our latest technological advancements."
                />
                <meta property="og:url" content={`${process.env.SITE_URL}/projects`} />
                <meta property="og:image" content='/img/projectthum.png' />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Our Projects | RoboSuperior" />
                <meta
                    name="twitter:description"
                    content="Explore RoboSuperior's latest robotics and automation projects. Learn how our innovative technologies are shaping the future."
                />
                <meta name="twitter:image" content='/img/projectthum.png' />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "RoboSuperior",
                            "url": `${process.env.SITE_URL}/projects`,
                            "logo": "/img/logo.png",
                            "description": "RoboSuperior is a leading innovation hub in robotics, education, and automation technology.",
                            "mainEntityOfPage": `${process.env.SITE_URL}/projects`,
                            "image": "/img/default-image.png",
                            "author": {
                                "@type": "Organization",
                                "name": "RoboSuperior",
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "RoboSuperior",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "/img/logo.png",
                                },
                            },
                            "datePublished": new Date().toISOString(),
                            "dateModified": new Date().toISOString(),
                        }),
                    }}
                />
            </Head>


            <GalleryView
                img4text=""
                img4url={"https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/bd42147f-7422-4e22-aed3-e776b4bdb41a.jpg"}
                img3text=""
                img3url="https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/2649a9c6-650c-43a6-97a5-778f4d2eb311.jpg"
                img2text=""
                img2url="https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/3ce0adca-5524-4264-a45e-5faf773f816a.webp"
                img1text=""
                img1url="https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/ca2916b5-4164-46e2-aae1-8144c135c976.jpg"
                headline="Our Projects"
                description="....."
            />
            <section className="main_blog_section">
                <div className="container flex flex-sb flex-left flex-wrap">
                    <div className="leftblog_sec">
                        <h2>Recently Published</h2>
                        <div className="blogs_sec">
                            {displayedBlogs.map((blog) => {
                                const firstImageUrl = extractFirstImageUrl(blog.description);
                                return (
                                    <div className="blog" key={blog._id}>
                                        <div className="blogimg">
                                            <Link href={`/project/${blog.slug}`}>
                                                <Image
                                                    src={firstImageUrl || "/img/noimage.jpg"}
                                                    alt={`Image for ${blog.title} - RoboSuperior Robotics Project`}
                                                    className="transition-transform hover:scale-105 duration-300 ease-in-out"
                                                    width={300}
                                                    height={200}
                                                />
                                            </Link>
                                        </div>
                                        <div className="bloginfo">
                                            <Link href={`/tag/${blog.tags[0]}`}>
                                                <div className="blogtag">{blog.tags[0]}</div>
                                            </Link>
                                            <Link href={`/project/${blog.slug}`}>
                                                <h3>{blog.title}</h3>
                                            </Link>
                                            <p>{blog.metadescription}</p>
                                            <div className="blogauthor flex gap-1">
                                                <div className="blogaimg">
                                                    <img src={LogoImage} alt="author" />
                                                </div>
                                                <div className="flex flex-col flex-left gap-05">
                                                    <h4>RoboSuperior</h4>
                                                    <span>
                                                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                                            month: "long",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="blogpagination flex justify-center mt-4">
                            {currentCount < blogs.length && (
                                <button onClick={loadMoreBlogs}>
                                    Load More
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="rightblog_info">
                        {/* Add your Topics and Tags Section */}
                        {/* adsterra native banner ad  */}
                        <div id="container-ce15f12e9d1b6592798b163f7a7b3f15"></div>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const baseUrl = req ? `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}` : "";

    const res = await fetch(`${baseUrl}/api/getproject`);
    const data = await res.json();

    // Filter blogs to only include published ones
    const publishedBlogs = data.filter((blog) => blog.status === "publish");

    return {
        props: {
            blogs: publishedBlogs,
        },
    };
}
