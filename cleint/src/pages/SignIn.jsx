import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import "./styles/signin.css";
import { useDispatch,useSelector } from 'react-redux';
import { signinStart,signinFailure,signinSuccess } from '../redux/user/userSlice';


const SignIn = () => {
  const [formData,setFormData] = useState({});
  const {loading,error} = useSelector((state)=> state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelChange = (event) =>{
    setFormData({
      ...formData,
      [event.target.id]:event.target.value,
    });
  };

  const submitEvent = (e) =>{
    if(e.key==='Enter'){
      handelSubmit(e)
    }
  };

  const handelSubmit = async (e) =>{
    try{e.preventDefault();
        dispatch(signinStart());
        const res = await fetch("/api/auth/sign-in",
        {
          method:'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.status ===false){
          dispatch(signinFailure(data.message));
          toast.error(data.message);
        }else if (data.status===true){
          dispatch(signinSuccess(data));
          toast.success(data.message);
          navigate("/")
      }
    } catch (e) {
      dispatch(signinFailure(e.message));
      toast.error(e.message);
    };
  };
  return (
    <div className="container">
      <div class="signin-container">
        <h1 className="title-signin">
          Sign In
        </h1>
        <form class="input-wrapper">
            <input  
              type="text" class="input-box"  id="email"
              placeholder='Email' onChange={handelChange} onKeyDown={submitEvent}
            />
            <input 
              type="password" class="input-box"  id='password'
              placeholder='Password' onChange={handelChange} onKeyDown={submitEvent}
            />
            <button className="submit-button btn-signin" onClick={handelSubmit}>{loading? "laoding":"SignIn"}</button>
        </form> 
    </div>
      <p className="text-para">Not have an account?&nbsp; <Link to="/sign-up" className='sign-up-link'>SIgn Up</Link></p>
    </div>
  )
}

export default SignIn