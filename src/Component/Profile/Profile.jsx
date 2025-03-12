import React, { useContext, useEffect,} from 'react'
import { UserContext } from '../../UserContext/UserContext'
import { useDispatch, useSelector } from 'react-redux'
import UserPosts from '../UserPosts/UserPosts'
import { NavLink } from 'react-router-dom';
import { userPosts } from '../Redux/postsSlice';
import Loader from '../Loader/Loader';
import { motion } from 'framer-motion';

export default function Profile() {
  let {userProfile} = useContext(UserContext)
  let  {loading}= useSelector((store)=>store.authReducer)
  let dispatch =useDispatch()
  useEffect(()=>{
    dispatch(userPosts())

  },[])
  
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


  return <>
  {loading ? <Loader></Loader> : <>
  <motion.section
        variants={controlOpacity}
        initial = "hidden"  
        animate = "visible"
  >

  <div className=" shadow dark:bg-gray-900 rounded  w-11/12  lg:w-6/12  mx-auto lg:p-10 translate-y-3 "> 

    <div className="flex flex-col justify-center items-center lg:items-center lg:gap-x-10 gap-y-4 lg:flex-row">
<div className="  w-[50%] lg:w-[40%] lg:h-[40%] relative">
  
    <img src={userProfile.photo} className=' w-full  object-cover rounded-xl lg:rounded-xl  ' alt="" />

    <div className=" absolute bottom-0 right-0">
    {/* <input id="dropzone-file" name='image' type="file" className='hidden'/> */}
    <div for="dropzone-file" className=' flex bg-gray-200 hover:cursor-pointer p-2 rounded-xl justify-center items-center'>
    <NavLink to={'/profilePhoto'}>

    <i className="text-gray-700 text-xl lg:text-2xl fa-solid fa-plus"></i>
    </NavLink>
    </div>
    </div>
</div>
    <div className="ps-1 lg:-translate-y-10 lg:ps-0">

  <div className=" flex text-sm flex-wrap flex-col ">
    <span className='py-2 font-medium dark:text-gray-200'> Name : <span className='text-blue-600 font-bold ms-1'> {userProfile.name}</span></span>
    <span className='py-2 font-medium dark:text-gray-200'> Email : <span className='text-blue-600 font-bold ms-1'> {userProfile.email}</span></span>
    <span className='py-2 font-medium dark:text-gray-200'> dateOfBirth : <span className='text-blue-600 font-bold ms-1'> {userProfile.dateOfBirth}</span></span>
    <span className='py-2 font-medium dark:text-gray-200'> gender : <span className='text-blue-600 font-bold ms-1'> {userProfile.gender}</span></span>
    <span className='py-2 font-medium dark:text-gray-200'> joun history : <span className='text-blue-600 font-bold ms-1'> {userProfile.createdAt?.slice(0,10)}</span></span>
  </div>
      </div>
    </div>
  </div>
  
                  <header className=' bg-white dark:bg-gray-800 mt-10 m-auto py-3 px-4  lg:w-6/12 shadow-md rounded-lg overflow-hidden w-11/12'>
                      <div className=" border-b mb-3 pt-3 border-gray-400 pb-4 flex flex-col">
                          <div className="flex mb-2 items-center">
                              <NavLink to={'/addPost'}>
  
                              <img src={userProfile.photo} className='w-[40px] object-cover  h-[40px] rounded-full' alt="" />
                              </NavLink>
                              <div class="relative ms-3 w-full">
                                  <NavLink to={'/addPost'}>
                      <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`What are you thinking ${userProfile.name}?...`} required />
                                  </NavLink>
                  </div>
                       </div>
                      </div>
                       <div className="flex items-center text-gray-500 dark:text-gray-300 text-sm lg:text-md lg:font-medium justify-around px-5 mt-3">
                          <NavLink to={'addPost'}>Reals <span><i className="text-red-400 mt-2 text-md lg:text-xl ms-1 fa-solid fa-film"></i></span> </NavLink>
                          <NavLink to={'addPost'}>Photo <span><i className="text-green-700 mt-2 text-md lg:text-xl ms-1 fa-solid fa-images"></i></span> </NavLink>
                          <NavLink to={'addPost'}>Live <span><i className="text-red-600 text-md lg:text-xl mt-2 lg:translate-y-0.5 ms-1 fa-solid fa-video"></i></span> </NavLink>
                       </div>
                  </header> 
    <UserPosts></UserPosts>
  
  
  
  </motion.section>
  </>}
  </>
}
