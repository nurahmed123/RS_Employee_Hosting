import Head from "next/head";
import Link from "next/link";
import { FaHtml5, FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { useState } from "react";
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
                <title>Blogs | RoboSuperior</title>
                <meta
                    name="description"
                    content="Discover expert programming tips, coding tutorials, and the latest tech insights at Robo Superior. Your go-to destination for mastering technology and innovation. Explore more at robosuperior.com!"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Blogs | RoboSuperior" />
                <meta
                    property="og:description"
                    content="Explore the latest accomplishments of RoboSuperior in robotics, innovation, and education. Read our achievements and progress in various competitions."
                />
                <meta property="og:url" content={`${process.env.SITE_URL}/blog`} />
                <meta property="og:image" content="/img/blog.png" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Blogs | RoboSuperior" />
                <meta
                    name="twitter:description"
                    content="Discover expert programming tips, coding tutorials, and the latest tech insights at Robo Superior. Your go-to destination for mastering technology and innovation. Explore more at robosuperior.com!"
                />
                <meta name="twitter:image" content="/img/blog.png" />

                {/* Structured Data (Schema.org) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            headline: "Our Blogs",
                            description:
                                "Explore the recent achievements of RoboSuperior in robotics, coding, and technology innovations.",
                            image: "/img/blog.png",
                            author: {
                                "@type": "Organization",
                                name: "RoboSuperior",
                            },
                            publisher: {
                                "@type": "Organization",
                                name: "RoboSuperior",
                                logo: {
                                    "@type": "ImageObject",
                                    url: "/img/logo.png",
                                },
                            },
                            datePublished: new Date().toISOString(),
                            url: `${process.env.SITE_URL}/blog`,
                        }),
                    }}
                />

            </Head>

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
                                            <Link href={`/blog/${blog.slug}`}>
                                                <img
                                                    src={firstImageUrl || "/img/noimage.jpg"}
                                                    alt="blog"
                                                    className="transition-transform hover:scale-105 duration-300 ease-in-out"
                                                />
                                            </Link>
                                        </div>
                                        <div className="bloginfo">
                                            <Link href={`/tag/${blog.tags[0]}`}>
                                                <div className="blogtag">{blog.tags[0]}</div>
                                            </Link>
                                            <Link href={`/blog/${blog.slug}`}>
                                                <h3>{blog.title}</h3>
                                            </Link>
                                            <p>{blog.metadescription.slice(0, 100)}{blog.metadescription.length > 100 && " ..."}</p>
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

    const res = await fetch(`${baseUrl}/api/getblog`);
    const data = await res.json();

    // Filter blogs to only include published ones
    const publishedBlogs = data.filter((blog) => blog.status === "publish");

    return {
        props: {
            blogs: publishedBlogs,
        },
    };
}
