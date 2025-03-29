import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy } from 'react'
import Layout from './Component/Layout/Layout'
import { Toaster } from 'react-hot-toast'
import { store } from './Component/Redux/Store'
import { Provider} from 'react-redux'
import { ProvContextProvider } from './Context/NavContext'
import { Offline } from "react-detect-offline";
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import Home from './Component/Home/Home'
import ProtectedRoot from './Component/ProtectedRoot/ProtectedRoot'
import UserContextProvider from './UserContext/UserContext'
const ForgotPass = lazy(()=> import('./Component/ForgotPass/ForgotPass'))
const Profile = lazy(()=> import('./Component/Profile/Profile'))
const AllComment = lazy(()=> import('./Component/AllComment/AllComment'))
const AddPost = lazy(()=> import('./Component/AddPost/AddPost'))
const ProfilePhoto = lazy(()=> import('./Component/ProfilePhoto/ProfilePhoto'))
import NotFound from './Component/NotFound/NotFound'

function App() {
  const routers = createBrowserRouter([
    {path : '/' , element : <Layout></Layout> , children :[
      {path : 'login' , element : <Login></Login>},
      {path : 'forgotpass' , element : <ProtectedRoot> <ForgotPass></ForgotPass></ProtectedRoot>},
      {path : 'register' , element : <Register></Register>},
      {path : '/' , element : <ProtectedRoot><Home></Home></ProtectedRoot>},
      {path   : 'profile' , element : <ProtectedRoot> <Profile></Profile></ProtectedRoot>},
      {path   : 'addPost' , element : <ProtectedRoot> <AddPost></AddPost></ProtectedRoot>},
      {path   : 'profilePhoto' , element : <ProtectedRoot> <ProfilePhoto></ProfilePhoto></ProtectedRoot>},
      {path   : 'allComment/:id' , element : <ProtectedRoot> <AllComment></AllComment></ProtectedRoot>},
      {path   : '*' , element : <ProtectedRoot> <NotFound></NotFound></ProtectedRoot>},
    ]},
  ])


  return <>


  <Provider store={store}>
  <UserContextProvider>
    <ProvContextProvider>

  <RouterProvider router={routers}>
</RouterProvider>             

<Offline><div className=" z-50  py-2 px-4 fixed right-0 bottom-0 ">
             <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-900  dark:text-blue-400 dark:blue-red-800" role="alert">
             <i className="fa-solid fa-circle-exclamation me-2"></i>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium me-1">Your Offline ?</span>Please Check your Enternet
  </div>
</div></div></Offline>
  <Toaster
         position="top-center"
         z-indix ='50'
         reverseOrder={false}
         />
    </ProvContextProvider>
         </UserContextProvider>
  </Provider>


  </>
}

export default App
