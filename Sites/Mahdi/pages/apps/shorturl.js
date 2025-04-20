import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from 'next/router';
import { jwtDecode } from "jwt-decode";
import Head from 'next/head';
import Link from "next/link";

const ShortURL = () => {
    const [urls, setUrls] = useState([]);
    const [longUrl, setLongUrl] = useState("");
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [refreshed, setRefreshed] = useState(true);
    const [redirectCount, setRedirectCount] = useState(0);
    const siteUrl = process.env.SITE_URL || 'https://robosuperior.com'; // Fallback if SITE_URL is not set
    useEffect(() => {
        const token = localStorage.getItem("Token");
        if (token) {
            try {
                const JWTData = jwtDecode(token);
                setUsername(JWTData.data.username); // Set username immediately
            } catch (err) {
                console.error("Invalid token", err);
            } finally {
                const JWTData = jwtDecode(token);
                setUsername(JWTData.data.username); // Set username immediately
            }
        } else {
            // If no token is found, set username to empty string
            setUsername("");
        }
    }, [router]);

    const fetchUrls = async () => {
        if (!username) {
            if (redirectCount < 2) {
                setRedirectCount((prev) => prev + 1);
                router.push("/apps/shorturl");
            }
            return; // Exit early if no username
        }

        try {
            const res = await fetch(`/api/shortUrl`);

            // Handle error responses
            if (!res.ok) {
                throw new Error("Failed to fetch URLs");
            }

            const data = await res.json();

            // Filter URLs based on the username and update state only if filtered data changes
            const filteredUrls = data.filter((url) => url.username === username);

            // Avoid unnecessary state updates if no URLs to update
            if (filteredUrls.length !== urls.length) {
                setUrls(filteredUrls);
            }
        } catch (error) {
            console.error("Error fetching URLs:", error.message);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, [router, redirectCount]); // Track redirectCount to re-run effect when it changes

    // Handle URL shortening
    const handleShorten = async () => {
        // Function to validate if the input is a valid URL
        const isValidUrl = (url) => {
            try {
                const parsedUrl = new URL(url); // Use URL constructor to validate
                return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
            } catch (err) {
                return false;
            }
        };

        if (!longUrl || !isValidUrl(longUrl)) {
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
                icon: "error",
                title: "Please enter a valid URL starting with http:// or https://",
            });
            return;
        }

        // If no username is available, prompt the user to log in
        if (!username) {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "Login, otherwise your link will expire in 30 days.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, continue",
            });

            if (confirm.isConfirmed) {
                // Only call createShortUrl if the user has confirmed
                await createShortUrl(longUrl); // Create short URL without username
            }
        } else {
            // Proceed with username if it's available
            await createShortUrl(longUrl, username); // Create short URL with username
        }
    };


    // Function to handle the URL shortening logic
    const createShortUrl = async (url, username) => {
        try {
            const body = username ? { url, username } : { url }; // If no username, exclude it from the body
            const res = await fetch("/api/shortUrl", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                const newUrl = await res.json();
                setUrls((prev) => [...prev, newUrl]);
                setLongUrl(""); // Reset the long URL field
                router.push("/apps/shorturl")
            } else {
                const error = await res.json();
                alert(error.error || "Failed to shorten URL");
            }
        } catch (error) {
            console.error("Error shortening URL:", error);
            alert("An error occurred while shortening the URL.");
        }
    };

    // Handle URL deletion
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`/api/shortUrl?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    setUrls((prev) => prev.filter((url) => url._id !== id));
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
                        title: "The Link Has Been Deleted!",
                    });
                    router.push("/apps/shorturl")
                } else {
                    const error = await res.json();
                    Swal.fire("Error", error.error || "Failed to delete URL", "error");
                }
            } catch (error) {
                console.error("Error deleting URL:", error);
                Swal.fire("Error", "An unexpected error occurred", "error");
            }
        }
    };

    // Handle URL click (open in a new tab and copy to clipboard)
    const handleUrlClick = async (shortUrl) => {
        window.open(shortUrl, "_blank");
        try {
            await navigator.clipboard.writeText(shortUrl);
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
                title: "URL copied to clipboard!",
            });
        } catch (error) {
            Swal.fire("Error", "Failed to copy URL. Please copy it manually.", "error");
        }
        router.push("/apps/shorturl")
    };

    // Handle manual copy
    const handleCopy = async (shortUrl) => {
        try {
            await navigator.clipboard.writeText(shortUrl);
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
                title: "URL copied to clipboard!",
            });
        } catch (error) {
            Swal.fire("Error", "Failed to copy URL. Please copy it manually.", "error");
        }
    };

    return (
        <>
            <Head>
                {/* Primary Meta Tags */}
                <title>Robo Superior - URL Shortener</title>
                <meta
                    name="description"
                    content="Robo Superior provides powerful tools like a Short URL Generator to enhance your productivity and simplify your online tasks. Discover innovative solutions today!"
                />
                <meta
                    name="keywords"
                    content="Robo Superior, Short URL Generator, link management, SEO tools, productivity solutions, online tools"
                />
                <meta name="author" content="Robo Superior" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags (For Social Media Sharing) */}
                <meta property="og:title" content="Robo Superior - URL Shortener" />
                <meta
                    property="og:description"
                    content="Robo Superior provides powerful tools like a Short URL Generator to enhance your productivity and simplify your online tasks. Discover innovative solutions today!"
                />
                <meta property="og:image" content={`https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/141b9602-78c1-4d8c-972e-a1d100f6ee90.jpeg`} />
                <meta property="og:url" content={siteUrl} />
                <meta property="og:type" content="website" />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Robo Superior - URL Shortener" />
                <meta
                    name="twitter:description"
                    content="Robo Superior provides powerful tools like a Short URL Generator to enhance your productivity and simplify your online tasks. Discover innovative solutions today!"
                />
                <meta name="twitter:image" content={`https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/141b9602-78c1-4d8c-972e-a1d100f6ee90.jpeg`} />

                {/* Canonical URL */}
                <link rel="canonical" href={siteUrl} />

                {/* Alternate Languages (if applicable) */}
                <link rel="alternate" hreflang="en" href={siteUrl} />

                {/* Structured Data (JSON-LD for SEO) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Robo Superior",
                        "url": "https://robosuperior.com",
                        "description": "Robo Superior offers cutting-edge tools and services including a URL shortener, private note tools, and more. Simplify your online tasks with our innovative solutions.",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Robo Superior",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/9481456b-7d4c-4b82-a9a6-ffcca3519c74.png"
                            }
                        },
                        "sameAs": [
                            "https://www.facebook.com/robosuperior",
                            "https://twitter.com/robosuperior",
                            "https://www.linkedin.com/company/robosuperior"
                        ]
                    })}
                </script>
            </Head>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400 transition-all duration-300 ease-in-out">
                        Short URL Generator
                    </h1>

                    {/* Input Section */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            value={longUrl}
                            onChange={(e) => setLongUrl(e.target.value)}
                            className="flex-1 dark:bg-[#2d3748] px-4 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                            placeholder="Enter Long URL"
                        />
                        <button
                            onClick={handleShorten}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            Shorten
                        </button>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto shadow-2xl rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-200 dark:bg-gray-700">
                                    <th className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200">ID</th>
                                    <th className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Long URL</th>
                                    <th className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Short URL</th>
                                    <th className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Clicks</th>
                                    <th className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {urls.map((url, index) => (
                                    <tr
                                        key={url._id}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
                                    >
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2 text-blue-500 truncate">{url.url}</td>
                                        <td className="px-4 py-2 text-blue-500">
                                            <button
                                                onClick={() =>
                                                    handleUrlClick(`${window.location.origin}/api/${url.code}`)
                                                }
                                                className="text-blue-500 underline hover:text-blue-700 transition duration-300 ease-in-out"
                                            >
                                                {`${window.location.origin}/api/${url.code}`}
                                            </button>
                                        </td>
                                        <td className="px-4 py-2">{url.click}</td>
                                        <td className="px-4 py-2 flex space-x-2">
                                            <button
                                                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-400 transition-all duration-300 ease-in-out"
                                                onClick={() =>
                                                    handleCopy(`${window.location.origin}/api/${url.code}`)
                                                }
                                            >
                                                Copy
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out"
                                                onClick={() => handleDelete(url._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {urls.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-2 text-center text-gray-600 dark:text-gray-300">
                                            No URLs available. Add some! 
                                            <span><Link className="underline" target="_blank" href="https:robosuperior.com/api/XT8_S_sgc"> https:robosuperior.com/api/XT8_S_sgc</Link></span>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShortURL;
