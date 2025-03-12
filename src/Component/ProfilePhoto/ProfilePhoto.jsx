import React, { useContext, useEffect, useState} from 'react'
import { UserContext } from '../../UserContext/UserContext'
import toast from 'react-hot-toast';
import axios from 'axios'

import { NavLink, useNavigate } from 'react-router-dom';

export default function ProfilePhoto() {


    const [Loader, setLoader] = useState(false)
    let {userProfile} = useContext(UserContext)
    let navigate = useNavigate()
    useEffect(()=>{
      handelPhoto()
  
    },[userProfile.photo])
  
  


    async function handelPhoto(e) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData();
        
        // Get the photo file
        const photoFile = form.photo.files[0];
        
        // If no file selected, return early
        if (!photoFile) {
          toast.error('Please select a photo to upload');
          return;
        }
    
        formData.append('photo', photoFile);
      
        try {
          setLoader(true)
          const { data } = await axios.put(
            'https://linked-posts.routemisr.com/users/upload-photo',
            formData,
            {
              headers: {
                token: localStorage.getItem('token'), // Ensure the token is set correctly
              },
            }
          );
      
          console.log(data);
          toast.success('Photo updated successfully!');
          navigate('/profile')
        } catch (err) {
          console.error(err);
          setLoader(false)
          toast.error('Failed to update photo');
        }
      }

  return <>

<section className=' fixed inset-0 '>

<div className=" lg:w-6/12 w-11/12 translate-y-24 m-auto relative  opacity-100 shadow-md p-4 items-center bg-white dark:text-gray-300 dark:bg-gray-800 rounded-md">
<span>
<i  className="fa-solid fa-xmark absolute hover:cursor-pointer top-3 right-3 text-2xl"></i>
</span>

<h2 className=' text-center  font-medium uppercase text-xl border-b pb-3 dark:border-gray-500  border-gray-200  '>update photo</h2>
<div className=" flex mt-3 items-center">
  <img src={userProfile.photo} className=' w-[40px] bg-gray-200 me-3 h-[40px] rounded-full object-cover' alt="" />
  <div className=" flex flex-col">
  <h3 className=' text-lg font-medium ms-1'>{userProfile.name}</h3>
  <span className='bg-gray-300 py-0.5  px-1.5 rounded-md text-[10px] text-black'> All People</span>
  </div>
</div>

<div className=" w-3/12 mt-3 lg:w-3/12 h-20px m-auto bg-red-700">
<img className='' src={userProfile.photo} alt="" />
</div>

<form onSubmit={(e)=> handelPhoto(e)} action="">
<div className=" mt-5">
<div className=" shadow border py-3 px-3 rounded-md mt-3 border-gray-300 dark:border-gray-500">
  <input id="dropzone-file" name='photo' type="file" className='hidden'/>
  <label for="dropzone-file" className=' flex gap-x-4 items-center'>

  <i className="text-green-700 mt-2 text-xl lg:text-2xl ms-1 fa-brands fa-whatsapp"></i>
  <i className="text-red-500 mt-2 text-xl lg:text-xl ms-1 fa-solid fa-location-dot"></i>
  <i className="text-amber-400 mt-2 text-xl lg:text-xl ms-1 fa-solid fa-face-smile"></i>
  <i className="text-green-700 mt-2 text-xl lg:text-2xl ms-1 fa-solid fa-images"></i>
  </label>
</div>
</div>
{Loader ?
 <button type="submit" disable class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm w-full mt-5 hover:cursor-pointer px-5 py-2.5 text-center me-2 mb-2 "><i className="fa-solid fa-spinner fa-spin-pulse"></i></button> 
  :
<button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm w-full mt-5 hover:cursor-pointer px-5 py-2.5 text-center me-2 mb-2 ">ADD</button>
}

</form>
</div>
</section>
  
  
  </>
}

