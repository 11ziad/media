import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, userPosts } from '../Redux/postsSlice'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../UserContext/UserContext'
import Loader from '../Loader/Loader'
import { motion } from 'framer-motion'

export default function PostDetails() {
    let { posts, loading } = useSelector((store) => store.postsReducer)
    let { userProfile } = useContext(UserContext)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
        dispatch(userPosts())
    }, [])

    let controlOpacity = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                delay: 0.4,
            },
        },
    }

    // Sort posts by createdAt (newest first)
    const sortedPosts = posts?.posts
        ? [...posts?.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : []

    return (
        <>
                    <motion.section
                variants={controlOpacity}
                initial="hidden"
                animate="visible"
                className="flex gap-y-6 flex-col justify-center py-9 lg:px-24 m-auto -mt-2"
            >
                {loading ? (
                    <Loader></Loader>
                ) : (
                    <>
                        <header className="bg-white dark:bg-gray-800 m-auto py-3 px-4  lg:w-6/12 shadow-md rounded-lg overflow-hidden w-11/12">
                            <div className="border-b mb-3 pt-3 border-gray-400 pb-4 flex flex-col">
                                <div className="flex mb-2 items-center">
                                    <NavLink to={'profile'}>
                                        <img
                                            src={userProfile?.photo}
                                            className="w-[40px] object-cover  h-[40px] rounded-full"
                                            alt=""
                                        />
                                    </NavLink>
                                    <div className="relative ms-3 w-full">
                                        <NavLink to={'addPost'}>
                                            <input
                                                type="text"
                                                id="simple-search"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5  dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder={`What are you thinking ${userProfile?.name}?...`}
                                                required
                                            />
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-500 dark:text-gray-300 text-sm lg:text-md lg:font-medium justify-around px-5 mt-3">
                                <NavLink to={'addPost'}>
                                    Reals{' '}
                                    <span>
                                        <i className="text-red-400 mt-2 text-md lg:text-xl ms-1 fa-solid fa-film"></i>
                                    </span>
                                </NavLink>
                                <NavLink to={'addPost'}>
                                    Photo{' '}
                                    <span>
                                        <i className="text-green-700 mt-2 text-md lg:text-xl ms-1 fa-solid fa-images"></i>
                                    </span>
                                </NavLink>
                                <NavLink to={'addPost'}>
                                    Live{' '}
                                    <span>
                                        <i className="text-red-600 text-md lg:text-xl mt-2 lg:translate-y-0.5 ms-1 fa-solid fa-video"></i>
                                    </span>
                                </NavLink>
                            </div>
                        </header>
                        {sortedPosts?.map((post) => 
                            <>
                            {post.body || post.image ?
                            <div
                                key={post.id}
                                className="lg:w-6/12 shadow-md rounded-lg overflow-hidden w-11/12 pt-3 m-auto dark:bg-gray-800 dark:text-gray-200 bg-amber-50"
                            >
                                <div className="px-3 mb-4 flex items-center">
                                    <img
                                        src={post.user?.photo}
                                        className="md:w-[40px] object-center me-3 md:h-[40px] h-[30px] w-[30px] rounded-full"
                                        alt=""
                                    />
                                    <div className="flex flex-col text-sm">
                                        <h3 className="text-[13px] md:text-[14px] font-medium">{post.user?.name}</h3>
                                        <span className="text-[11px] md:text-[13px]">{post.createdAt.slice(0, 10)}</span>
                                    </div>
                                </div>
                                <p className="ps-4 pb-3 pt-3 text-sm">{post.body}</p>
                                {post.image && (
                                    <img src={post.image} className="w-full md:h-[300px] h-[240px] object-cover" alt="" />
                                )}
                                <div className="flex justify-around w-full  px-3 mt-5  py-2 dark:text-gray-400 text-gray-500 items-center">
                                            <div className="w-full">
                                        <NavLink to={`allComment/${post.id}`}>
                                        <input
                                        type="text"
                                        id="content"    
                                        className="block w-full p-3.5 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 transition-all duration-300"
                                        placeholder="Add Comment..."
                                        required
                                        />
                                    </NavLink>
                                    </div>
                                </div>
                            </div>
                            : null}
                            </>
                        )}
                    </>
                )}
            </motion.section>
        </>
    )
}
