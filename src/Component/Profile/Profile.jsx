import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import UserPosts from '../UserPosts/UserPosts';
import { NavLink } from 'react-router-dom';
import { userPosts } from '../Redux/postsSlice';
import Loader from '../Loader/Loader';
import { motion } from 'framer-motion';

export default function Profile() {
  const { userProfile } = useContext(UserContext);
  const { loading } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPosts());
  }, [dispatch]);

  const controlOpacity = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, delay: 0.4 },
    },
  };

  return (
    <>

      {loading ? (
        <Loader />
      ) : (
        <>
          <motion.section variants={controlOpacity} initial="hidden" animate="visible">
            <div className="shadow dark:bg-gray-900 rounded-lg w-11/12 lg:w-6/12 mx-auto lg:p-10 translate-y-3">
              {/* Profile Image Section */}
              <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-x-10 gap-y-4">

                <div className="w-[50%] lg:w-[40%] m-auto lg:h-[40%] rounded-full relative">
                <NavLink to="/profilePhoto">
                  <img
                // <i className="text-gray-700 text-xl lg:text-2xl fa-solid fa-plus"></i>
                src={userProfile?.photo}
                className=" object-cover m-auto lg:h-60 lg:w-60 h-40 w-40  rounded-full"
                alt="User Profile"
                />
                    </NavLink>
                </div>

                {/* User Info Section */}
                <div className="ps-1 lg:-translate-y-1 lg:ps-0">
                  <div className="flex text-sm flex-wrap ps-2 border-l rounded-lg  flex-col">
                    <span className="py-2 font-medium dark:text-gray-200">
                      Name : <span className="text-blue-600 font-bold ms-1">{userProfile?.name}</span>
                    </span>
                    <span className="py-2 font-medium dark:text-gray-200">
                      Email : <span className="text-blue-600 font-bold ms-1">{userProfile?.email}</span>
                    </span>
                    <span className="py-2 font-medium dark:text-gray-200">
                      Date of Birth :{' '}
                      <span className="text-blue-600 font-bold ms-1">{userProfile?.dateOfBirth}</span>
                    </span>
                    <span className="py-2 font-medium dark:text-gray-200">
                      Gender : <span className="text-blue-600 font-bold ms-1">{userProfile?.gender}</span>
                    </span>
                    <span className="py-2 font-medium dark:text-gray-200">
                      Join History :{' '}
                      <span className="text-blue-600 font-bold ms-1">
                        {userProfile?.createdAt?.slice(0, 10)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Creation Section */}
            <header className="bg-white dark:bg-gray-800 mt-10 m-auto py-3 px-4 lg:w-6/12 shadow-md rounded-lg overflow-hidden w-11/12">
              <div className="border-b mb-3 pt-3 border-gray-400 pb-4 flex flex-col">
                <div className="flex mb-2 items-center">
                  <NavLink to="/addPost">
                    <img
                      src={userProfile?.photo}
                      className="w-[40px] object-cover h-[40px] rounded-full"
                      alt="User"
                    />
                  </NavLink>
                  <div className="relative  ms-3 w-full">
                    <NavLink to={'/addPost'}>
                      <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border hover:cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={`What are you thinking ${userProfile?.name}?`}
                        required
                      />
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* Post Options Section */}
              <div className="flex items-center text-gray-500 dark:text-gray-300 text-sm lg:text-md lg:font-medium justify-around px-5 mt-3">
                <NavLink to="/addPost">
                  Reels <span><i className="text-red-400 mt-2 text-md lg:text-xl ms-1 fa-solid fa-film"></i></span>
                </NavLink>
                <NavLink to="/addPost">
                  Photo <span><i className="text-green-700 mt-2 text-md lg:text-xl ms-1 fa-solid fa-images"></i></span>
                </NavLink>
                <NavLink to="/addPost">
                  Live <span><i className="text-red-600 text-md lg:text-xl mt-2 lg:translate-y-0.5 ms-1 fa-solid fa-video"></i></span>
                </NavLink>
              </div>
            </header>

            {/* User Posts Section */}
            <UserPosts />
          </motion.section>
        </>
      )}
    </>
  );
}
