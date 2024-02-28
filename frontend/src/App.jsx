import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/Signup'
import { Route,Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { useAuthContext } from './context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'
function App() {
  const {authUser} = useAuthContext()
  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path ="/" element={authUser ? <Home/>:<Login /> }/>
          <Route path ="/login" element={authUser ? <Navigate to="/" /> :<Login/>}/>
          <Route path ="/signup" element={authUser?<Navigate to="/" /> : <SignUp/>}/>
        </Routes>
      </div>
      <Toaster/>

    </>
  )
}

export default App