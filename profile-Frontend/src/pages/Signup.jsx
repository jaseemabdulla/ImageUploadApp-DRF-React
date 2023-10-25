import axios from '../axios'
import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/register', {
        name,
        email,
        password,
      });
  
      // Handle a successful response here
      setEmail('');
      setName('');
      setPassword('');
      navigate('/');
      toast.success('register succesfully');

      
    } catch (error) {
      console.log(error);
      toast.error('Invalid data');
    }
  };
  
  return (
    <div>
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Signup now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={submit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  onChange={e=>setName(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div> 
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  onChange={e=>setEmail(e.target.value)}
                  className="input input-bordered"
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
                  onChange={e=>setPassword(e.target.value)}
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <Link to='/'>
                    login
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup