import React from 'react'
//React Router Imports
import { createBrowserRouter,
       createRoutesFromElements,
       Route,
       RouterProvider } from 'react-router-dom'

  //Imports From Pages
import LayoutRoute from './Pages/LayoutRoute'
import SignIn from './Pages/SignIn'
import SignOut from './Pages/SignUp'



export default function AppRouter() {
    const router = createBrowserRouter(createRoutesFromElements(
        <>
        <Route path="/" element={<LayoutRoute />} >
        <Route index  element={<SignIn />}  />  
        <Route path="signup"  element={<SignOut />}  />  
        </Route>
        </>
    ))
  return (<RouterProvider router={router} />)
  
}
