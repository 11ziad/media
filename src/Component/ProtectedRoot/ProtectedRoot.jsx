import React from 'react'
import { LoaderIcon } from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoot({children}) {

    let navigate = useNavigate()
    

    if(localStorage.getItem('token')){
        navigate('')
        return children
    }else{
      return <Navigate to={'/login'}></Navigate>
    }

}
  