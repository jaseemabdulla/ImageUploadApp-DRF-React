import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import axios from '../axios';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/slice/userSlice";

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogin = (e)=>{
    e.preventDefault();

    const loginData = {
      email,
      password,
    }

    axios.post('/api/login',loginData,{withCredentials:true}).then((response)=>{
      setEmail('')
      setPassword('')
      console.log(response.data.user);
      dispatch(userLogin({user:response.data.user}))
      navigate('/profile')
      toast.success('login succesfully')

    }).catch((error)=>{
      toast.success('login error')
    })
  }
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <Link to='/signup'>
                    signup
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
