import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../Redux/postsSlice';
import { NavLink, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast'
import { useFormik } from 'formik';
import axios from 'axios';
import LoadingComment from '../LoadingComment/LoadingComment';

export default function AllComment() {
  const [load, setLoad] = useState(false);
  const [showComment, setShowComment] = useState(true);
  let { id } = useParams();
  let { post, loading } = useSelector((state) => state.postsReducer);
  let dispatch = useDispatch();


  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  // Sort comments by createdAt (latest comments first)
  const sortedComments = post?.comments
    ? [...post?.comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  // Function to handle adding a comment
  async function userComment(value) {
    setLoad(true);
    try {
      // Post the new comment to the backend
      let { data } = await axios.post(
        `https://linked-posts.routemisr.com/comments`,
        value,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      dispatch(getPost(id));  // Re-fetch the post to ensure everything is in sync
      setLoad(false);
      // console.log(data);
      toast.success('comment added successfully')
      
    } catch (err) {
      setLoad(false);
      toast.error('faild to send comment')
      // console.log(err);
    }
  }

  let formik = useFormik({
    initialValues: {
      content: '',
      post: id,
    },
    onSubmit: userComment,
  });






  return (
    <section className="flex lg:w-8/12 gap-y-6 flex-col w-11/12 justify-center py-9 lg:px-24 m-auto -mt-2">
      <>
        {/* Comment Input Form */}
        {showComment && (
          <form
            onSubmit={formik.handleSubmit}
            className="fixed m-auto z-50 w-11/12 lg:ms-3 lg:w-1/2 bottom-4"
          >
            <div className="relative">
              <input
                type="text"
                value={formik.values.content}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                id="content"
                className="block w-full p-3.5 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-500 dark:text-black focus:outline-none  focus:bg-gray-300 transition-all duration-300"
                placeholder="Add Comment..."
                required
              />
              <button
                type="submit"
                disabled={load}
                className={`absolute right-2 bottom-2 hover:cursor-pointer translate-y-0.5 bg-blue-700 hover:bg-blue-800 text-white font-medium py-1.5 px-4 rounded-lg transition-all duration-300 flex items-center ${load ? 'cursor-wait' : ''}`}
              >
                {load ? (
                  <i className="fa-solid fa-spinner fa-spin text-xl "></i>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane me-1 text-sm"></i> Add
                  </>
                )}
              </button>
            </div>
          </form>
        )}
  
        {/* Post Display */}
        {post ? (
          <div className="w-full shadow-md rounded-lg relative overflow-hidden pt-3 pb-4 m-auto dark:bg-gray-800 dark:text-gray-200 bg-amber-50">
            <NavLink to={'/'}>
              <i className="fa-solid fa-xmark absolute hover:cursor-pointer top-3 right-3 text-2xl"></i>
            </NavLink>
            <div className="px-3 mb-4 flex items-center">
              <img
                src={post.user?.photo}
                className="md:w-[40px] object-cover me-3 md:h-[40px] h-[30px] w-[30px] rounded-full"
                alt="User"
              />
              <div className="flex flex-col text-sm">
                <h3 className="text-[13px] md:text-[14px] font-medium">{post.user?.name}</h3>
                <span className="text-[11px] md:text-[13px]">{post.createdAt?.slice(0, 10)}</span>
              </div>
            </div>
            <p className="ps-4 pb-3 pt-3 text-sm">{post.body}</p>
            {post.image && (
              <img src={post.image} className="w-full md:h-[300px] h-[240px] object-cover" alt="Post Image" />
            )}
            <div className="flex justify-around w-full px-3 py-4 pb-10 border-b border-gray-300 dark:text-gray-400 text-gray-500 items-center">
              <i className="text-xl hover:cursor-pointer fa-solid fa-thumbs-up"></i>
              <i
                onClick={() => setShowComment(!showComment)}
                className={`text-xl hover:cursor-pointer fa-solid fa-comment ${showComment ? 'text-blue-700' : ''}`}
              ></i>
              <i className="text-xl hover:cursor-pointer fa-solid fa-share-nodes"></i>
            </div>
  
            {/* Comments Display */}
            {showComment && (
              <div className="px-2 lg:px-4 py-5 pt-10">
                <h1 className="text-lg font-semibold">Comments :</h1>
                {load === true && <LoadingComment />}
                
                {/* Check if there are no comments */}
                {sortedComments.length === 0 ? (
                  <p className="text-gray-500 mt-4">No comments yet....</p>
                ) : (
                  sortedComments?.map((comment) => (
                    <div className="bg-gray-100 relative dark:bg-gray-900 flex-col my-3 p-2 rounded-lg" key={comment.id}>
                      <div className="flex items-center space-x-3">
                        {comment?.commentCreator?.photo.includes('undefined') ? (
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500 text-white">
                            {comment?.commentCreator?.name.slice(0, 1)}
                          </span>
                        ) : (
                          <img
                            src={comment?.commentCreator?.photo}
                            className="w-8 h-8 rounded-full object-cover"
                            alt="Commenter"
                          />
                        )}
                        <div className="flex flex-col">
                          <h3 className="text-sm font-medium">{comment?.commentCreator?.name}</h3>
                          <p className="text-sm font-light">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </>
    </section>
  );
  
}

