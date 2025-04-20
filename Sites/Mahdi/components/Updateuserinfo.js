import React from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

export default function Updateuserinfo({
    _id,
    name: existingName,
    username: existingUsername,
    role: existingRole,
    email: existingEmail,
    phone: existingPhone,
    country: existingCountry,
    password: existingPassword,
    bio: existingBio,
    facebook: existingBacebook,
    linkedin: existingLinkedin,
    github: existingGithub,
    image: existingImage,
}) {
    const [redirect, setRedirect] = useState(false);
    const [userID, setUserID] = useState(null);
    const router = useRouter();
    const [fileSize, setFileSize] = useState();

    const [name, setName] = useState(existingName || '');
    const [username, setUsername] = useState(existingUsername || '');
    const [role, setRole] = useState(existingRole || '');
    const [email, setEmail] = useState(existingEmail || '');
    const [phone, setPhone] = useState(existingPhone || '');
    const [country, setCountry] = useState(existingCountry || '');
    const [password, setPassword] = useState(existingPassword || '');
    const [bio, setBio] = useState(existingBio || '');
    const [facebook, setFacebook] = useState(existingBacebook || '');
    const [linkedin, setLinkedin] = useState(existingLinkedin || '');
    const [github, setGithub] = useState(existingGithub || '');
    const [image, setImage] = useState(existingImage || '');



    useEffect(() => {
        const checkUser = () => {
            try {
                const token = localStorage.getItem("Token");
                if (token) {
                    const JWTData = jwtDecode(token);
                    setUserID(JWTData.data._id); // Set author from JWT
                } else {
                    router.push('/'); // Redirect if no token is found
                }
            } catch (err) {
                console.error(err);
                // localstorage.clear();
                router.push('/'); // Redirect on error
            }
        };
        checkUser();
    }, [router]);

    const handleImgUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        // console.log(file.size);
        // setImage({ ...image, memberImage: base64 })
        setFileSize(file.size);
        {
            file.size >= 1000000 ? null : setImage(base64);
        }
    };

    async function updateUser(ev) {
        ev.preventDefault();

        const data = { name, role, username, country, email, phone, password, image, bio, facebook, github, linkedin };

        try {
            if (_id) {
                await axios.put('/api/createuser', { ...data, _id });
                toast.success('Data Updated!');
            }
            setRedirect(true);
        } catch (err) {
            console.error(err);
            toast.error('An error occurred!');
        }
    };

    if (redirect) {
        router.push('/dashboard');
        return null;
    }

    return (
        <>
            <div className="container">
                
                <form onSubmit={updateUser} className='container m-0 addWebsiteform dark:bg-[#2d3748] mt-2'>
                    {/* blog title */}
                    <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                        <label htmlFor="title" className="dark:text-gray-100">Name</label>
                        <input type="text" id='title' placeholder='Enter name'
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                            className="dark:text-gray-200 dark:bg-gray-600"
                        />
                    </div>
                    {/* blog slug url */}
                    <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                        <label htmlFor="slug" className="dark:text-gray-100">User Name</label>
                        <input required type="text" id='slug' placeholder='Enter username'
                            value={username}
                            onChange={ev => setUsername(ev.target.value)}
                            className="dark:text-gray-200 dark:bg-gray-600"
                        />
                    </div>

                    {/* blog keyword */}
                    <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                        <label htmlFor="title" className="dark:text-gray-100">Phone</label>
                        <input type="text" id='keyword' placeholder='Enter phone number'
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)}
                            className="dark:text-gray-200 dark:bg-gray-600"
                        />
                    </div>
                    <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                        <label htmlFor="title" className="dark:text-gray-100">Country</label>
                        <input type="text" id='keyword' placeholder='Enter country name'
                            value={country}
                            onChange={ev => setCountry(ev.target.value)}
                            className="dark:text-gray-200 dark:bg-gray-600"
                        />
                    </div>

                    <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                        <label htmlFor="metadescription" className="dark:text-gray-100">Bio</label>
                        <input type="text" id='metadescription' placeholder='Write about you'
                            value={bio}
                            onChange={ev => setBio(ev.target.value)}
                            className="dark:text-gray-200 dark:bg-gray-600"
                        />
                    </div>

                    <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                        <label htmlFor="metadescription" className="dark:text-gray-100">Facebook URL</label>
                        <input type="text" id='metadescription' placeholder='https://'
                            value={facebook}
                            onChange={ev => setFacebook(ev.target.value)}
                            className="dark:text-gray-200 dark:bg-gray-600"
                        />
                    </div>

                    <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                        <label htmlFor="metadescription" className="dark:text-gray-100">Github URL</label>
                        <input type="text" id='metadescription' placeholder='https://'
                            value={github}
                            onChange={ev => setGithub(ev.target.value)}
                            className="dark:text-gray-200 dark:bg-gray-600"
                        />
                    </div>

                    <div className='w-100 flex flex-col flex-left mb-2' data-aos="fade-up">
                        <label htmlFor="metadescription" className="dark:text-gray-100">Linkedin URL</label>
                        <input type="text" id='metadescription' placeholder='https://'
                            value={linkedin}
                            onChange={ev => setLinkedin(ev.target.value)}
                            className="dark:text-gray-200 dark:bg-gray-600"
                        />
                    </div>

                    <div className="w-100 flex flex-col flex-left mb-2" data-aos="fade-up">
                        <label htmlFor="fileInput" className="dark:text-gray-100 w-full pl-0.5 text-sm">
                            Upload File
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            accept=".jpg,.png,.jpeg,.webp"
                            onChange={(e) => handleImgUpload(e)}
                            className="!w-full dark:text-gray-100 max-w-md overflow-clip rounded-xl border rounded-lg border-slate-300  text-sm file:mr-4 file:cursor-pointer file:border-none file:bg-slate-100 file:px-4 file:py-2 file:font-medium file:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:focus-visible:outline-blue-600"
                        />
                        <small className="pl-0.5 w-full pb-2 dark:text-gray-100">PNG, JPG, WebP - Max 1MB</small>
                    </div>

                    <div className="mb-1 previewImage" data-aos="fade-up">
                        <label htmlFor="fileInput" className="dark:text-gray-100 w-full pl-0.5 text-sm">
                            Preview
                        </label>
                        <div className="mt-1 w-full max-w-sm bg-white !border bg-gray-300 !border-gray-200 rounded-[.5rem] shadow ">
                            {image ? (
                                <img
                                    className="p-8 !rounded"
                                    src={image}
                                    alt="Upload Image For Preview"
                                />
                            ) : (
                                <p className="pt-5 pl-4 dark:text-gray-100">Upload Image For Preview</p>
                            )}
                            {fileSize >= 1000000 ? (
                                <p style={{ color: "red" }} className="dark:text-gray-100 pt-5 pl-4">
                                    File size is longer than 1MB
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className='w-100 mb-2' data-aos="fade-up">
                        <span className="text-sm text-gray-500 dark:text-gray-300">Update </span>
                        <Link href="/passwordreset" className="text-blue-500 hover:text-blue-600">password?</Link>
                    </div>

                    <div className='w-100 mb-2' data-aos="fade-up">
                        <button type='submit' className='w-100 addwebbtn flex-center dark:bg-[#667eea] dark:hover:bg-[#7788d4]'>Update</button>
                    </div>

                </form>
            </div>
        </>
    )
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}
