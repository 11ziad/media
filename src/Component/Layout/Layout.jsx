import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { ProvContext } from '../../Context/NavContext'

export default function Layout() {

    let {setHandelNav}= useContext(ProvContext)
  
  return <>
  
  <Navbar></Navbar>
  <div onClick={()=>setHandelNav(false)} className=" container m-auto mt-20 ">

  <Outlet></Outlet>
  </div>
  
  </>
}
