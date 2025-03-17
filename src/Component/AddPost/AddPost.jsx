import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { motion } from 'framer-motion';

export default function AddPost() {
  let { userProfile, load } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  let navigate =useNavigate()

  async function handelSubmit(e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData();

    const body = form.body.value;
    const image = form.image.files[0];

    // Image validation
    if (image && !image.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }

    formData.append('body', body);

    if (image) {
      formData.append('image', image);
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        'https://linked-posts.routemisr.com/posts',
        formData,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      console.log(data);
      setLoading(false);
      toast.success(data.message);
      navigate ('/profile')

    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error('Failed to create post. Please try again.');
    }
  }
    
  let controlOpacity ={

    hidden : {      
      opacity : 0,
    },
    visible :{
      opacity : 1,
      transition :{
        duration : 1,
        delay : .4 ,  
      }
    }
    } 

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <motion.section 
        variants={controlOpacity}
        initial = "hidden"  
        animate = "visible"
        className="lg:pt-20 pt-10">
          <div className="lg:w-6/12 w-11/12 m-auto relative shadow-md border border-gray-300 dark:border-gray-600 p-4 items-center bg-white dark:text-gray-300 dark:bg-gray-800 rounded-md">
            <NavLink to={'/'}>
              <i className="fa-solid fa-xmark absolute hover:cursor-pointer top-3 right-3 text-2xl"></i>
            </NavLink>

            <h2 className="text-center font-medium uppercase text-xl border-b pb-3 dark:border-gray-500 border-gray-200">
              Create Post
            </h2>
            <div className="flex mt-3 items-center">
              <img
                src={userProfile.photo}
                className="w-[40px] bg-gray-200 me-3 h-[40px] rounded-full object-cover"
                alt=""
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-medium ms-1">{userProfile.name}</h3>
                <span className="bg-gray-300 py-0.5 px-1.5 rounded-md text-[10px] text-black">
                  All People
                </span>
              </div>
            </div>
            <form onSubmit={(e) => handelSubmit(e)} action="">
              <div className="mt-5">
                <input
                  type="text"
                  id="body"
                  name="body"
                  className="border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 min-h-16 focus:outline-none focus:border-blue-500 block w-full ps-4 p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={`What are you thinking ${userProfile.name}?...`}
                />
                <div className="shadow border py-3 px-3 rounded-md mt-3 border-gray-300 dark:border-gray-500">
                  <input
                    id="dropzone-file"
                    name="image"
                    type="file"
                    className="hidden"
                  />
                  <label for="dropzone-file" className="flex cursor-pointer gap-x-4 items-center">
                    <i className="text-green-700 mt-2 text-xl lg:text-2xl ms-1 fa-brands fa-whatsapp"></i>
                    <i className="text-red-500 mt-2 text-xl lg:text-xl ms-1 fa-solid fa-location-dot"></i>
                    <i className="text-amber-400 mt-2 text-xl lg:text-xl ms-1 fa-solid fa-face-smile"></i>
                    <i className="text-green-700 mt-2 text-xl lg:text-2xl ms-1 fa-solid fa-images"></i>
                  </label>
                </div>
              </div>
              {loading ? (
                <button
                  type="submit"
                  disabled
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm w-full mt-5 hover:cursor-pointer px-5 py-2.5 text-center me-2 mb-2"
                >
                 <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm w-full mt-5 hover:cursor-pointer px-5 py-2.5 text-center me-2 mb-2"
                >
                  ADD
                </button>
              )}
            </form>
          </div>
        </motion.section>
      )}
    </>
  );
}
