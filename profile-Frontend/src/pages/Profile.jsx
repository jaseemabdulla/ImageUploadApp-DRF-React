import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from '../axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {baseURL} from '../axios'
import { userLogin } from "../redux/slice/userSlice";

function Profile() {
  const user = useSelector((state) => state.userSlice.user);

  const dispatch = useDispatch()
  
  

  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [bio, setBio] = useState(user ? user.bio : '');
  const [image, setImage] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("image", image);

    console.log('fdsfdffff',formData)
    
    axios.post('/api/update', formData,{
      withCredentials:true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
  }).then((res)=>{
    console.log(res)
    dispatch(userLogin({user:res.data}))
    document.getElementById("my_modal_5").close()
    
  })
  };

  return (
    <>
      {user && <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${
            user.image
              ? baseURL + user.image
              : "https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg"
          })`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello {user.name}</h1>
            <p className="mb-5">{user.bio}</p>
            <button
              className="btn"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Edit User
            </button>
            <dialog
              id="my_modal_5"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e)=>{setName(e.target.value)}}
                      placeholder="Your name"
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
                      value={email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                      placeholder="email"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Image</span>
                    </label>
                    <input
                      type="file"
                      onChange={(e)=>{setImage(e.target.files[0])}}
                      accept=".jpg, .jpeg" // Restrict to .jpg and .jpeg files
                      className="input input-bordered"
                      
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Bio</span>
                    </label>
                    <textarea
                      placeholder="Write a short bio"
                      value={bio}
                      onChange={(e)=>{setBio(e.target.value)}}
                      className="textarea textarea-bordered"
                      required
                    ></textarea>
                  </div>

                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </div>}
     
    </>
  );
}

export default Profile;
