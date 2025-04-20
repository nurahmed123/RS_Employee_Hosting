import Link from 'next/link';
import React from 'react'
import useFetchData from "@/hooks/useFetchData";

const BlogCatagory = () => {
    const { alldata, loading } = useFetchData(`/api/getblog`);
    return (
        <section className="main_blog_section">
            <div className="container flex flex-sb flex-left flex-wrap">
                <div className="leftblog_sec">
                    <h2>Recently Published</h2>
                    <div className="blogs_sec">
                        {loading ? <><div className="wh-100 flex flex-center mt-2 pb-5">
                            <div aria-live="assertive" role="alert" className="loader"></div></div></> : <>
                            {publishedblogs.map((blog) => {
                                // in the markdown content first image show here
                                const firstImageUrl = extractFirstImageUrl(blog.description);
                                return <div className="blog" key={blog._id} data-aos="fade-up">
                                    <div className="blogimg">
                                        <Link href={`/blog/${blog.slug}`}>
                                            <img src={firstImageUrl || "/img/noimage.jpg"} alt="blog" />
                                        </Link>
                                    </div>
                                    <div className="bloginfo">
                                        <Link href={`/tag/${blog.tags[0]}`}><div className="blogtag">{blog.tags[0]}</div></Link>
                                        <Link href={`/blog/${blog.slug}`}><h3>{blog.title}</h3></Link>
                                        <p>Markdown is a lightweight markup language with plain-text-formatting syntax. Its design allows it to…</p>
                                        <div className="blogauthor flex gap-1">
                                            <div className="blogaimg">
                                                <img src="/img/coder.png" alt="author" />
                                            </div>
                                            <div className="flex flex-col flex-left gap-05">
                                                <h4>RoboSuperior</h4>
                                                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}

                        </>}


                    </div>
                    <div className='blogpagination'>
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`${currentPage === number ? 'active' : ''}`}
                            >
                                {number}
                            </button>
                        ))}
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                    </div>
                </div>
                <div className="rightblog_info">
                    <div className="topics_sec">
                        <h2>Topics</h2>
                        <div className="topics_list">
                            <Link href='/topics/htmlcssjs' data-aos="fade-up">
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
                            <Link href='/topics/database' data-aos="fade-up">
                                <div className="topics">
                                    <div className="flex flex-center topics_svg">
                                        <FiDatabase />
                                    </div>
                                    <h3>DataBase</h3>
                                </div>
                            </Link>
                            <Link href='/topics/deployment' data-aos="fade-up">
                                <div className="topics">
                                    <div className="flex flex-center topics_svg">
                                        <AiOutlineDeploymentUnit />
                                    </div>
                                    <h3>Deployment</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="tags_sec mt-3">
                        <h2>Tags</h2>
                        <div className="tags_list" data-aos="fade-up">
                            <Link href='/tag/html'>#html</Link>
                            <Link href='/tag/css'>#css</Link>
                            <Link href='/tag/javascript'>#javaScript</Link>
                            <Link href='/tag/nextjs'>#nextjs</Link>
                            <Link href='/tag/reactjs'>#reactjs</Link>
                            <Link href='/tag/database'>#database</Link>
                        </div>
                    </div>
                    <div className="letstalk_sec mt-3">
                        <h2>Let's Talk</h2>
                        <div className="talk_sec">
                            <h4>We're here for you—get in touch, and let's make it happen!</h4>
                            <div className="social_talks flex flex-center gap-1 mt-2">
                                <div className="st_icon" data-aos="fade-up">
                                    <FaGithub />
                                </div>
                                <div className="st_icon" data-aos="fade-up">
                                    <FaTwitter />
                                </div>
                                <div className="st_icon" data-aos="fade-up">
                                    <FaInstagram />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogCatagory