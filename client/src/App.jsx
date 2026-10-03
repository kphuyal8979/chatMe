import './index.css'
import {Navigate, Route, Routes} from 'react-router'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ChatPage from './pages/ChatPage'
import { useAuthHook } from './Hook/useAuthHook'
import { useEffect } from 'react'
import PageLoader from './components/PageLoader'

import {Toaster} from 'react-hot-toast'

export default function App() {
 const {checkAuth,isCheckingAuth,authUser} = useAuthHook()

 useEffect(()=>{
  checkAuth()
 },[checkAuth])


 if(isCheckingAuth) return <PageLoader/>
  return (
   
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
       
       
       <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster/>
   </div>
  )
}