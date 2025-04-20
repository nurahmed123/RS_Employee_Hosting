import { BsTags } from "react-icons/bs";
import { LuClock3 } from "react-icons/lu";
import { AiOutlineDeploymentUnit, AiOutlineUser } from "react-icons/ai";
import { PiMedalFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Head from "next/head";
import { FiDatabase } from "react-icons/fi";
import { TbBrandNextjs } from "react-icons/tb";
import { FaGithub, FaHtml5, FaInstagram, FaTwitter } from "react-icons/fa6";


export const RightTopicSection = () => {
    return (
        <div className="topics_sec">
            <h2>Topics</h2>
            <div className="topics_list">
                <Link href='/topics/htmlcssjs'>
                    <div className="topics">
                        <div className="flex flex-center topics_svg">
                            <FaHtml5 />
                        </div>
                        <h3>Html, css & javaScript</h3>
                    </div>
                </Link>
                <Link href='/topics/nextjs'>
                    <div className="topics">
                        <div className="flex flex-center topics_svg">
                            <TbBrandNextjs />
                        </div>
                        <h3>Next Js, React js</h3>
                    </div>
                </Link>
                <Link href='/topics/database'>
                    <div className="topics">
                        <div className="flex flex-center topics_svg">
                            <FiDatabase />
                        </div>
                        <h3>DataBase</h3>
                    </div>
                </Link>
                <Link href='/topics/deployment'>
                    <div className="topics">
                        <div className="flex flex-center topics_svg">
                            <AiOutlineDeploymentUnit />
                        </div>
                        <h3>Deployment</h3>
                    </div>
                </Link>
            </div>
        </div>
    )
}
