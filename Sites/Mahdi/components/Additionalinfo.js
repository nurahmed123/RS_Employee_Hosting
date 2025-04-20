import Image from 'next/image'
import React from 'react'


const Additionalinfo = () => {
    return (
        <section className="overflow-hidden py-8 sm:py-16 mt-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div data-aos="zoom-in-right" className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600"></h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">We are ROBO Superior</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">All about Robotics and Technology.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                <div className="relative pl-9">
                                    <dt className="dark:text-gray-200 inline font-semibold text-gray-900">
                                        <Image
                                            src="https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/90cefa21-7e28-4c62-a3e2-ace4f64a3d94.png"
                                            width={30}
                                            height={30}
                                            style={{
                                                filter: "invert(85%) sepia(100%) saturate(7472%) hue-rotate(246deg) brightness(98%) contrast(78%)"
                                            }}
                                            className="absolute left-1 top-1 !text-indigo-600"
                                        />
                                        Innovative Robotics Solutions:
                                    </dt>
                                    <dd className="inline dark:text-gray-400"> ROBO Superior specializes in cutting-edge robotics development, providing advanced solutions for automation, AI integration, and intelligent systems.
                                    </dd>
                                </div>
                                <div className="relative pl-9">
                                    <dt className="dark:text-gray-200 inline font-semibold text-gray-900">
                                        <Image
                                            src="https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/908a6ba1-426b-44c7-9df9-23c1005c827b.png"
                                            width={30}
                                            height={30}
                                            style={{
                                                filter: "invert(85%) sepia(100%) saturate(7472%) hue-rotate(246deg) brightness(98%) contrast(78%)"
                                            }}
                                            className="absolute left-1 top-1 !text-indigo-600"
                                        />
                                        Technology-Driven Projects:
                                    </dt>
                                    <dd className="inline dark:text-gray-400"> We are dedicated to pushing the boundaries of Technology, delivering projects in Robotics, IoT, and Machine Learning to enhance industry efficiency.</dd>
                                </div>
                                <div className="relative pl-9">
                                    <dt className="dark:text-gray-200 inline font-semibold text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                        fill="currentColor" aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-[#764ee7]">
                                        <path fillRule="evenodd"
                                            d="M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z"
                                            cliprulee="evenodd"></path>
                                        <path
                                            d="M14.5 11.5c.173 0 .345-.007.514-.022l3.754 3.754a2.5 2.5 0 01-3.536 3.536l-4.41-4.41 2.172-2.607c.052-.063.147-.138.342-.196.202-.06.469-.087.777-.067.128.008.257.012.387.012zM6 4.586l2.33 2.33a.452.452 0 01-.08.09L6.8 8.214 4.586 6H3.309a.5.5 0 01-.447-.276l-1.7-3.402a.5.5 0 01.093-.577l.49-.49a.5.5 0 01.577-.094l3.402 1.7A.5.5 0 016 3.31v1.277z">
                                        </path>
                                    </svg>Research and Development: </dt>
                                    <dd className="inline dark:text-gray-400"> ROBO Superior prioritizes Research, continuously exploring new technologies and trends to stay at the forefront of the Robotics and Tech industry.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div className="mt-10 flex items-center gap-x-6">
                            <a href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start
                                for free
                            </a>
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-700">
                                <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                    <img data-aos="zoom-in-left" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb21wdXRlcnxlbnwwfDB8fHwxNjkxODE2NjY3fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Product screenshot" className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" width="2432" height="1442" />
                    {/* <Image src={"../public/img/table-professor.svg"} width="300" height="200"></Image> */}
                </div>
            </div>


            <div className="relative mt-[10rem]">
                <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
                    <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
                        <div data-aos="zoom-in-left">
                            <div >
                                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                        className="h-8 w-8 text-white">
                                        <path strokeLinecap="round" sstrokelinejoin="round"
                                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z">
                                        </path>
                                    </svg>
                                </span>
                            </div>
                            <div data-aos="zoom-in-left" className="mt-6">
                                <h2 className="text-3xl font-bold tracking-tight text-white">
                                    Robotics Team
                                </h2>
                                <p className="mt-4 text-lg dark:text-gray-300 text-gray-800">
                                    The Robotics Team of ROBO Superior is a group of skilled engineers and innovators passionate about designing and developing advanced robotic systems. We focus on creating intelligent, high-performance robots that push the limits of Technology and Automation.
                                </p>
                                <div className="mt-6">
                                    <a className="inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700"
                                        href="/login">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 sm:mt-16 lg:mt-0">
                        <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                            <img data-aos="zoom-in-right" alt="Inbox user interface" loading="lazy" width="647" height="486"
                                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                                src="https://images.unsplash.com/photo-1599134842279-fe807d23316e" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Additionalinfo