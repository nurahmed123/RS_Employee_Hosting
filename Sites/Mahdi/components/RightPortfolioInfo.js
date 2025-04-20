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
import { FaGithub, FaHtml5, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";


const RightPortfolioInfo = () => {
    const image = "https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/37b0a981-7d1e-4c79-ae16-47d31e4be6fa.png"

    return (
        <div className="slug_profile_info">
            <div className="slugprofile_sec">
                <div className="profile_imgbg"></div>
                <div className="slug_profile_img">
                    <div className="image_bg_top0"></div>
                    <div className="image_bg_top1 dark:!bg-[#0c172b57]"></div>
                    <img id="white-image" src={image} alt="coder" />
                </div>
            </div>
            <h3>RoboSuperior</h3>
            <h4>By <Link href={"https://linkedin.com/in/06nurahmed"}>Nur Ahmad</Link></h4>
            <div className="social_talks flex flex-center gap-1 mt-2">
                <div className="st_icon" data-aos="fade-up">
                    <Link href={"https:github.com/nurahmed123"} target="_blank"><FaGithub /></Link>
                </div>
                <div className="st_icon" data-aos="fade-up">
                    <Link href={"https://x.com/robo_superior"} target="_blank"><FaTwitter /></Link>
                </div>
                <div className="st_icon" data-aos="fade-up">
                    <Link href={"https://www.linkedin.com/company/robo-superior"} target="_blank"> <FaLinkedinIn /></Link>
                </div>
            </div>
        </div>
    )
}

export default RightPortfolioInfo