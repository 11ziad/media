import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext/UserContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

export default function ProfilePhoto() {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null); // Add state to track photo changes
  const { userProfile, setUserProfile } = useContext(UserContext); // Assuming you have a function to update userProfile
  const navigate = useNavigate();

  useEffect(() => {
    setPhoto(userProfile.photo); // Update photo if userProfile changes
  }, [userProfile.photo]);

  const handlePhoto = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    const photoFile = form.photo.files[0];

    if (!photoFile) {
      toast.error('Please select a photo to upload');
      return;
    }

    formData.append('photo', photoFile);

    try {
      setLoading(true);
      const { data } = await axios.put(
        'https://linked-posts.routemisr.com/users/upload-photo',
        formData,
        {
          headers: {
            token: localStorage.getItem('token'), // Ensure the token is set correctly
          },
        }
      );
      
      toast.success('Photo updated successfully!');
      
      // Update user profile after successful photo upload
      setUserProfile((prevState) => ({
        ...prevState,
        photo: data.photo, // Assuming the API response contains the new photo URL
      }));

      navigate('/profile');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update photo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-200">
      <div className="lg:w-6/12 w-11/12 m-auto relative opacity-100 shadow-md p-4 items-center bg-white dark:text-gray-300 dark:bg-gray-800 rounded-md">
        <button
          onClick={() => navigate('/profile')}
          className="absolute cursor-pointer top-3 right-3 text-2xl text-gray-700 dark:text-white"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="text-center font-medium uppercase text-xl border-b pb-3 dark:border-gray-500 border-gray-200">
          Update Photo
        </h2>

        <div className="flex mt-3 items-center">
          <img
            src={photo || userProfile.photo}
            className="w-[40px] bg-gray-200 me-3 h-[40px] rounded-full object-cover"
            alt="User"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-medium ms-1">{userProfile.name}</h3>
            <span className="bg-gray-300 py-0.5 px-1.5 rounded-md text-[10px] text-black">
              All People
            </span>
          </div>
        </div>

        <form onSubmit={handlePhoto} className="mt-5">
          <div className="shadow border py-3 px-3 rounded-md mt-3 border-gray-300 dark:border-gray-500">
            <input id="dropzone-file" name="photo" type="file" className="hidden" />
            <label htmlFor="dropzone-file" className="flex gap-x-4 items-center cursor-pointer">
              <i className="text-green-700 mt-2 text-xl lg:text-2xl ms-1 fa-brands fa-whatsapp"></i>
              <i className="text-red-500 mt-2 text-xl lg:text-xl ms-1 fa-solid fa-location-dot"></i>
              <i className="text-amber-400 mt-2 text-xl lg:text-xl ms-1 fa-solid fa-face-smile"></i>
              <i className="text-green-700 mt-2 text-xl lg:text-2xl ms-1 fa-solid fa-images"></i>
            </label>
          </div>

          <button
            type="submit"
            className={`text-white hover:cursor-pointer bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg font-medium rounded-lg text-sm w-full mt-5 px-5 py-2.5 text-center mb-2 ${
              loading ? 'cursor-wait' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              'Update Photo'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
