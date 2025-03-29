import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../Redux/authSlice';
import { ProvContext } from '../../Context/NavContext';
import { motion } from 'framer-motion';


export default function Register() {
  const [apiErr, setApiErr] = useState(null)
  let navigate = useNavigate()
  let {setHandelNav}= useContext(ProvContext)
  let {setUserName} = useContext(ProvContext)
  let loading = useSelector((store)=>store.authReducer.loading)
  let dispatch = useDispatch()

  
  async function registerForm(value) {
    // console.log(value.name);
    
    try{
      dispatch(setLoading(true))
      let {data} = await axios.post('https://linked-posts.routemisr.com/users/signup', value)
      // console.log(data);
       toast.success(data.message)
       navigate('/login')
       dispatch(setLoading(false))
       setUserName(value.name)
    }catch(err){
      dispatch(setLoading(false))
      // console.log(err.response.data.error);
      setApiErr(err.response.data.error)
    }
    }
     


  const validationSchema = yup.object().shape({

    name : yup.string().required('name is required').min(3, ' min 3 characters').max(15, ' max 15 characters'),
    email : yup.string().required('email is required').email('invalid email').min(4, ' min 3 characters').max(60, ' max 15 characters'),
    password : yup.string().required('password is required').min(4, ' min 3 characters').max(20, ' max 20 characters').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'inter true password like Ziad425@12'),
    rePassword : yup.string().required('rePassword is required').min(4,' min 3 characters').max(20, ' max 20 characters').oneOf([yup.ref('password')],'no match with password'),
    dateOfBirth : yup.string().required('dateOfBirth is required').min(4,' min 3 characters').max(20, ' max 20 characters'),
    gender : yup.string().required('gender is required'),
  }
  )

  let formik = useFormik({
    initialValues : {
      name  : '',
      email  : '',
      password  : '',
      rePassword : '',
      dateOfBirth : '',
      gender : '',
    },validationSchema,
    onSubmit : registerForm
  })

  let controlOpacity ={

    hidden : {      
      opacity : 0,
      y :-100
    },
    visible :{
      opacity : 1,
      y:0,
      transition :{
        duration : 1,
        delay : .1 ,  
        type : "spring",
        stiffness : 30,
      
      }
    }
    } 
  return <>

<motion.div
     variants={controlOpacity}
     initial = "hidden"  
     animate = "visible"
onClick={()=>setHandelNav(false)} className="p-4 lg:max-w-2xl max-w-md mx-auto ">

<form onSubmit={formik.handleSubmit} className="lg:max-w-2xl max-w-md shadow-lg pt-5 pb-8 px-6 mx-auto">

{apiErr &&

<div id="alert-2" className="flex items-center p-4 mb-6 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  </svg>
  <span className="sr-only">Info</span>
  <div className="ms-3 text-sm font-medium">
   {apiErr}
  </div>
  <button onClick={()=> setApiErr(null)} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
    <span className="sr-only">Close</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
    </svg>
  </button>
</div>

 } 
  <div className="relative z-0 w-full mb-6 group">
    <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="floating_name" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 border-gray-300  focus:outline-none focus:ring-0 peer`} placeholder=" "  />
    <label htmlFor="floating_name" className={` "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}`}>Your Name</label>
    {formik.errors.name && formik.touched.name &&
    <div className=" text-red-600 mt-1 text-sm w-full"> {formik.errors.name}</div>
    }
  </div>


  <div className="relative z-0 w-full mb-6 group">
    <input value={formik.values.email} onChange={formik.handleChange}    type="email" name="email" id="email" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 border-gray-300  focus:outline-none focus:ring-0 peer`} placeholder=" "  />
    <label htmlFor="floating_email" className={` "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}`}>Your Email</label>
    {formik.errors.email && formik.touched.email &&
    <div className=" text-red-600 mt-1 text-sm w-full"> {formik.errors.email}</div>
    }
  </div>



  <div className="relative z-0 w-full mb-6 group">
    <input   value={formik.values.password} onChange={formik.handleChange} type="password" name="password" id="password" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600dark:focus:border-blue-500 focus:border-blue-600 border-gray-300  focus:outline-none focus:ring-0 peer`} placeholder=" "  />
    <label htmlFor="floating_password" className={` "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}`}>Your Password</label>
    {formik.errors.password && formik.touched.password &&
    <div className=" text-red-600 mt-1 text-sm w-full"> {formik.errors.password}</div>
    }
  </div>


  <div className="relative z-0 w-full mb-6 group">
    <input value={formik.values.rePassword} onChange={formik.handleChange} type="password" name="rePassword" id="rePassword" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 border-gray-300 focus:outline-none focus:ring-0 peer`} placeholder=" "  />
    <label htmlFor="floating_rePassword" className={` "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}`}>Your RePassword</label>
    {formik.errors.rePassword && formik.touched.rePassword &&
    <div className=" text-red-600 mt-1 text-sm w-full"> {formik.errors.rePassword}</div>
    }
  </div>



  <div className="relative z-0 w-full mb-6 group">
    <input  value={formik.values.dateOfBirth} onChange={formik.handleChange} type="date" id="dateOfBirth" name="dateOfBirth" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 border-gray-300 focus:outline-none focus:ring-0 peer`}placeholder=" "  />
    <label htmlFor="floating_dateOfBirth" className={` "peer-focus:font-medium absolute text-s text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"}`}>Your dateOfBirth</label>
    {formik.errors.dateOfBirth && formik.touched.dateOfBirth &&
    <div className=" text-red-600 mt-1 text-sm w-full"> {formik.errors.dateOfBirth}</div>
    }
  </div>



<div className=' my-4 flex gap-x-3 items-center'>
  <div>
    <input  type="radio" id="male" name="gender"  value={`male`} onChange={formik.handleChange}/>
    <label className=' dark:text-gray-400 ms-2' htmlFor="female">Male</label><br />
    
  </div>
<div>
    <input type="radio" id="female" name="gender"value={`female`} onChange={formik.handleChange} />
    <label className='dark:text-gray-400 ms-2' htmlFor="female">Female</label><br />
</div>
</div>
{formik.errors.gender && formik.touched.gender &&
    <div className=" text-red-600 mb-2 -translate-y-3 text-sm w-full"> {formik.errors.gender}</div>
    }

  <button disabled={loading} type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm w-full mt-5 hover:cursor-pointer px-5 py-2.5 text-center me-2 mb-2">
    
    {loading ===true ?  <i className="fa-solid fa-spinner fa-spin"></i> :
      "Login"
      
    }
  </button>
</form> 

</motion.div>





  </> 
  
}
