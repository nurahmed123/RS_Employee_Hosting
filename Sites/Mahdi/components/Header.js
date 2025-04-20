import Link from "next/link";
import { IoSearchSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import useFetchData from "@/hooks/useFetchData";
import { IoMoonSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import { LuSun } from "react-icons/lu";
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'
import { jwtDecode } from "jwt-decode";
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from "@nextui-org/react";


export default function Header() {
    const { data: session, status } = useSession();


    const router = useRouter();
    const [activeLink, setActiveLink] = useState('/');

    // user login
    const [user, setUser] = useState({ value: null })
    const [userImg, setUserImg] = useState("");
    const [key, setKey] = useState(0)

    useEffect(() => {
        try {
            const token = localStorage.getItem("Token")
            if (token) {
                setUser({ value: token })
                setKey(Math.random())
                const JWTData = jwtDecode(token);
                setUserImg(JWTData.data.image);
            }
        } catch (err) {
            console.log(err)
            // localstorage.clear()
        }
    }, [])

    useEffect(() => {
        // Update active link state when the page is reloaded
        setActiveLink(router.pathname);
    }, [router.pathname]);

    const [searchopen, setSearchopen] = useState(false);

    const openSearch = () => {
        setSearchopen(!searchopen);
    };

    const closeSearch = () => {
        setSearchopen(false);
    };


    // aside on off
    const [aside, setAside] = useState(false);

    const asideOpen = () => {
        setAside(true);
    }

    const asideClose = () => {
        setAside(false);
    }
    const handleLinkClick = () => {
        setAside(false); // Close the aside menu
    };

    const handleLogout = async () => {
        localStorage.removeItem("Token")
        // await router.refresh();
        await router.push("/")
        router.reload()
    }

    // darkMode on off
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        // Check local storage for dark mode preference on initial load
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        // Apply dark mode styles when darkMode state changes
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', true);
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', false);
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); // Toggle dark mode status
    };



    const { alldata, loading } = useFetchData(`/api/getblog`);

    // Filtering publish blogs
    const publishedblogs = alldata.filter(ab => ab.status === "publish")

    const [searchQuery, setSearchQuery] = useState('');
    // Filtering based on search query
    const filteredBlogs = searchQuery.trim() === '' ? publishedblogs : publishedblogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return <>
        <div className="header_sec">
            <div className="container header">
                <div className="logo">
                    <Link href="/"><h1>RoboSuperior</h1></Link>
                </div>
                <div className="searchbar">
                    <IoSearchSharp />
                    <input onClick={openSearch} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Discover news, articles and more" />
                </div>

                <div className="nav_list_dark">
                    <ul>
                        <li><Link className={activeLink === '/' ? '!text-[#5485e0]' : ''} href="/">Home</Link></li>
                        <li><Link className={activeLink === '/blog' ? '!text-[#5485e0]' : ''} href="/blog">Blog</Link></li>
                        <li><Link className={activeLink === '/project' ? '!text-[#5485e0]' : ''} href="/project">Projects</Link></li>
                        <li><Link className={activeLink === '/achievement' ? '!text-[#5485e0]' : ''} href="/achievement">Achievements</Link></li>
                        {/* <li><Link className={activeLink === '/privatenote/diary' ? 'text-[#5485e0]' : ''} href="/privatenote/diary">Apps</Link></li> */}
                        <li className='group max-lg:border-b max-lg:px-3 max-lg:py-3 relative'>
                            <a href='javascript:void(0)'
                                className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>Apps
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="dark:text-gray-200 ml-1 inline-block"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                        data-name="16" data-original="#000000" />
                                </svg>
                            </a>
                            <ul
                                className='absolute rounded-lg mt-1 top-5 left-0 z-50 space-y-2 shadow-lg min-w-min bg-white dark:bg-[#1e293b] max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500 flex flex-col items-start'>

                                <li className="w-full">
                                    <Link
                                        href='https://ai.robosuperior.com/'
                                        className='hover:text-[#007bff] text-gray-600 dark:text-gray-300 font-semibold text-[15px] flex items-center'>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >

                                            <path d="M21 15c-1.37 0-2.74.5-3.78 1.38L14 16l-2 2v-5H7V6h10v8l4 2v1z"></path>

                                            <circle cx="12" cy="9" r="1"></circle>
                                            <circle cx="9" cy="9" r="1"></circle>
                                        </svg>



                                        &nbsp;RS AI
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        href='https://code.robosuperior.com/'
                                        className='hover:text-[#007bff] text-gray-600 dark:text-gray-300 font-semibold text-[15px] flex items-center'>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <polyline points="16 18 22 12 16 6"></polyline>
                                            <polyline points="8 6 2 12 8 18"></polyline>
                                            <line x1="14" y1="4" x2="10" y2="20"></line>
                                        </svg>

                                        &nbsp;RS Coder
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        href='https://chat.robosuperior.com/'
                                        className='hover:text-[#007bff] text-gray-600 dark:text-gray-300 font-semibold text-[15px] flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
                                            <rect x="1" y="1" width="18" height="14" rx="3" ry="3" fill="#e0e0e0" stroke="#c0c0c0" stroke-width="0.5" />

                                            <polygon points="8,14 12,14 10,18" fill="#e0e0e0" stroke="#c0c0c0" stroke-width="0.5" />

                                            <text x="3" y="9" font-family="Arial" font-size="3" fill="#333333"></text>
                                        </svg>

                                        &nbsp;RS Chat
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        href='https://meet.robosuperior.com/'
                                        className='hover:text-[#007bff] text-gray-600 dark:text-gray-300 font-semibold text-[15px] flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">

                                            <rect x="4" y="6" width="12" height="8" rx="2" fill="#34B7F1" />
                                            <polygon points="16,10 19,7 19,13" fill="#34B7F1" />

                                            <circle cx="10" cy="10" r="2" fill="#fff" />

                                            <line x1="2" y1="17" x2="18" y2="17" stroke="#34B7F1" stroke-width="1" stroke-linecap="round" />
                                        </svg>

                                        &nbsp;RS Meet
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        href='/apps/shorturl'
                                        className='hover:text-[#007bff] text-gray-600 dark:text-gray-300 font-semibold text-[15px] flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="inline-block fill-current" viewBox="0 0 24 24">
                                            <path d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zM7 5h10a2 2 0 0 1 2 2v2H5V7a2 2 0 0 1 2-2zm10 14H7a2 2 0 0 1-2-2v-6h14v6a2 2 0 0 1-2 2z" />
                                        </svg>
                                        &nbsp;URL&nbsp;Shortener
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        href='/privatenote/diary'
                                        className='hover:text-[#007bff] text-gray-600 dark:text-gray-300 font-semibold text-[15px] flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="inline-block fill-current" viewBox="0 0 24 24">
                                            <path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 4h10v2H7V4zm10 14H7v-2h10v2zm0-4H7v-2h10v2zm0-4H7V8h10v2z" />
                                        </svg>
                                        &nbsp;Diary
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className='group max-lg:border-b max-lg:px-3 max-lg:py-3 relative'>
                            <a href='javascript:void(0)'
                                className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>About<svg
                                    xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="dark:text-gray-200 ml-1 inline-block"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                        data-name="16" data-original="#000000" />
                                </svg>
                            </a>
                            <ul
                                className='absolute rounded-lg mt-1 top-5 max-lg:top-8 left-0 z-50 space-y-2 shadow-lg min-w-min bg-white dark:bg-[#1e293b] max-h-0 overflow-hidden  group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500 flex flex-col'>
                                <Link href='/about' className='hover:text-[#007bff] flex hover:fill-[#007bff] text-gray-600 dark:text-gray-300 font-semibold text-[15px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="inline-block fill-current" viewBox="0 0 24 24">
                                        <path d="M13 11h-2V9h2v2zm0 4h-2v-3h2v3zm-1-12C7.163 3 3 7.163 3 12s4.163 9 9 9 9-4.163 9-9-4.163-9-9-9zm0 16c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z" />
                                    </svg>
                                    &nbsp;About&nbsp;Us
                                </Link>

                                <li className=''>
                                    <Link href='/members' className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 dark:text-gray-300 font-semibold text-[15px] flex'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="inline-block fill-current" viewBox="0 0 24 24">
                                            <path d="M12 12c2.485 0 4.5-1.635 4.5-3.5S14.485 5 12 5 7.5 6.635 7.5 8.5 9.515 12 12 12zM12 13.5c-2.5 0-7.5 1.25-7.5 3.75v3h15v-3c0-2.5-5-3.75-7.5-3.75z" />
                                        </svg>
                                        &nbsp;Members
                                    </Link>
                                </li>
                            </ul>

                        </li>
                        <li><Link className={activeLink === '/contact' ? '!text-[#5485e0]' : ''} href="/contact">Contact</Link></li>



                        {user.value ? <div className="relative ml-3">
                            <Link href="/dashboard">
                                <div>
                                    <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                                        <Image
                                            src={userImg}
                                            alt="user"
                                            width={32}
                                            height={32}
                                            style={{ height: "2rem", borderRadius: "100%" }}
                                        />
                                    </button>
                                </div>
                            </Link>
                        </div> : ""}


                        {user.value ? <button className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                            <Link className={activeLink === '/login' ? ' !text-white' : ''} href="/" onClick={handleLogout}>Logout</Link>
                        </button> : <button className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                            <Link className={activeLink === '/login' ? ' !text-white' : ''} href="/login">Login</Link>
                        </button>}
                    </ul>
                    <div className="navlist_mobile_ul">
                        <button onClick={toggleDarkMode}>{darkMode ? <IoMoonSharp /> : <LuSun />}</button>
                        <button onClick={openSearch}><IoSearch /></button>
                        <button onClick={asideOpen}><HiBars3BottomRight /></button>
                    </div>
                    <div className="darkmode">
                        <label className="switch">
                            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                            <span className="slider_header"></span>
                        </label>
                    </div>
                </div>

            </div>
            <div className={`search_click ${searchopen ? 'open' : ''}`}>
                <div className="searchab_input">
                    <IoSearchSharp />
                    <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Discover news, articles and more" />
                </div>
                <div className="search_data text-center">
                    {loading ? <><div className="wh-100 flex flex-center mt-2 pb-5">
                        <div aria-live="assertive" role="alert" className="loader"></div></div></> : <>
                        {searchQuery ? <>{filteredBlogs.slice(0, 3).map((blog) => {
                            return <Link href={`/blog/${blog.slug}`} onClick={closeSearch} key={blog._id} >
                                <div className="blog" >
                                    <div className="bloginfo">
                                        <h3>{blog.title}</h3>
                                        <p>Markdown is a lightweight markup language with plain-text-formatting syntax. Its design allows it to…</p>
                                    </div>
                                </div>
                            </Link>
                        })}</> : <div>No Search Result</div>}

                    </>}
                </div>
                <div className="exit_search" onClick={closeSearch}>
                    <div><FaXmark /></div>
                    <h4>ESC</h4>
                </div>
            </div>
            <div className={aside ? "navlist_mobile open overflow-auto" : "navlist_mobile"}>
                <div className="navlist_m_title flex flex-sb">
                    <h1>RoboSuperior</h1>
                    <button onClick={asideClose}><FaXmark /></button>
                </div>
                <hr />
                <h3 className="mt-3">Main Menu</h3>
                <ul onClick={handleLinkClick}>
                    <li><Link className={activeLink === '/' ? 'text-[#5485e0]' : ''} href="/">Home</Link></li>
                    <li><Link className={activeLink === '/blog' ? 'text-[#5485e0]' : ''} href="/blog">Blog</Link></li>
                    <li><Link className={activeLink === '/project' ? 'text-[#5485e0]' : ''} href="/project">Projects</Link></li>
                    <li><Link className={activeLink === '/achievement' ? 'text-[#5485e0]' : ''} href="/achievement">Achievements</Link></li>
                    <li><Link className={activeLink === 'https://ai.robosuperior.com/' ? 'text-[#5485e0]' : ''} href="https://ai.robosuperior.com/">RS AI</Link></li>
                    <li><Link className={activeLink === 'https://code.robosuperior.com/' ? 'text-[#5485e0]' : ''} href="https://code.robosuperior.com/">RS Coder</Link></li>
                    <li><Link className={activeLink === 'https://chat.robosuperior.com/' ? 'text-[#5485e0]' : ''} href="https://chat.robosuperior.com/">RS Chat</Link></li>
                    <li><Link className={activeLink === 'https://meet.robosuperior.com/' ? 'text-[#5485e0]' : ''} href="https://meet.robosuperior.com/">RS Meet</Link></li>
                    <li><Link className={activeLink === '/privatenote/diary' ? 'text-[#5485e0]' : ''} href="/privatenote/diary">Diary</Link></li>
                    <li><Link className={activeLink === '/apps/shorturl' ? 'text-[#5485e0]' : ''} href="/apps/shorturl">URL Shortener</Link></li>
                    <li><Link className={activeLink === '/about' ? 'text-[#5485e0]' : ''} href="/about">About us</Link></li>
                    <li><Link className={activeLink === '/members' ? 'text-[#5485e0]' : ''} href="/members">Members</Link></li>
                    <li><Link className={activeLink === '/contact' ? 'text-[#5485e0]' : ''} href="/contact">Contact</Link></li>

                    {user.value ? <div className="relative mb-3">
                        <Link href="/dashboard">
                            <div>
                                <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                                    <Image
                                        src={userImg}
                                        alt="user"
                                        width={32}
                                        height={32}
                                        style={{ height: "2rem", borderRadius: "100%" }}
                                    />
                                </button>
                            </div>
                        </Link>
                    </div> : ""}

                    {user.value ? <button className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                        <Link className={activeLink === '/login' ? ' !text-white' : ''} href="/" onClick={handleLogout}>Logout</Link>
                    </button> : <button className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                        <Link className={activeLink === '/login' ? ' !text-white' : ''} href="/login">Login</Link>
                    </button>}

                </ul>

                {user.value ? <> <hr />
                    <h3 className="mt-3">Control Center</h3>
                    <ul onClick={handleLinkClick}>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/dashboard/blogs">Blogs</Link></li>
                        <li><Link href="/dashboard/blogs/addblog">Add Blogs</Link></li>
                        <li><Link href="/dashboard/setting">Settings</Link></li>
                    </ul></> : ""}

                <hr />
                <h3 className="mt-3">Topics</h3>
                <ul onClick={handleLinkClick}>
                    <li><Link href="/topics/htmlcssjs">Html css js</Link></li>
                    <li><Link href="/topics/nextjs">Next js</Link></li>
                    <li><Link href="/topics/database">Database</Link></li>
                    <li><Link href="/topics/deployment">Deployment</Link></li>
                </ul>
            </div>
        </div>
    </>
}


