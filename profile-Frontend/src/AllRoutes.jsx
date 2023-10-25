import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Signup from './pages/Signup'
import LoginPage from './pages/LoginPage'
import Profile from './pages/Profile'
import AdminUserList from './pages/AdminUserList'

function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route exact path='/' element={<LoginPage/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/admin' element={<AdminUserList/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes