import React, { useEffect, useState } from 'react'


const Services = () => {
    const [darkMode, setDarkMode] = useState(true);
    useEffect(() => {
        // Check local storage for dark mode preference on initial load
        const isDarkMode = localStorage.getItem('darkMode');
        setDarkMode(isDarkMode);
    }, [darkMode]);

    return (
        <div className="!my-9 container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 m">
            <h2 className={`mb-1 text-3xl font-extrabold leading-tight dark:text-gray-300 text-gray-900`}>Services</h2>
            <p className="mb-12 text-lg text-gray-500">Here are few of the awesome Services we provide.</p>
            <div className="w-full">
                <div className="flex flex-col w-full mb-10 sm:flex-row">
                    <div data-aos="fade-right" className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white dark:bg-gray-700 border-2 border-indigo-500 rounded-lg">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-700 dark:text-gray-100">Web Development</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">We specialize in creating responsive, custom websites designed to elevate your brand and enhance user experience. Our team delivers fast, secure, and scalable web solutions tailored to meet your business goals.</p>
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-left" className="w-full sm:w-1/2">
                        <div className="relative h-full ml-0 md:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">App Development</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">We provide comprehensive app development services, creating custom, user-friendly applications for both Android and iOS platforms. Our team delivers innovative, secure, and scalable solutions tailored to meet your business needs.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div data-aos="zoom-in-right" className="flex flex-col w-full mb-5 sm:flex-row">
                    <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">Project Development</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">We provide end-to-end project development services, turning your ideas into fully realized, high-quality solutions. Our expert team ensures efficient project management, delivering innovative and scalable results on time and within budget.</p>
                            </div>
                        </div>
                    </div>
                    <div data-aos="zoom-in-up" className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">Project Paper</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">We offer professional project paper writing services, delivering well-researched, clear, and compelling documents tailored to your requirements. Our experienced writers ensure academic and professional quality, helping you present your ideas with precision and impact.</p>
                            </div>
                        </div>
                    </div>

                    <div data-aos="zoom-in-left" className="w-full sm:w-1/2">
                        <div className="relative h-full ml-0 md:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">Research Paper</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">We offer expert assistance in writing research papers, providing guidance through every step, from topic selection to final edits. Our service ensures high-quality, well-researched papers tailored to meet academic and professional standards.</p>
                            </div>
                        </div>
                    </div>
                    <div data-aos="zoom-in-up" className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10 min-h-[400px]">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-red-400 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-red-400 rounded-lg dark:bg-gray-700">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-gray-100">Sticker Printing</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">------------</p>
                                <p className="mb-2 text-gray-600 dark:text-gray-300">We now offer high-quality sticker printing services! Whether you need custom designs for business, events, or personal use, our expert team ensures vibrant, durable stickers that make your message stick. Get your ideas printed with precision and style!</p>

                                {/* Container to maintain block size */}
                                <div className="mt-4">
                                    <a href="https://forms.gle/UQDj7ox39X7jqGHQ7" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline inline-block">
                                        Submit Your Sticker Designs
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    )
}

export default Services