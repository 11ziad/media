import React from 'react'
import {SyncLoader} from 'react-spinners'


export default function Loader() {
  return <>
  
  
  <div className=" fixed inset-0 dark:bg-gray-950 bg-gray-300 ">
<div className=" flex justify-center items-center h-dvh">

<SyncLoader color="hsla(240, 100%, 50%, 1)" />
  </div>
  </div>
  </>
}
