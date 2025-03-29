import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProvContext } from '../../Context/NavContext';
import { useDispatch, useSelector } from 'react-redux';
import { removToken } from '../Redux/authSlice';
import { UserContext } from '../../UserContext/UserContext';

export default function Navbar() {
  const [handelSetting, setHandelSetting] = useState(false);
  let ref = useRef();
  let { handelNav, setHandelNav } = useContext(ProvContext);
  let { userProfile ,setUserProfile} = useContext(UserContext);
  let { token } = useSelector((store) => store.authReducer);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let navAnimation = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.1,
        type: 'spring',
        stiffness: 70,
      },
    },
  };

  let setAnimation = {
    hidden: {
      x: 10,
      opacity: 0,
    },
    visible: {
      x: -40,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.1,
        type: 'spring',
        stiffness: 70,
      },
    },
  };

  useEffect(() => {
    setUserProfile()
    ref.current?.checked === true;
    if (localStorage.getItem('darkMood')) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#030712';
      ref.current?.checked === true;
    }
  }, []);

  function toggle() {
    let body = document.body;
    if (ref.current.checked === true) {
      body.classList.add('dark');
      body.style.backgroundColor = '#030712';
      localStorage.setItem('darkMood', 'dark');
    } else {
      body.classList.remove('dark');
      body.style.backgroundColor = '#eeee';
      localStorage.removeItem('darkMood');
    }
  }

  function logOut() {
    dispatch(removToken());
    localStorage.removeItem('token');
    navigate('/login');
    setHandelNav(false);
  }

  return (
    <>
      <nav className="bg-blue-600 fixed left-0 right-0 top-0 z-50 px-2 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {token && (
              <>
                {userProfile?.photo && (
                  <Link to={'/profile'}>
                    <img
                      src={userProfile?.photo}
                      className="h-10 w-10 rounded-full object-cover"
                      alt=""
                    />
                  </Link>
                )}
                <Link
                  to={'/profile'}
                  className="self-center lg:text-2xl text-xl font-semibold whitespace-nowrap me-3 uppercase text-gray-300 dark:text-gray-300"
                >
                  {userProfile?.name}
                </Link>
                <div className="ms-1 mt-1 hidden lg:flex">
                  <NavLink
                    to={'/'}
                    className={'text-sm py-0.5 mx-2 px-1  text-white dark:text-gray-300 uppercase font-medium'}
                  >
                    Posts
                    <i className="ms-1 -translate-y-0.5 fa-solid fa-house"></i>
                  </NavLink>
                  <NavLink
                    to={'/profile'}
                    className={'text-sm py-0.5 mx-2 px-1  text-white dark:text-gray-300 uppercase font-medium'}
                  >
                    Profile <i className="ms-1 -translate-y-0.5 fa-solid fa-user"></i>
                  </NavLink>
                  <NavLink
                    className={'text-sm text-white uppercase mx-2 px-1  dark:text-gray-300 font-medium'}
                    to={'addPost'}
                  >
                    Add Post <i className="ms-0 -translate-y-0.5 fa-solid fa-plus"></i>
                  </NavLink>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setHandelNav(true)}
            type="button"
            className="-m-2.5 hover:cursor-pointer inline-flex items-center lg:hidden justify-center rounded-md p-2.5 dark:text-gray-400 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          {!token ? (
            <div className="items-center hidden lg:flex space-x-3 rtl:space-x-reverse">
              <NavLink to={'Register'} className="lg:text-lg text-sm py-0.5 px-2 text-white ">
                New Account
              </NavLink>
              <NavLink to={'login'} className="text-sm lg:text-lg py-0.5 px-2 text-white ">
                Login
              </NavLink>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  ref={ref}
                  onChange={() => toggle()}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none ms-2 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-300"></span>
              </label>
            </div>
          ) : (
            <div className="items-center hidden lg:flex space-x-3 rtl:space-x-reverse">
              <div className="relative">
                <i
                  onClick={() => setHandelSetting(true)}
                  hidden={handelSetting === true}
                  className="text-2xl cursor-pointer text-white dark:text-gray-300 fa-solid fa-gears"
                ></i>
                <i
                  onClick={() => setHandelSetting(false)}
                  hidden={handelSetting === false}
                  className="text-2xl cursor-pointer text-white dark:text-gray-300 fa-solid fa-gears"
                ></i>
                {handelSetting === true && (
                  <motion.div
                    variants={setAnimation}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-between w-[350px] py-2 text-black absolute -top-2 -left-80 px-5 text-sm"
                  >
                    <Link to={'/forgotpass'} className="hover:underline py-1 text-blue-700 dark:text-gray-300 w-ful rounded-sm">
                      Change Password
                    </Link>
                    <Link to={'/profilePhoto'} className="hover:underline py-1 text-blue-700 dark:text-gray-300 w-ful rounded-sm">
                      Update Photo
                    </Link>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        ref={ref}
                        onChange={() => toggle()}
                        className="sr-only peer"
                      />
                      <div className="relative w-12 h-6 bg-gray-400 peer-focus:outline-none ms-2 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>
                  </motion.div>
                )}
              </div>
              <span onClick={() => logOut()} className="text-sm lg:text-lg hover:cursor-pointer text-white py-0.5 px-2 dark:text-gray-300 ">
                Log out_<i className="fa-solid fa-arrow-right-from-bracket text-main"></i>
              </span>
            </div>
          )}
        </div>
      </nav>

      {/* mobile screen */}
      {handelNav === true ? (
        <motion.nav
          variants={navAnimation}
          initial="hidden"
          animate="visible"
          className="bg-blue-600 z-50 lg:hidden flex-col flex items-end rounded-md dark:bg-gray-900 fixed top-0 h-[70%] right-0 w-1/2 px-5"
        >
          <div className="">

          <button
            onClick={() => setHandelNav(false)}
            type="button"
            className="-m-2.5 hover:cursor-pointer mb-10 mt-2 mr-0.5 inline-flex items-center lg:hidden justify-center rounded-md p-2.5 dark:text-gray-400 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          ref={ref}
                          onChange={() => toggle()}
                          className="sr-only peer"
                        />
                        <div className="relative w-12 h-6 bg-gray-400 peer-focus:outline-none ms-2 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                      </label>
          </div>
          {!token ? (
            <div className="flex flex-col w-full text-center gap-y-2">
              <NavLink onClick={() => setHandelNav(false)} to={'Register'} className="lg:text-lg text-sm text-white py-2 px- w-full  ">
                New Account
              </NavLink>
              <NavLink onClick={() => setHandelNav(false)} to={'login'} className="text-sm lg:text-lg text-white py-2 px-3 w-full ">
                Login
              </NavLink>
            </div>
          ) : (
            <div className="flex flex-col gap-y-4 w-full text-center">

              <NavLink
                onClick={() => setHandelNav(false)}
                className={'text-sm text-white border-b rounded-md py-2 px-2 hover:bg-blue-500 border-blue-400 font-medium'}
                to={'profile/'}
              >
                Profile
                <i className="ms-2 fa-solid fa-user"></i>
              </NavLink>
              <NavLink
                onClick={() => setHandelNav(false)}
                className={'text-sm text-white border-b rounded-md py-2 px-2 hover:bg-blue-500 border-blue-400 font-medium'}
                to={'/'}
              >
                Posts
                <i className="ms-2 fa-solid fa-house"></i>
              </NavLink>
              <NavLink
                onClick={() => setHandelNav(false)}
                className={'text-sm text-white border-b rounded-md py-2 px-2 hover:bg-blue-500 border-blue-400 font-medium'}
                to={'addPost/'}
              >
                Add Post
                <i className="ms-2 fa-solid fa-plus"></i>
              </NavLink>
              <NavLink
                onClick={() => setHandelNav(false)}
                className={'text-sm text-white border-b rounded-md py-2 px-2 hover:bg-blue-500 border-blue-400 font-medium'}
                to={'profilePhoto/'}
              >
                Update Photo
                <i className=" ms-2 fa-solid fa-camera"></i>
              </NavLink>

              <Link
                onClick={() => setHandelNav(false)}
                to={'forgotpass'}
                className="lg:text-md text-sm lg:text-lg w-full hover:bg-blue-500 rounded hover:cursor-pointer text-white py-2 border-b border-blue-400 lg:px-2 dark:text-white"
              >
                Change Password
                <i className="ms-2 fa-solid fa-key"></i>
              </Link>
              <span
                onClick={() => logOut()}
                className="text-sm lg:text-lg w-full hover:bg-blue-500 rounded hover:cursor-pointer text-white py-2 px-2 border-blue-400 border-b dark:text-white "
              >
                Log out_<i className="fa-solid fa-arrow-right-from-bracket text-main"></i>
              </span>
            </div>
          )}
        </motion.nav>
      ) : null}
    </>
  );
}
