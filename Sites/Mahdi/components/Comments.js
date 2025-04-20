import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Image from 'next/image'
import { jwtDecode } from "jwt-decode";

const Comments = ({ slug }) => {
    const image = `data:image/png;base64,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`
    const [user, setUser] = useState(null);
    const [userid, setUserid] = useState("");
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");
    const [editCommentText, setEditCommentText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [allComments, setAllComments] = useState([]);

    // Check user authentication and token validity
    useEffect(() => {
        const token = localStorage.getItem("Token");
        if (token) {
            setUser(token);
            const JWTData = jwtDecode(token);
            setUserid(JWTData.data._id);
            setUsername(JWTData.data.username);
        } else {
            setUser(null);
        }
    }, []);

    // Fetch comments based on the slug
    useEffect(() => {
        if (slug) {
            const fetchComments = async () => {
                try {
                    const response = await axios.get(`/api/comment?slug=${slug}`);
                    setAllComments(response.data);
                } catch (error) {
                    console.error("Error fetching comments:", error);
                }
            };
            fetchComments();
        }
    }, [slug]);

    // Post new comment or update existing comment
    const postComment = async (ev) => {
        ev.preventDefault();

        if (!userid) {
            Swal.fire({
                icon: 'error',
                title: 'Not logged in',
                text: 'Please log in to post a comment.',
            });
            return;
        }

        const url = editingCommentId ? '/api/comment' : '/api/comment';
        const method = editingCommentId ? 'PUT' : 'POST';
        const data = editingCommentId
            ? { editingCommentId, userid, username, comment: editCommentText, slug }
            : { userid, username, comment, slug };

        try {
            await axios({ url, method, data });
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
                title: editingCommentId ? "Comment Updated" : "Comment added"
            });
            setEditingCommentId(null);
            setEditCommentText("");
            setComment("");
            // Fetch updated comments
            const response = await axios.get(`/api/comment?slug=${slug}`);
            setAllComments(response.data);
        } catch (error) {
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
                title: "Something is wrong"
            });
            console.error(`Error ${editingCommentId ? 'updating' : 'posting'} comment:`, error);
        }
    };

    // Delete comment
    const deleteComment = async (commentId) => {
        try {
            await axios.delete('/api/comment', { data: { commentId } });
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
                title: "Comment Deleted"
            });
            // Fetch updated comments
            const response = await axios.get(`/api/comment?slug=${slug}`);
            setAllComments(response.data);
        } catch (error) {
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
                title: "Something is wrong"
            });
            console.error("Error deleting comment:", error);
        }
    };

    // Start editing comment
    const startEditing = (commentId, commentText) => {
        setEditingCommentId(commentId);
        setEditCommentText(commentText);
    };

    return (
        <>
            <div className="flex items-center justify-center mt-2 mb-7 w-full max-w-5xl mx-auto rounded-lg dark:border-black">
                <form onSubmit={postComment} className="w-full bg-white shadow-xl mx-4 md:mx-16 lg:mx-0 mb-4 rounded-lg px-4 pt-2 dark:bg-slate-700">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg lg:text-xl font-bold my-4 dark:text-gray-100">
                            {editingCommentId ? "Edit your comment" : "Add a new comment"}
                        </h2>
                        <div className="w-full md:w-full px-3 mb-2 mt-2">
                            <textarea
                                className="bg-gray-100 rounded !border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white dark:bg-slate-600 dark:text-gray-200 dark:placeholder-gray-400"
                                name="comment"
                                placeholder="Type Your Comment"
                                required
                                value={editingCommentId ? editCommentText : comment}
                                onChange={ev => editingCommentId ? setEditCommentText(ev.target.value) : setComment(ev.target.value)}
                            ></textarea>
                        </div>
                        <div className="w-full md:w-full flex items-start px-3">
                            {user ? (
                                <input
                                    type="submit"
                                    className="disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1 cursor-pointer"
                                    value={editingCommentId ? "Update Comment" : "Post Comment"}
                                />
                            ) : (
                                <p className="text-gray-800 font-bold dark:text-gray-100">
                                    <Link href="/login">Login</Link> to comment...
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <div className="max-w-5xl mx-auto pt-4 pb-8">
                <h3 className="mb-2 mx-4 text-2xl font-semibold dark:text-gray-300">Comments ({allComments.length})</h3>
                <hr className="mb-1" />
                {allComments.map((comment) => (
                    <div key={comment._id} className="max-w-screen-sm px-4 my-3">
                        <div className="flex">
                            <div className="rounded-full flex-shrink-0 mr-2">
                                {/* <img
                                    src="/img/coder.png"
                                    alt=""
                                    style={{ height: "5rem", width: "4rem" }}
                                    className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                /> */}
                                <Image src={image} className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" alt="user" style={{ height: "5rem" }} height={"50"} width={"50"} />
                            </div>
                            <div className="shadow-xl flex-1 !border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed max-w-[75vw] break-words dark:bg-slate-700 dark:border-black">
                                <strong className="dark:text-gray-200">{comment.username}</strong>
                                <span className="text-xs text-gray-500 ml-2 dark:text-gray-400">{comment.createdAt}</span>
                                <div className="flex">
                                    <p className="text-sm mt-1 dark:text-gray-100">{comment.comment}</p>
                                </div>
                                {user && comment.userid === userid && (
                                    <div className="mt-2 flex space-x-2">
                                        <button
                                            onClick={() => startEditing(comment._id, comment.comment)}
                                            className="text-indigo-500 hover:text-indigo-800"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteComment(comment._id)}
                                            className="text-red-500 hover:text-red-800 "
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Comments;
