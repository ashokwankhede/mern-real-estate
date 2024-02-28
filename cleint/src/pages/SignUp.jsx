import React, { useState } from 'react';
import toast, {Toaster} from 'react-hot-toast';
import { Link,useNavigate } from 'react-router-dom';
import "./styles/signup.css"
const SignUp = () => {
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };


  const submitEvent = (e) =>{
    if(e.key==='Enter'){
      handelSubmit(e)
    }
  };

  const handelSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true)
    const res = await fetch("/api/auth/sign-up",
    {
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.status ===false){
      setLoading(false);
    }else if (data.status===true){
      toast.success(data.message)
      navigate("/sign-in")
  }
    setLoading(false);
  };
  return (
    <div className="container">
        <div className="sign-up-form">
            <h1 className='signup-title'>Sign Up</h1>
            <form className="inputs-container">
                <input 
                  className="sign-up-inpt" type="text" placeholder="Name"
                  onChange={handelChange} id ="username" onKeyDown={submitEvent}
                />

                <input 
                  className="sign-up-inpt" type="email"  placeholder="Email"
                  onChange={handelChange} id= "email" onKeyDown={submitEvent}
                />
                <input 
                  className="sign-up-inpt" type="password"  placeholder="Password"
                  onChange={handelChange} id="password" fdprocessedid="jf1c9" autoComplete="current-password" onKeyDown={submitEvent}

                />
                <div className="button-container">
                    <button className="btn google-button">Google Sign-Up</button>
                    <button className="btn sign-up-button" onClick={handelSubmit}>{loading ? "loading":"Sign-up" }</button>
                </div>
                <p className="sign-up-text">Already have an account? &nbsp; <Link to="/sign-up" className='nav-a'>signIn</Link></p>
            </form>
            <svg className="bottom-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ff5500" fill-opacity="1" d="M0,224L120,224C240,224,480,224,720,192C960,160,1200,96,1320,64L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
        </div>
    </div>
  )
}

export default SignUp
