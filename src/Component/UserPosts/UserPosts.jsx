import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userPosts } from '../Redux/postsSlice';
import Loader from '../Loader/Loader';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function UserPosts() {
  const [sureDelete, setSureDelete] = useState(false);
  const { loading, userPost } = useSelector((store) => store.postsReducer);
  const dispatch = useDispatch();

  const token = jwtDecode(localStorage.getItem('token'));

  async function deletePost(id) {
    setSureDelete(false);
    try {
      const { data } = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      toast.success(data.message);
      // After deleting the post, refresh the user's posts
      dispatch(userPosts(token.user));
    } catch (err) {
      console.log(err);
    }
  }

  function deletePosts(id) {
    deletePost(id);
    setSureDelete(false); // Reset confirmation modal
  }

  useEffect(() => {
    dispatch(userPosts(token.user));
  }, [dispatch, token.user]);

  // Sort posts by createdAt in descending order (recent posts first)
  const sortedPosts = userPost?.posts
    ? [...userPost?.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const setAnimation = {
    hidden: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.1,
        type: 'spring',
        stiffness: 70,
      },
    },
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="flex gap-y-6 flex-col justify-center py-9 lg:px-24 m-auto -mt-2">
          {sortedPosts?.map((post) => (
            <div key={post.id} className="lg:w-7/12 relative shadow-md rounded-lg overflow-hidden w-11/12 pt-3 m-auto dark:bg-gray-800 dark:text-gray-200 bg-amber-50">
              <i
                onClick={() => setSureDelete(true)}
                className="absolute top-3 right-3 hover:cursor-pointer text-red-500 text-xl fa-solid fa-trash"
              ></i>
              <div className="px-3 mb-4 flex items-center">
                <img
                  src={post.user.photo}
                  className="md:w-[40px] object-cover me-3 md:h-[40px] h-[30px] w-[30px] rounded-full"
                  alt=""
                />
                <div className="flex flex-col text-sm">
                  <h3 className="text-[13px] md:text-[14px] font-medium">
                    {post.user.name}
                  </h3>
                  <span className="text-[11px] md:text-[13px]">
                    {post.createdAt.slice(0, 10)}
                  </span>
                </div>
              </div>
              <p className="ps-4 pb-3 pt-3 text-sm">{post.body}</p>
              {post.image && (
                <img
                  src={post.image}
                  className="w-full md:h-[300px] h-[240px] object-cover"
                  alt=""
                />
              )}
                   <div className="flex justify-around w-full  px-3 mt-5  py-2 dark:text-gray-400 text-gray-500 items-center">
               
                                                           <div className="w-full">
                                                       <NavLink to={`allComment/${post.id}`}>
                                                       <input
                                                       type="text"
                                                       id="content"
                                                       className="block w-full p-3.5 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none dark:bg-gray-500 dark:text-black transition-all duration-300"
                                                       placeholder="Add Comment..."
                                                       required
                                                       />
                                                   </NavLink>
                                                   </div>
                                               </div>
              {sureDelete && (
                <motion.div
                  variants={setAnimation}
                  initial="hidden"
                  animate="visible"
                  className="rounded-xl shadow-xl dark:text-gray-200 text-black dark:bg-gray-500 bg-gray-300 w-11/12 lg:w-1/3 m-auto fixed left-0 right-0 lg:top-52 lg:bottom-30 top-60 bottom-40 lg:left-52 lg:right-52 flex-col flex justify-center items-center"
                >
                  <i
                    onClick={() => setSureDelete(false)}
                    className="fa-solid fa-xmark absolute hover:cursor-pointer top-3 right-3 text-2xl"
                  ></i>
                  <h3 className="mb-5 font-medium">Are you sure you want to delete this post?</h3>
                  <button
                    onClick={() => deletePosts(post.id)}
                    className="cursor-pointer w-1/2 py-3 rounded-2xl bg-red-500 text-white"
                  >
                    Delete Post
                  </button>
                </motion.div>
              )}
            </div>
          ))}
        </section>
      )}
    </>
  );
}
