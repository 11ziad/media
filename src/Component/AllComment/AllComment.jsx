import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../Redux/postsSlice'
import { NavLink, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'

export default function AllComment() {

  const [showComment, setShowComment] = useState(true)
  let {id} = useParams()
     let {post,loading }= useSelector((state)=> state.postsReducer)
      let dispatch = useDispatch()

      useEffect(()=>{  
        dispatch(getPost(id))
      },[])
    
      console.log(post);
      
  return <>
  <section className=' flex lg:w-8/12 gap-y-6  flex-col w-11/12 justify-center py-9 lg:px-24 m-auto -mt-2'>
  {loading  ? <Loader></Loader> : <>
{showComment ===true ?
  <form className=" fixed  z-50 w-11/12 lg:w-6/12 bottom-0">
<div className=' px-2 '>
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    <i className="fa-solid fa-comment text-gray-400"></i>
    </div>
    <input type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Comment..." required />
    <button type="submit" className="text-white hite absolute end-2.5 lg:bottom-1 bottom-2  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm lg:px-4 lg:py-2 px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ADD</button>
  </div>
</div>

  </form> : null
}

  {post ?

        <div className=" w-full shadow-md rounded-lg relative overflow-hidden  pt-3 m-auto dark:bg-gray-800 dark:text-gray-200 bg-amber-50 ">
          <NavLink to={'/'}>
          <i className="fa-solid fa-xmark absolute hover:cursor-pointer top-3 right-3 text-2xl"></i>
          </NavLink>
            <div className=" px-3 mb-4 flex items-center">
                <img src={post.user?.photo} className=' md:w-[40px] object-center me-3 md:h-[40px] h-[30px] w-[30px] rounded-full' alt="" />
                <div className=" flex flex-col text-sm">
                    <h3 className='text-[13px] md:text-[14px] font-medium'>{post.user?.name}</h3>
                    <span className='text-[11px] md:text-[13px]' >{post.createdAt?.slice(0,10)}</span>
                </div>
            </div>
                <p className=' ps-4 pb-3 pt-3 text-sm'>{post.body}</p>
                {post.image&&
                <img src={post.image} className=' w-full md:h-[300px] h-[240px] object-cover' alt="" />
                }
                <div className=" flex justify-around w-full  px-3 py-4 dark:text-gray-400 text-gray-500 items-center">
                <i className="text-xl hover:cursor-pointer fa-solid fa-thumbs-up"></i>
                {showComment ===false ? 

                <i onClick={()=>setShowComment(true)} className={`text-xl hover:cursor-pointer fa-solid fa-comment`}></i>
                 :
               <i onClick={()=>setShowComment(false)} className={`text-xl hover:cursor-pointer fa-solid fa-comment`}></i>
                 }
                <i className="text-xl hover:cursor-pointer fa-solid fa-share-nodes"></i>
                </div>
                {showComment ===true ?<>

                {post.comments?.map((comment)=>
                
              <div className=" bg-gray-300 dark:bg-gray-900 flex-col">   
               <div className=" lg:px-5 px-2 py-4 flex items-center">
                {comment?.commentCreator?.photo.includes('undefined') ?
                <span className=' flex justify-center md:w-[30px] object-center me-2 md:h-[30px] h-[25px] w-[25px] rounded-full items-center bg-white dark:bg-gray-800'> {comment?.commentCreator?.name.slice(0,1)}</span>
              :
               <img src={comment?.commentCreator?.photo} className=' md:w-[30px] object-center me-2 md:h-[30px] h-[25px] w-[25px] rounded-full' alt="" />
              }
               <div className=" flex bg-gray-200 dark:bg-gray-800 flex-col  translate-y-3 py-1 rounded-lg px-3 text-sm">
                   <h3 className='text-[12px] md:text-[13px] font-medium'>{comment?.commentCreator?.name}</h3>
                   <span className='text-[14px] md:text-[15px] font-light' >{comment.content}</span>
               </div>
           </div>
              </div>
                )}        
    </> :null   
              }
              
        </div> 

      

: <Loader></Loader> }
  </>
  }
    </section>
  

  </>
}
