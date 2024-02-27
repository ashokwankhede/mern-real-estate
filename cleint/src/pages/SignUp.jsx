import React, { useState } from 'react';
import toast, {Toaster} from 'react-hot-toast';
const SignUp = () => {
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
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
      toast.success('User created successfully')
  }
    setLoading(false);
  };
  return (
    <div>
      
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form action="" className='flex flex-col gap-4 items-center justify-center'>
          <input type="text" placeholder='username' 
          className='outline-teal-200 border p-3 rounded-lg max-w-lg sm:w-80'
          onChange={handelChange} id = "username" onKeyDown={submitEvent}
          />
          <input type="text" placeholder='email' 
          className='outline-teal-200 border p-3 rounded-lg w-100 sm:w-80'
          onChange={handelChange} id = "email" onKeyDown={submitEvent}
          />
          <input type="password" placeholder='password' 
          className='outline-teal-200 border p-3 rounded-lg w-100 sm:w-80'
          onChange={handelChange} id="password" fdprocessedid="jf1c9" autoComplete="current-password" onKeyDown={submitEvent}
          />
          <button
            className="select-none rounded-lg bg-green-500 py-3 px-6 text-center align-middle  font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button" onClick={handelSubmit}
            >{loading ? "loading":"Sign-up" }</button>
        </form>
      </div>
  )
}

export default SignUp
