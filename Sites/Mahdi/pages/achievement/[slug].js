import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Head from "next/head";
import { useState } from "react";
import Comments from "@/components/Comments";
import RightPortfolioInfo from "@/components/RightPortfolioInfo";
import { RightTopicSection } from "@/components/RightTopicSection";
import Script from "next/script";

function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
        return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
}

const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    if (inline) {
        return <code>{children}</code>;
    } else if (match) {
        return (
            <div style={{ position: "relative" }}>
                <SyntaxHighlighter
                    style={a11yDark}
                    language={match[1]}
                    PreTag="pre"
                    {...props}
                    codeTagProps={{
                        style: {
                            padding: "0",
                            borderRadius: "5px",
                            overflowX: "auto",
                            whiteSpace: "pre-wrap",
                        },
                    }}
                >
                    {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
                <button
                    style={{
                        position: "absolute",
                        top: "0",
                        borderRadius: ".6rem",
                        right: "0",
                        zIndex: "1",
                        background: "#3d3d3d",
                        color: "#fff",
                        padding: "10px",
                    }}
                    onClick={handleCopy}
                >
                    {copied ? "Copied!" : "Copy code"}
                </button>
            </div>
        );
    } else {
        return (
            <code className="md-post-code" {...props}>
                {children}
            </code>
        );
    }
};

export default function BlogPage({ blog }) {
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
                <title>{blog.title ? `${blog.title} | Robo Superior` : "Loading..."}</title>
                <meta name="description" content={blog.metadescription || "Discover our latest robotics projects, advancements, and blog posts on RoboSuperior."} />
                <meta name="keywords" content={`${blog.keywords || "Technology, Robotics, AI, Blog, Robotics Projects"}`} />
                <meta name="author" content={blog.author || "RoboSuperior"} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Open Graph */}
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${blog.title} | Robo Superior`} />
                <meta property="og:description" content={blog.metadescription || "Explore the latest updates and innovations in robotics on Robo Superior."} />
                <meta property="og:url" content={`${process.env.SITE_URL}/achievement/${blog.slug}`} />
                <meta property="og:site_name" content="Robo Superior" />
                <meta property="og:image" content={extractFirstImageUrl(blog.description) || '/img/achithum.png'} />
                <meta property="article:published_time" content={blog.createdAt ? new Date(blog.createdAt).toISOString() : ""} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@RoboSuperior" />
                <meta name="twitter:title" content={blog.title || "Robo Superior - Blog"} />
                <meta name="twitter:description" content={blog.metadescription || "Stay up to date with the latest news and breakthroughs in robotics at Robo Superior."} />
                <meta name="twitter:image" content={extractFirstImageUrl(blog.description) || '/img/achithum.png'} />

                {/* Canonical URL */}
                <link rel="canonical" href={`${process.env.SITE_URL}/achievement/${blog.slug}`} />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {`{
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${process.env.SITE_URL}/achievement/${blog.slug}"
                        },
                        "headline": "${blog.title}",
                        "description": "${blog.metadescription}",
                        "image": "${extractFirstImageUrl(blog.description) || '/img/achithum.png'}",
                        "author": {
                            "@type": "Organization",
                            "name": "Robo Superior"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Robo Superior",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "/logo.png"
                            }
                        },
                        "datePublished": "${blog.createdAt ? new Date(blog.createdAt).toISOString() : ""}"
                    }`}
                </script>
            </Head>

            <div className="slugpage">
                <div className="container">
                    <div className="topslug_titles" data-aos="fade-right">
                        <h1 className="slugtitle">{blog.title}</h1>
                        <h5>
                            By <span>RoboSuperior</span>・ Published in{" "}
                            <span>{blog.blogcategory}</span> ・{" "}
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                            <span>・ 1 min read</span>
                        </h5>
                    </div>

                    <div className="flex flex-sb flex-left pb-5 flex-wrap">
                        <div className="leftblog_data_markdown" data-aos="fade-up">
                            <div className="w-100 blogcontent">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: Code,
                                    }}
                                >
                                    {blog.description}
                                </ReactMarkdown>
                            </div>
                            <Comments slug={blog.slug} />
                        </div>
                        <div className="rightslug_data">
                            <RightPortfolioInfo />
                            {/* adsterra native banner ad  */}
                            <div id="container-ce15f12e9d1b6592798b163f7a7b3f15"></div>
                            <RightTopicSection />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    const { req } = context;
    const baseUrl = req ? `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}` : "";

    const res = await fetch(
        `${baseUrl}/api/getachievement?slug=${slug}`
    );
    const data = await res.json();

    if (!data || data.length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            blog: data[0], // Pass the first blog matching the slug
        },
    };
}
