import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate} from 'react-router-dom'
import { setLoading, setToken } from '../Redux/authSlice'
import * as yup from 'yup'
import { motion } from 'framer-motion'

export default function Login() {

  let {loading } = useSelector((store)=>store.authReducer)
  let navigate = useNavigate()
  let dispatch =  useDispatch()



  async function loginApp(value){
    try{
   
      dispatch(setLoading(true))
        let {data} =await axios.post('https://linked-posts.routemisr.com/users/signin', value)
        console.log(data);
        dispatch(setToken(data))
        toast.success(data.message)     
        navigate('/')      
      }catch(err){
        if(err.status >= 400){
          toast.error('incorrect email or password')
          dispatch(setLoading(false))
        }
        console.log(err.status);
        dispatch(setLoading(false))
        }
     
  }



  const validationSchema = yup.object().shape({
    email : yup.string().required('email is required').email('invalid email'),
    password : yup.string().required('password is required'),
  }
  )


let formik =useFormik({
  initialValues : {
    email  : '',
    password  :'',    
  },validationSchema,
  onSubmit : loginApp
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
      stiffness : 90,
    
    }
  }
  } 

  return <>
  
  
  
<motion.div
     variants={controlOpacity}
     initial = "hidden"  
     animate = "visible"
className="p-4  lg:max-w-2xl max-w-md mx-auto ">
<div className="flex items-center p-1 lg:p-4  mb-1 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium me-2">welcom</span>if you don't have account please create new account from here <NavLink className={'mx-1 underline font-bold'} to={'/register'}> New Account</NavLink> and come login to enter .
  </div>
</div>


<form onSubmit={formik.handleSubmit} className="lg:max-w-2xl mt-2 max-w-md shadow-lg  py-10 px-6 mx-auto">

<div className="relative z-0 w-full mb-8 group">
  <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
  <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
  {formik.errors.email && formik.touched.email &&
    <div className=" text-red-600 mt-1 text-sm w-full"> {formik.errors.email}</div>
    }
</div>



<div className="relative z-0 w-full mb-7 group">
  <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
  <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
  {formik.errors.email && formik.touched.password &&
    <div className=" text-red-600 mt-1 text-sm w-full"> {formik.errors.password}</div>
    }
</div>

{loading ===true ?
<button disabled ={loading} type="submit" className="text-white mt-3 cursor-pointer w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
 <i className="fa-solid fa-spinner fa-spin"></i> 

  </button> : <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm w-full mt-5 hover:cursor-pointer px-5 py-2.5 text-center me-2 mb-2 "> login</button>

}
</form> 


</motion.div>


  
  
  
  </>
}
