import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NotFound() {
  return <>


    <div className=" flex justify-center items-center h-[80vh]">
        <div className="flex flex-col">

        <h1 className=' lg:text-3xl text-gray-600 dark:text-white uppercase'>This Page Not Found</h1>
        <Link to={'/'} className=' dark:text-white text-center bg-gray-300 dark:bg-gray-600 mt-6 py-2 rounded-2xl'>Back Posts</Link>
        </div>
    </div>


  </>
}

