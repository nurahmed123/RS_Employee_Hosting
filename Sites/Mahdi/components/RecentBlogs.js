import Link from 'next/link'
import React from 'react'
import useFetchData from "@/hooks/useFetchData";
const RecentBlogs = () => {
    
    const { alldata, loading } = useFetchData(`/api/getblog`);
    return (
        <section className="header_data_section">
            <div className="container flex flex-sb w-100">
                <div className="leftheader_info" data-aos="fade-right">
                    <h1>Hi, This is <span>RoboSuperior</span>.<br /> a team from Bangladesh</h1>
                    <h3>We are passionate to work with difficulties.</h3>
                    <div className="flex gap-2 ">
                        <Link href='/contact'><button>Contact Us</button></Link>
                        <Link href='/about'><button>About Us</button></Link>
                    </div>
                </div>
                <div className="rightheader_img" data-aos="zoom-in">
                    <div className="image_bg_top"></div>
                    <div className="image_bg_top2"></div>
                    <img src="/img/coder.png" alt="coder" />
                </div>
            </div>
        </section>
    )
}

export default RecentBlogs