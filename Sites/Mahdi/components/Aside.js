'use client'
import Link from "next/link";
import { useRouter } from 'next/router';
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import { React, useState, useEffect } from 'react'

export default function Aside() {
    const router = useRouter();
    // login user check
    const [user, setUser] = useState({ value: null })
    const [key, setKey] = useState(0)

    useEffect(() => {
        try {
            const token = localStorage.getItem("Token")
            if (token) {
                setUser({ value: token })
                setKey(Math.random())
            }
        } catch (err) {
            console.log(err)
            // localstorage.clear()
        }
    }, []);


    const [clicked, setClicked] = useState(false);
    const [activeLink, setActiveLink] = useState('/dashboard');

    



    const handleClick = () => {
        setClicked(!clicked);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setClicked(false);
    };


    return <>
        <aside className="hidden min-[1043px]:block lg:absolute dark:bg-[#2d3748] dark:text-gray-100 asideleft">
            <ul>
                <Link href="/dashboard">
                    <li className={activeLink === '/dashboard' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/dashboard')}>
                        <IoHome />
                        <span>Dashboard</span>
                    </li>
                </Link>
                <Link href="/dashboard/blogs">
                    <li className={activeLink === '/dashboard/blogs' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/dashboard/blogs')}>
                        <BsPostcard />
                        <span>Blogs</span>
                    </li>
                </Link>

                <Link href="/dashboard/userpublishedpost">
                    <li className={activeLink === '/dashboard/userpublishedpost' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/dashboard/userpublishedpost')}>
                        <MdOutlinePending />
                        <span>Published</span>
                    </li>
                </Link>

                <Link href="/dashboard/setting">
                    <li className={activeLink === '/dashboard/setting' ? 'navactive' : ''}
                        onClick={() => handleLinkClick('/dashboard/setting')}>
                        <IoSettingsOutline />
                        <span>Settings</span>
                    </li>
                </Link>

            </ul>
        </aside>

    </>
}
