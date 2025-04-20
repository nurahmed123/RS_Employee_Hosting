import { BsPostcard } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useFetchData from "@/hooks/useFetchData";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Aside from "@/components/Aside";
import React from "react";
import { jwtDecode } from "jwt-decode";
import Head from "next/head";
import toast from "react-hot-toast";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import * as XLSX from 'xlsx';
import Datepicker from "react-tailwindcss-datepicker";
import Swal from "sweetalert2";
import { formatISO, format } from 'date-fns';
import Script from "next/script";

export default function userDiary() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = React.useState('opaque');
    const appLogoUrl = `https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/37b0a981-7d1e-4c79-ae16-47d31e4be6fa.png`;

    const router = useRouter();
    const [user, setUser] = useState({ value: null });
    const [author, setAuthor] = useState('');
    const [username, setUsername] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5); // Default number of blogs per page
    const [searchQuery, setSearchQuery] = useState('');

    const [option, setOption] = useState('');
    const [excepSearch, setExcepSearch] = useState('');
    const [note, setNote] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [reason, setReason] = useState('');
    const [cost, setCost] = useState();
    const [searchItem, setSearchItem] = useState();
    const [transType, setTransType] = useState();
    const [waiting, setWaiting] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null); // Track the note being edited
    const [noteColab, setNoteColab] = useState(false);
    const maxChar = 80;

    const [date, setDate] = useState({
        startDate: null,
        endDate: null
    });


    const [createdDate, setCreatedDate] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const [updateDate, setUpdatedDate] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    const handleOpen = (backdrop) => {
        setBackdrop(backdrop);
        onOpen();
    };

    useEffect(() => {
        const checkUser = () => {
            try {
                const token = localStorage.getItem("Token");
                if (token) {
                    const JWTData = jwtDecode(token);
                    setAuthor(JWTData.data._id); // Set author from JWT
                    setUsername(JWTData.data.username); // Set author from JWT
                    setUser(JWTData.data); // Set user data if needed
                } else {
                    // router.push('/login'); // Redirect if no token is found
                }
            } catch (err) {
                console.error(err);
                router.push('/login'); // Redirect on error
            }
        };
        checkUser();
    }, [router]);

    const sendAlert = (icon, title) => {
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
            icon: icon,
            title: title,
        });
    }

    // Fetch all blogs on component load
    const { alldata, loading } = useFetchData(username ? `/api/diary?userid=${author}` : {});
    let allNotes = alldata;


    function closeReset() {
        setOption('');
        setNote('');
        setTransactionType('');
        setReason('');
        setCost('');
        onClose()
    }

    useEffect(() => {
        if (editingNoteId) {
            const noteToEdit = allNotes.find(note => note._id === editingNoteId);
            if (noteToEdit) {
                setOption(noteToEdit.note ? 'note' : 'hisab');
                setNote(noteToEdit.note || '');
                setTransactionType(noteToEdit.transactionType || '');
                setReason(noteToEdit.reason || '');
                setCost(noteToEdit.cost || '');
                setCreatedDate({
                    startDate: new Date(noteToEdit.createdAt),
                    endDate: new Date(noteToEdit.createdAt)
                });
                setUpdatedDate({
                    startDate: new Date(noteToEdit.updatedAt),
                    endDate: new Date(noteToEdit.updatedAt)
                });
            }
        } else {
            setNote('');
            setTransactionType('');
            setReason('');
            setCost('');
        }
    }, [editingNoteId, allNotes]);

    const filteredBlogs = useMemo(() => {
        if (!allNotes || allNotes.length === 0) return [];

        const normalizedQuery = searchQuery.trim().toLowerCase();
        const startDate = date.startDate ? new Date(date.startDate).setHours(0, 0, 0, 0) : null;
        const endDate = date.endDate
            ? new Date(date.endDate).setHours(23, 59, 59, 999)
            : startDate;

        // Return all notes if no filters are applied
        if (!normalizedQuery && !searchItem && !date.startDate && !date.endDate) {
            return allNotes;
        }

        const filterNotes = (note) => {
            // Date range filter
            if (startDate && endDate) {
                const noteDate = new Date(note.createdAt).getTime();
                if (noteDate < startDate || noteDate > endDate) return false;
            }

            // Filter for "note" selection
            if (searchItem === "$.2") {
                // Show only notes that have a `note` property and no `cost`
                if (!note.note || note.cost) return false;

                if (
                    normalizedQuery &&
                    excepSearch === "without" &&
                    note.note.toLowerCase().includes(normalizedQuery)
                ) return false;

                if (
                    normalizedQuery &&
                    excepSearch !== "without" &&
                    !note.note.toLowerCase().includes(normalizedQuery)
                ) return false;
            }

            // Filter for "amount" selection
            if (searchItem === "$.1") {
                // Ensure only notes with a cost are included
                if (!note.cost) return false;

                // If transactionType is specified and not "all", filter by the type
                if (transType && transType !== "all" && note.transactionType !== transType.toLowerCase()) {
                    return false;
                }

                if (
                    normalizedQuery &&
                    excepSearch === "without" &&
                    note.reason.toLowerCase().includes(normalizedQuery)
                ) return false;

                if (
                    normalizedQuery &&
                    excepSearch !== "without" &&
                    !note.reason.toLowerCase().includes(normalizedQuery)
                ) return false;
            }

            // Default behavior: Show all notes when no specific filters are applied
            if (!searchItem) {
                if (
                    normalizedQuery &&
                    excepSearch === "without" &&
                    note.note.toLowerCase().includes(normalizedQuery)
                ) return false;

                if (
                    normalizedQuery &&
                    excepSearch !== "without" &&
                    !note.note.toLowerCase().includes(normalizedQuery)
                ) return false;
            }

            return true;
        };

        return allNotes.filter(filterNotes);
    }, [
        allNotes,
        searchQuery,
        excepSearch,
        searchItem,
        transType,
        date.startDate,
        date.endDate,
    ]);

    const totalCost = useMemo(() => {
        if (!filteredBlogs || filteredBlogs.length === 0) return 0;

        const calculateTotalCost = (notes) => {
            return notes.reduce((total, note) => {
                const costValue = parseFloat(note.cost);
                return total + (isNaN(costValue) ? 0 : costValue);
            }, 0);
        };

        return calculateTotalCost(filteredBlogs);
    }, [filteredBlogs]);


    // Calculate total number of filtered blogs
    const totalFilteredBlogs = filteredBlogs.length;
    // Calculate the currently displayed blogs with pagination logic
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Pagination page numbers calculation
    const pageNumbers = useMemo(() => {
        const totalPages = Math.ceil(totalFilteredBlogs / perPage);
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [totalFilteredBlogs, perPage]);

    // Paginate function to change page
    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= pageNumbers.length) {
            setCurrentPage(pageNumber);
        }
    };

    const filterExportData = (data) => {
        return data.map(item => {
            const { _id, userid, username, updatedAt, __v, ...filteredItem } = item;
            return filteredItem;
        });
    };

    // Function to export data to an Excel file
    const exportToExcel = (data, fileName = 'data.xlsx') => {
        if (username) {
            if (data.length >= 1) {
                const filteredData = filterExportData(data);
                const worksheet = XLSX.utils.json_to_sheet(filteredData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
                XLSX.writeFile(workbook, fileName);
                sendAlert('success', 'Data exported successfully!');
            } else {
                sendAlert('error', 'No data to export!');
            }
        } else {
            sendAlert('error', 'Please login to export data!');
        }
    };

    async function createProduct(ev) {
        ev.preventDefault();
        let formatedDate = formatISO(new Date(createdDate.endDate), { representation: 'complete' })

        const data = { userid: author, username, transactionType, reason, note, cost, createdAt: formatedDate };
        if (username && author) {
            setWaiting(true);
            try {
                if (editingNoteId) {
                    await axios.put('/api/diary', { ...data, _id: editingNoteId });
                    sendAlert('success', 'Note Updated!');
                    onClose();
                    setEditingNoteId(null); // Reset editing note ID
                    router.push("/a");
                } else {
                    await axios.post('/api/diary', data);
                    sendAlert('success', 'Note Created!');
                    onClose();
                    router.push("/a");
                }
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || 'An error occurred!');
            } finally {
                setWaiting(false);
            }
        } else {
            sendAlert('error', 'Please login to create a note!');
        }
    }
    function editNote(id) {
        setEditingNoteId(id);
        handleOpen('opaque');
    }

    // if (user.value === null) {
    //     return null; // Prevent rendering if user data is not yet available
    // }

    return (
        <>
            <Head>
                {/* Primary Metadata */}
                <title>Private Diary - Secure Notes & Expense Tracker | RoboSuperior</title>
                <meta
                    name="description"
                    content="Private Diary: A secure app to store personal notes, track expenses, and manage budgets. Keep your memories and financial records safe and accessible."
                />
                <meta
                    name="keywords"
                    content="secure diary, personal notes app, expense tracker, monthly budgeting, private notes, spending tracker, memory storage, RoboSuperior diary, secure notes and budgeting"
                />
                <meta name="author" content="RoboSuperior" />
                <link rel="canonical" href="https://robosuperior.com" />

                {/* Open Graph Metadata (Social Sharing) */}
                <meta property="og:title" content="Private Diary - Secure Notes & Expense Tracker" />
                <meta
                    property="og:description"
                    content="Securely store your personal notes and track expenses with Private Diary. Manage your memories and finances in one app with peace of mind."
                />
                <meta property="og:image" content={`https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/f39d4062-8da7-4198-9168-1977f5ceecd8.jpeg`} />
                <meta property="og:url" content="https://robosuperior.com" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Private Diary by RoboSuperior" />

                {/* Twitter Card Metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Private Diary - Secure Notes & Expense Tracker" />
                <meta
                    name="twitter:description"
                    content="Private Diary helps you track expenses, store personal notes securely, and manage your finances with ease. A must-have app for privacy-conscious users."
                />
                <meta name="twitter:image" content={`https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/f39d4062-8da7-4198-9168-1977f5ceecd8.jpeg`} />
                <meta name="twitter:site" content="@RoboSuperior" />
                <meta name="twitter:creator" content="@RoboSuperior" />

                {/* Robots and Crawling */}
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />

                {/* Language and Locale */}
                <meta httpEquiv="Content-Language" content="en" />
                <meta name="language" content="English" />

                {/* Apple Touch Icon */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Private Diary",
                        "url": "https://robosuperior.com",
                        "description":
                            "Private Diary helps you securely store personal notes, track monthly expenses, and manage your budget effectively.",
                        "applicationCategory": "FinanceApplication",
                        "operatingSystem": "iOS, Android, Web",
                        "author": {
                            "@type": "Organization",
                            "name": "RoboSuperior",
                            "url": "https://robosuperior.com",
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": "0.00",
                            "priceCurrency": "USD",
                            "availability": "https://schema.org/InStock",
                        },
                        "image": appLogoUrl,
                    })}
                </script>
                {/* Viewport for Mobile Optimization */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <Modal
                className="dark:!bg-[#1a202c] !shadow-xl"
                backdrop="blur"
                isDismissable={false}
                size="3xl"
                isOpen={isOpen}
                onClose={closeReset}
            >
                <ModalContent className="rounded-lg overflow-y-auto shadow-lg bg-white dark:bg-[#1c1c1e]">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className="text-lg font-bold dark:text-gray-200">Make Note</h2>
                            </ModalHeader>
                            <ModalBody className="w-full max-w-3xl">
                                <form className="w-full rounded-md">
                                    {/* Select Option */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                                            Select Option
                                        </label>
                                        <select
                                            isRequired
                                            required
                                            className="block w-full p-2 sm:p-4 border-gray-300 rounded-md shadow-sm bg-slate-100 dark:border-gray-600 dark:bg-[#2d3748] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6466f1] focus:border-transparent"
                                            value={option}
                                            onChange={(e) => setOption(e.target.value)}
                                        >
                                            <option value="">Select...</option>
                                            <option value="note">Note</option>
                                            <option value="hisab">Hisab</option>
                                        </select>
                                    </div>

                                    {/* Note Input */}
                                    {option === "note" && (
                                        <div className="mb-4" id="modalInput">
                                            <Textarea
                                                isRequired
                                                required
                                                label="Note"
                                                placeholder="Enter your note here..."
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                className="dark:!text-gray-200 w-full"
                                            />
                                            {!note && (
                                                <p className="text-sm text-teal-500 opacity-90 mt-1">Please fill out this field.</p>
                                            )}
                                            <div className="mt-2" id="modalDateInput">
                                                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                                                    Created At
                                                </label>
                                                <Datepicker
                                                    useRange={false}
                                                    asSingle={true}
                                                    primaryColor={"violet"}
                                                    value={createdDate}
                                                    onChange={newValue => setCreatedDate(newValue)}
                                                />
                                                {
                                                    editingNoteId &&
                                                    <>
                                                        <label className="block inset-shadow-indigo-500 text-sm font-medium text-gray-700 mt-2 mb-1 dark:text-gray-300">
                                                            Updated At
                                                        </label>
                                                        <Datepicker
                                                            disabled
                                                            useRange={false}
                                                            asSingle={true}
                                                            primaryColor={"violet"}
                                                            value={updateDate}
                                                            onChange={newValue => setUpdatedDate(newValue)}
                                                        />
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    )}

                                    {/* Hisab Input Fields */}
                                    {option === "hisab" && (
                                        <>
                                            <div className="mb-4" id="modalInput">
                                                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                                                    Spend in
                                                </label>
                                                <Input
                                                    isRequired
                                                    required
                                                    autoFocus
                                                    label="Spend in"
                                                    type="text"
                                                    placeholder="Enter short text..."
                                                    value={reason}
                                                    onChange={(e) => setReason(e.target.value)}
                                                    className="w-full dark:text-gray-200"
                                                />
                                                {!reason && (
                                                    <p className="text-sm text-teal-500 opacity-90 mt-1">Please fill out this field.</p>
                                                )}
                                            </div>
                                            <div className="mb-4" id="modalInput">
                                                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                                                    Cost
                                                </label>
                                                <Input
                                                    isRequired
                                                    required
                                                    label="Cost"
                                                    type="number"
                                                    placeholder="Enter cost..."
                                                    value={cost}
                                                    onChange={(e) => setCost(e.target.value)}
                                                    className="w-full dark:text-gray-200"
                                                />
                                                {!cost && (
                                                    <p className="text-sm text-teal-500 opacity-90 mt-1">Please fill out this field.</p>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                                                    Hisab
                                                </label>
                                                <select
                                                    isRequired
                                                    required
                                                    className="block w-full p-2 sm:p-4 border-gray-300 rounded-md shadow-sm dark:border-gray-600 bg-slate-100 dark:bg-[#2d3748] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6466f1] focus:border-transparent"
                                                    value={transactionType}
                                                    onChange={(e) => setTransactionType(e.target.value)}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="debit">Debit</option>
                                                    <option value="credit">Credit</option>
                                                    <option value="borrowed">Borrowed</option>
                                                    <option value="lent">Lent</option>
                                                </select>
                                                {!transactionType && (
                                                    <p className="text-sm text-teal-500 opacity-90 mt-1">Please select an option.</p>
                                                )}
                                                <div id="modalDateInput">
                                                    <label className="block inset-shadow-indigo-500 text-sm font-medium text-gray-700 mt-2 mb-1 dark:text-gray-300">
                                                        Created At
                                                    </label>
                                                    <Datepicker
                                                        useRange={false}
                                                        asSingle={true}
                                                        primaryColor={"violet"}
                                                        value={createdDate}
                                                        onChange={newValue => setCreatedDate(newValue)}
                                                    />
                                                    {
                                                        editingNoteId &&
                                                        <>
                                                            <label className="block inset-shadow-indigo-500 text-sm font-medium text-gray-700 mt-2 mb-1 dark:text-gray-300">
                                                                Updated At
                                                            </label>
                                                            <Datepicker
                                                                disabled
                                                                useRange={false}
                                                                asSingle={true}
                                                                primaryColor={"violet"}
                                                                value={updateDate}
                                                                onChange={newValue => setUpdatedDate(newValue)}
                                                            />
                                                        </>
                                                    }
                                                </div>

                                            </div>
                                        </>
                                    )}

                                    {/* Create/Update Button */}
                                    <Button
                                        disabled={
                                            waiting ||
                                            (option === "note" ? !note : !reason || !cost || !transactionType)
                                        }
                                        type="submit"
                                        color="primary"
                                        className={`mt-4 w-full ${option === "note"
                                            ? !note
                                                ? "bg-gray-300 cursor-not-allowed"
                                                : "bg-[#6466f1]"
                                            : !reason || !cost || !transactionType
                                                ? "bg-gray-300 cursor-not-allowed"
                                                : "bg-[#6466f1]"
                                            } dark:bg-[#6466f1] dark:hover:bg-[#424f85] dark:hover:!border-[#38457b]`}
                                        onClick={createProduct}
                                    >
                                        {editingNoteId ? waiting ? "Updating..." : "Update" : waiting ? "Creating..." : "Create"}
                                    </Button>
                                </form>
                            </ModalBody>
                            <ModalFooter className="flex justify-between">
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={closeReset}
                                    className="w-full sm:w-auto mr-2"
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <div className="container !my-16 px-4 md:px-8 lg:px-12">
                <div className="titledashboard flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div data-aos="fade-right">
                        <h2 className="dark:text-[#6466f1] text-xl md:text-2xl">Your All<span className="dark:text-gray-100"> History</span></h2>
                        <h3 className="dark:text-[#6466f1] text-lg md:text-xl">ADMIN PANEL</h3>
                    </div>

                    <div className="breadcrumb dark:text-[#6466f1] flex gap-2 flex-wrap items-center text-sm md:text-base" data-aos="fade-left">
                        <BsPostcard className="dark:text-[#6466f1]" />
                        <span className="dark:text-[#6466f1]">/</span>

                        <span
                            className="underline cursor-pointer hover:underline-offset-4 dark:text-[#6466f1]"
                            onClick={handleOpen}
                        >
                            Add Note
                        </span>

                        <span className="dark:text-[#6466f1]">/</span>

                        <span
                            className="underline cursor-pointer hover:underline-offset-4 dark:text-[#6466f1]"
                            onClick={() => exportToExcel(filteredBlogs)}
                        >
                            Export
                        </span>
                    </div>
                </div>

                <div className="blogstable mt-6">
                    <div className="flex justify-center text-center">
                        {/* Adsterra Banner Ad Script */}
                        <Script
                            strategy="afterInteractive" // Load after page is interactive
                            type="text/javascript"
                            dangerouslySetInnerHTML={{
                                __html: `
                                    atOptions = {
                                    'key' : 'e3e85e80cf459ac6e6ac495fb75a1982',
                                    'format' : 'iframe',
                                    'height' : 90,
                                    'width' : 1000,
                                    'params' : {}
                                    };
                                `,
                            }}
                        />
                        <Script
                            strategy="afterInteractive"
                            src="//www.highperformanceformat.com/e3e85e80cf459ac6e6ac495fb75a1982/invoke.js"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4 items-center" data-aos="fade-left">
                        <h2 className="dark:text-gray-100 text-lg sm:w-full md:w-auto">Search {searchItem !== "$.1" ? "Note" : "Transaction"}:</h2>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`Search by ${searchItem !== "$.1" ? "Note" : "Spend at..."}`}
                            className="dark:text-gray-200 dark:bg-[#2d3748] p-2 rounded-md w-full md:w-auto sm:flex-grow"
                        />
                        <div id="datePicker" className="dark:text-gray-200 p-2 rounded-md w-full md:w-auto sm:flex-grow">
                            <Datepicker
                                value={date}
                                primaryColor={"violet"}
                                onChange={newDate => setDate(newDate)}
                                showShortcuts={true}
                            />
                        </div>

                        <select
                            value={excepSearch}
                            onChange={(e) => {
                                setExcepSearch(e.target.value); // Update perPage based on dropdown selection
                            }}
                            className="w-full md:w-auto block p-4 border-gray-300 rounded-md shadow-sm dark:border-gray-600 bg-slate-100 dark:bg-[#2d3748] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6466f1] focus:border-transparent sm:flex-grow"
                        >
                            <option value={"with"}>Search with</option>
                            <option value={"without"}>Search Without</option>
                        </select>

                        <select
                            value={perPage}
                            onChange={(e) => {
                                setPerPage(Number(e.target.value)); // Update perPage based on dropdown selection
                                setCurrentPage(1); // Reset to first page when perPage changes
                            }}
                            className="w-full md:w-auto block p-4 border-gray-300 rounded-md shadow-sm dark:border-gray-600 bg-slate-100 dark:bg-[#2d3748] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6466f1] focus:border-transparent sm:flex-grow"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>

                        <select
                            className="w-full md:w-auto block p-4 border-gray-300 rounded-md shadow-sm dark:border-gray-600 bg-slate-100 dark:bg-[#2d3748] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6466f1] focus:border-transparent sm:flex-grow"
                            value={searchItem}
                            onChange={(e) => setSearchItem(e.target.value)}
                        >
                            <option value="$.0">All</option>
                            <option value="$.1">Amount</option>
                            <option value="$.2">Note</option>
                        </select>

                        {searchItem === "$.1" && (
                            <select
                                className="w-full md:w-auto block p-4 border-gray-300 rounded-md shadow-sm dark:border-gray-600 bg-slate-100 dark:bg-[#2d3748] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6466f1] focus:border-transparent sm:flex-grow"
                                value={transType}
                                onChange={(e) => setTransType(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="debit">Debit</option>
                                <option value="credit">Credit</option>
                                <option value="borrowed">Borrowed</option>
                                <option value="lent">Lent</option>
                            </select>
                        )}
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg dark:bg-[#2d3748]">
                            <thead className="bg-[#6466f1] text-white dark:bg-[#6466f1]">
                                <tr>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200">#</th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200">Type</th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200">Transaction Type</th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200">Spent at / Reason</th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200">Note</th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200">Cost</th>
                                    <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200">Edit / Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {username && loading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 dark:bg-[#2d3748] dark:text-gray-100">Loading...</td>
                                    </tr>
                                ) : (
                                    <>
                                        {currentBlogs.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4 dark:bg-[#2d3748] dark:text-gray-100">
                                                    {username ? (
                                                        "No notes found.... Create Note"
                                                    ) : (
                                                        <>
                                                            Please{" "}
                                                            <Link href="/login">
                                                                <span className="font-mono hover:underline">login</span>
                                                            </Link>{" "}
                                                            to view your notes...
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ) : (
                                            [...currentBlogs] // Clone the array to avoid mutating the original
                                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
                                                .map((blog, index) => (
                                                    <tr
                                                        key={blog._id}
                                                        className="border-b dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200"
                                                    >
                                                        <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200">
                                                            {index + 1} {/* Adjusted index based on sorted order */}
                                                        </td>
                                                        <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 break-words">
                                                            {blog.note ? "Note" : "Spend"}
                                                        </td>
                                                        <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 break-words text-sm sm:text-base lg:text-lg">
                                                            <div className="relative flex flex-wrap items-center gap-2 sm:gap-4">
                                                                <span className="whitespace-nowrap font-medium text-gray-700 dark:text-gray-100 hover:text-indigo-600 transition duration-200">
                                                                    {blog.transactionType
                                                                        ? blog.transactionType.charAt(0).toUpperCase() +
                                                                        blog.transactionType.slice(1)
                                                                        : "N/A"}
                                                                </span>
                                                                <span
                                                                    onClick={() =>
                                                                        setDate({
                                                                            startDate: format(blog.createdAt, 'yyyy-MM-dd'),
                                                                            endDate: format(blog.createdAt, 'yyyy-MM-dd'),
                                                                        })
                                                                    }
                                                                    className="sm:inline-block sm:relative sm:top-0 sm:right-0 sm:translate-x-0 sm:translate-y-0 sm:mt-0 flex items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a202c] py-1 px-3 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-200 shadow-lg cursor-pointer transition duration-200 hover:bg-indigo-50 dark:hover:bg-[#1c2b48]"
                                                                >
                                                                    {format(blog.createdAt, 'EEE MMM dd yyyy')}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 break-words">
                                                            {blog.reason}
                                                        </td>
                                                        <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200 break-words">
                                                            {blog.note.length > maxChar ? (
                                                                <span
                                                                    onClick={() => setNoteColab(!noteColab)}
                                                                    style={
                                                                        blog.note.length > maxChar && !noteColab
                                                                            ? { textShadow: "#3c34344a 5px 5px 10px" }
                                                                            : {}
                                                                    }
                                                                    className={`${blog.note.length > maxChar ? "cursor-pointer" : ""
                                                                        }`}
                                                                >
                                                                    {!noteColab
                                                                        ? blog.note.length > maxChar
                                                                            ? blog.note.substring(0, maxChar) + " ...."
                                                                            : blog.note
                                                                        : blog.note || "N/A"}
                                                                </span>
                                                            ) : (
                                                                blog.note || "N/A"
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 border-r dark:bg-[#3a4964] dark:text-gray-100 dark:border-gray-200">
                                                            {blog.cost || "N/A"}
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => editNote(blog._id)}
                                                                    className="dark:text-gray-100 dark:bg-[radial-gradient(black,transparent)] dark:hover:bg-[#424f85] hover:border-[#38457b]"
                                                                >
                                                                    <FaEdit /> Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => router.push(`/privatenote/delete/${blog._id}`)}
                                                                    className="dark:text-gray-100 dark:bg-red-500"
                                                                >
                                                                    <RiDeleteBin6Fill /> Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                        )}
                                    </>

                                )}
                            </tbody>
                            {searchItem === "$.1" && (
                                <thead className="bg-[#6466f1] text-white dark:bg-[#6466f1]">
                                    <tr>
                                        <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200">#</th>
                                        <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200"></th>
                                        <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200">Total</th>
                                        <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200"></th>
                                        <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200"></th>
                                        <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200">{totalCost}</th>
                                        <th className="px-4 py-2 text-left border-b dark:bg-[#2d3748] dark:text-gray-100 dark:border-gray-200"></th>
                                    </tr>
                                </thead>
                            )}
                        </table>
                    </div>

                    {totalFilteredBlogs > 0 && (
                        <div className="blogpagination mt-4 flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border rounded-md disabled:opacity-50 dark:bg-gray-800 dark:text-gray-100"
                            >
                                Previous
                            </button>
                            {pageNumbers.map(number => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`px-4 py-2 border rounded-md ${currentPage === number ? '!bg-[#8a8dd8] dark:!bg-gray-700' : 'dark:bg-[#1c2532] bg-gray-400'} dark:text-gray-100 `}
                                >
                                    {number}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === pageNumbers.length}
                                className="px-4 py-2 border rounded-md disabled:opacity-50 dark:bg-gray-800 dark:text-gray-100"
                            >
                                Next
                            </button>
                        </div>
                    )}

                </div>
            </div >
        </>
    );
}
