import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let UserContext = createContext()



export default function UserContextProvider({children}){

   const [userProfile, setUserProfile] = useState('')
   const [Load, setLoad] = useState(false)

  const headers ={
    token: localStorage.getItem('token') }

  async function userData(){
    setLoad(true)
    try{
      let {data} =await axios.get(`https://linked-posts.routemisr.com/users/profile-data`,
      {
          headers
      }
  );
       console.log(data);
       setUserProfile(data.user)
       setLoad(false)
  }catch(err){
      console.log(err);
      setLoad(false)
  }

  }
  
      useEffect(()=>{
        userData()
      },[])
      


return <UserContext.Provider value={{userProfile,setUserProfile,Load,setLoad}}>
    {children}
</UserContext.Provider>

}