import React from "react";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import useFetchData from "@/hooks/useFetchData";
import Image from "next/image";
import Link from "next/link";
import {
    FaGithub,
    FaFacebook,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import Loading from "@/components/Loading";
import Head from "next/head";

const Members = ({ members }) => {
    // List of specified departments
    const specifiedDepartments = [
        "founder",
        "executive",
        "it_dpt",
        "hardware_dpt",
        "research_dpt",
        "media_dpt",
    ];

    // Group members by specified departments
    const groupedMembers = {
        "Founders & Co-Founders": members.filter((member) => member.department === "founder"),
        "Board of Executives": members.filter((member) => member.department === "executive"),
        "IT Department": members.filter((member) => member.department === "it_dpt"),
        "Hardware Department": members.filter((member) => member.department === "hardware_dpt"),
        "Research Department": members.filter((member) => member.department === "research_dpt"),
        "Media Department": members.filter((member) => member.department === "media_dpt"),
        Others: members.filter((member) => !specifiedDepartments.includes(member.department)),
    };

    // Filter out departments with no members
    const departments = Object.entries(groupedMembers).filter(
        ([, members]) => members.length > 0
    );

    return (
        <>
            <Head>
                <title>Meet Our Team | Robo Superior</title>
                <meta name="description" content="Meet the talented team members of Robo Superior, our experts in robotics, technology, and innovation." />
                <meta name="keywords" content="team, robotics, engineering, innovation, technology" />
                <meta name="author" content="Robo Superior" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Meet Our Team | Robo Superior" />
                <meta property="og:description" content="Meet the talented team members of Robo Superior, experts in robotics and technology." />
                <meta property="og:image" content="/img/team.png" />
                <meta property="og:url" content={`${process.env.SITE_URL}/members`} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Meet Our Team | Robo Superior" />
                <meta name="twitter:description" content="Meet the talented team members of Robo Superior, experts in robotics and technology." />
                <meta name="twitter:image" content="/img/team.png" />

                {/* Canonical URL */}
                <link rel="canonical" href={`${process.env.SITE_URL}/members`} />

                {/* Structured Data (Schema.org) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            headline: "Our Members",
                            description:
                                "Explore the recent achievements of RoboSuperior in robotics, coding, and technology innovations.",
                            image: "/img/team.png",
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
                            url: `${process.env.SITE_URL}/members`,
                        }),
                    }}
                />
            </Head>

            <section className="min-h-screen dark:bg-slate-800 p-6">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
                    Meet Our Team
                </h1>
                <div className="flex flex-col gap-10">
                    {departments.map(([department, members]) => (
                        <div key={department}>
                            <div className="block !container">
                                <h2 className="text-2xl font-semibold mb-4 text-left text-gray-800 dark:text-gray-100">
                                    {department}
                                </h2>
                            </div>
                            <div data-aos="zoom-in" className="flex flex-wrap gap-6 items-center justify-start">
                                {members.reverse().map((member, index) => ( // Reverse the members array
                                    <div
                                        key={index}
                                        className="bg-gray-100 dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                width={128}
                                                height={128}
                                                className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                                            />
                                            <div className="w-fit transition-all transform duration-500">
                                                <h1 className="text-gray-600 dark:text-gray-200 font-bold">
                                                    {member.name}
                                                </h1>
                                                <p className="text-gray-400">{member.role}</p>
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500"
                                                >
                                                    {member.email}
                                                </a>
                                                <br />
                                                <a
                                                    href={`tel:${member.phone}`}
                                                    className="text-xs text-gray-500 dark:text-gray-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500"
                                                >
                                                    {member.phone}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="absolute group-hover:bottom-1 delay-300 -bottom-16 transition-all duration-500 bg-gray-600 dark:bg-gray-100 right-1 rounded-lg">
                                            <div className="flex justify-evenly items-center gap-2 p-1 text-2xl text-white dark:text-gray-600">
                                                {member.linkedin && (
                                                    <Link
                                                        className="hover:motion-rotate-in-[0.5turn]"
                                                        href={member.linkedin}
                                                        target="_blank"
                                                    >
                                                        <FaLinkedinIn />
                                                    </Link>
                                                )}
                                                {member.github && (
                                                    <Link
                                                        href={member.github} className="hover:motion-preset-confetti" target="_blank">
                                                        <FaGithub />
                                                    </Link>
                                                )}
                                                {member.facebook && (
                                                    <Link
                                                        className="hover:motion-preset-bounce"
                                                        href={member.facebook}
                                                        target="_blank"
                                                    >
                                                        <FaFacebook />
                                                    </Link>
                                                )}
                                                {member.twitter && (
                                                    <Link
                                                        className="hover:motion-preset-pop"
                                                        href={member.twitter} target="_blank">
                                                        <FaXTwitter />
                                                    </Link>
                                                )}
                                                {member.instagram && (
                                                    <Link
                                                        className="hover:motion-preset-shake"
                                                        href={member.instagram}
                                                        target="_blank"
                                                    >
                                                        <FaInstagram />
                                                    </Link>
                                                )}
                                                {member.youtube && (
                                                    <Link
                                                        className="group-hover:motion-preset-shrink"
                                                        href={member.youtube} target="_blank">
                                                        <FaYoutube />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export async function getServerSideProps(context) {
    const { req } = context;
    const baseUrl = req ? `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}` : "";

    const res = await fetch(`${baseUrl}/api/getmember?status=active`);
    const members = await res.json();

    if (!members || members.length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: { members },
    };
}

export default Members;
