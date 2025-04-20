import Updateuserinfo from "@/components/Updateuserinfo";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import Aside from "@/components/Aside";
import { jwtDecode } from "jwt-decode";

export default function Setting() {
  const { data: session, status } = useSession();
  const appLogoUrl = `https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/37b0a981-7d1e-4c79-ae16-47d31e4be6fa.png`;
  const router = useRouter();
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const { id } = router.query;

  // Check user authentication and token validity
  useEffect(() => {
    const checkUser = () => {
      try {
        const token = localStorage.getItem("Token");
        if (token) {
          const JWTData = jwtDecode(token);
          setUserID(JWTData.data._id); // Set user ID from JWT
        } else {
          router.push('/'); // Redirect if no token is found
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        // localstorage.clear();
        router.push('/'); // Redirect on error
      }
    };

    checkUser();
  }, [router]);

  // Fetch user information
  useEffect(() => {
    if (userID) {
      axios.get(`/api/createuser?id=${userID}`)
        .then(response => setUserInfo(response.data))
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, [userID]);

  // Handle loading and redirection
  if (status === "loading" || !userID) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Loading />
        <h1 className="mt-1">Loading...</h1>
      </div>
    );
  }

  // Render the component when data is available
  return (
    <>
      <Head>
        <title>Settings | Robo Superior</title>
        <meta
          name="description"
          content="Manage your profile settings on Robo Superior. Update your personal information, change your password, and customize your account preferences easily."
        />
        <meta
          name="keywords"
          content="settings, profile settings, account management, update information, change password, customize profile, Robo Superior"
        />
        <meta name="author" content="Robo Superior" />
        <meta property="og:title" content="Settings | Robo Superior" />
        <meta
          property="og:description"
          content="Easily update your profile information and account settings on Robo Superior. Personalize your experience and manage your account with ease."
        />
        <meta property="og:image" content={appLogoUrl} />
        <meta property="og:url" content="https://robosuperior.com/settings" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Settings | Robo Superior" />
        <meta
          name="twitter:description"
          content="Access your settings on Robo Superior to update your profile and account preferences. Personalize your experience today!"
        />
        <meta name="twitter:image" content={appLogoUrl} />
      </Head>

      <Aside />
      <div className="max-[1043px]:!m-0 blogpage">
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2 className="dark:text-[#6466f1]">Update <span className="dark:text-gray-100">User Profile</span></h2>
            <h3 className="dark:text-[#6466f1]">ADMIN PANEL</h3>
          </div>
        </div>
        <div className="titledashboard flex justify-between">
          {/* Add any content for titledashboard if needed */}
        </div>
        <div className="mt-3">
          {userInfo ? (
            <Updateuserinfo {...userInfo} />
          ) : (
            <p className="dark:text-gray-100">Loading user information...</p>
          )}
        </div>
      </div>
    </>
  );
}
