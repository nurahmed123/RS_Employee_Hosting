import Head from 'next/head'
import React, { useState } from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import Swal from 'sweetalert2';

// import '../styles/tailwind.css'

const contact = () => {
    const router = useRouter();

    const [redirect, setRedirect] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")

    async function sendEmail(ev) {
        ev.preventDefault();
        const data = { message, subject, name, phone, email };
        await axios.post('/api/sendEmail', data)

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Mail Sent successfully"
        });
        setRedirect(true);
    };

    if (redirect) {
        router.push('/')
        return null;
    }

    return (
        <>
            <Head>
                <title>Contact Us | ROBO Superior</title>
                <meta name="description" content="Get in touch with ROBO Superior to learn more about our robotics, mechatronics, and electrical project management initiatives. Fill out the form and we will get back to you promptly." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Contact Us | ROBO Superior" />
                <meta property="og:description" content="Reach out to ROBO Superior for inquiries about our robotics and mechatronics programs. We are here to answer your questions and explore new opportunities together." />
                <meta property="og:image" content="/img/contact.png" />
                <meta property="og:url" content={`${process.env.SITE_URL}/contact`} />
                <meta property="og:type" content="website" />
                
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us | ROBO Superior" />
                <meta name="twitter:description" content="Get in touch with ROBO Superior to learn more about our robotics and mechatronics initiatives. We are ready to assist you with your inquiries." />
                <meta name="twitter:image" content="/img/contact.png" />
                <meta name="twitter:site" content="@yourtwitterhandle" />
            </Head>

            <div className="bg-green-50 font-[sans-serif] lg:h-screen">
                <div data-aos="zoom-in-right"
                    className="grid lg:grid-cols-3 items-center max-lg:justify-center gap-6 h-full sm:p-12 p-8 max-sm:p-4">
                    <div className="max-w-lg max-lg:mx-auto max-lg:text-center max-lg:mb-6">
                        <h2 className="text-4xl font-extrabold text-gray-800">Get In Touch</h2>
                        <p className="text-sm text-gray-600 mt-4 leading-relaxed">Have a specific inquiry or looking to explore new opportunities? Our
                            experienced team is ready to engage with you.</p>

                        <form onSubmit={sendEmail} className="mx-auto mt-8 bg-white rounded-lg p-6 shadow-md space-y-4">
                            <input required value={name} onChange={ev => setName(ev.target.value)} type='text' placeholder='Name'
                                className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none" />
                            <input required value={email} onChange={ev => setEmail(ev.target.value)} type='email' placeholder='Email'
                                className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none" />
                            <input required value={subject} onChange={ev => setSubject(ev.target.value)} type='text' placeholder='Subject'
                                className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none" />
                            <input required value={phone} onChange={ev => setPhone(ev.target.value)} type='number' placeholder='Phone'
                                className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none" />
                            <textarea required value={message} onChange={ev => setMessage(ev.target.value)} placeholder='Message' rows="6"
                                className="w-full rounded-md px-6 bg-[#f0f1f2] text-sm pt-3 outline-none"></textarea>
                            <button type='submit'
                                className="text-gray-800 bg-green-200 hover:bg-green-300 font-semibold rounded-md text-sm px-6 py-3 block w-full">Send
                                Message</button>
                        </form>
                    </div>

                    <div className="z-10 relative lg:col-span-2">
                        <img data-aos="zoom-in-left" src="https://readymadeui.com/images/analtsis.webp" className="w-3/4 object-contain block mx-auto" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default contact
