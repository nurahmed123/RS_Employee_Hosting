import React from 'react'
import useFetchData from "@/hooks/useFetchData";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useSession } from 'next-auth/react';
import Loading from './Loading';

const UserProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      try {
        const token = localStorage.getItem("Token");
        // const token = session.user.jwt
        // console.log(token)
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


  const { alldata, loading } = useFetchData(`/api/createuser?id=${userID}`);
  // console.log(alldata)

  if (loading === "loading" || !userID) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Loading />
        <h1 className="mt-1">Loading...</h1>
      </div>
    );
  }

  if (!alldata) {
    return <div>No data available</div>;
  }

  const { name, bio, image, facebook, linkedin, github } = alldata;

  return (
    <div className='m-4'>
      <div className="max-w-lg mx-auto my-10 bg-white dark:text-gray-100 shadow-xl dark:bg-slate-800 rounded-lg p-5">
        <img className="w-32 h-32 rounded-full mx-auto" src={image || "https://picsum.photos/200"} alt="Profile picture" />
        <h2 className="text-center text-2xl font-semibold mt-3">{name || "John Doe"}</h2>
        <div className="flex justify-center mt-5">
          {facebook && <Link target="_blank" href={facebook} className="text-[#6466f1] hover:text-[#4338ca] mx-3">FaceBook</Link>}
          {linkedin && <Link target="_blank" href={linkedin} className="text-[#6466f1] hover:text-[#4338ca] mx-3">LinkedIn</Link>}
          {github && <Link target="_blank" href={github} className="text-[#6466f1] hover:text-[#4338ca] mx-3">GitHub</Link>}
        </div>
        <div className="mt-5">
          <h3 className="text-xl font-semibold">Bio</h3>
          <p className="text-gray-600 mt-2 dark:text-gray-200">{bio || "Bio isn't updated"}</p>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
