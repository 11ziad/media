import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { setLoading, setToken } from '../Redux/authSlice';
import { motion } from 'framer-motion';


export default function ForgotPass() {


    let {loading , token}= useSelector((store)=>store.authReducer)
    let dispatch = useDispatch()
    let navigate =  useNavigate()

    const headers ={
        token: token}

    async function newPassword(value){

        try{
            dispatch(setLoading(true))
            let {data}  = await axios.patch('https://linked-posts.routemisr.com/users/change-password',value ,
                {
                    headers,  
                    'content-type': 'application/json',
                }
            )
            toast.success('update password success')
            console.log(data);
            dispatch(setToken(data))
            navigate('/')
            
        }catch(err){
            console.log(err);
            toast.error('incorrect email or password')
              dispatch(setLoading(false))
        }

        
    }
    let validationSchema = yup.object().shape({
        password : yup.string().required('password is required'),
        newPassword : yup.string().required('newPassword is required').min(4, ' min 3 characters').max(20, ' max 20 characters').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'inter true password like Ziad425@12'),
    })

let formik = useFormik({
    initialValues :{
        password  : '',
        newPassword : '',
    },validationSchema,
    onSubmit : newPassword
})

    
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

  <motion.div 
     variants={controlOpacity}
     initial = "hidden"  
     animate = "visible"
  className="p-4  lg:max-w-2xl max-w-md mx-auto ">
    <h1 className='ps-4 text-xl uppercase text-blue-600 font-medium'>new Password</h1>
  
  <form onSubmit={formik.handleSubmit}  className="lg:max-w-2xl mt-3 max-w-md shadow-lg  py-10 px-6 mx-auto">
  
  <div className="relative z-0 w-full mb-8 group">
    <input value={formik.values.password} onChange={formik.handleChange}  type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
    <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    {formik.errors.password && 
    <div className=" text-red-600 mt-1 text-sm w-full"> {formik.errors.password}</div>
    }
  </div>
  
  
  <div className="relative z-0 w-full mb-7 group">
    <input  value={formik.values.newPassword} onChange={formik.handleChange} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
    {formik.errors.newPassword && 
    <div className=" text-red-600 mt-1 text-sm w-full"> {formik.errors.newPassword}</div>
    }
  </div>
  {loading ===true ?
  <button disabled ={loading} type="submit" className="text-white mt-3 cursor-pointer w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
   <i className="fa-solid fa-spinner fa-spin"></i> 
  
    </button> : <button type="submit" className="text-white mt-3 cursor-pointer w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> OK</button>
  }
  </form> 
  
  
  </motion.div>
  </>
  
  
}
