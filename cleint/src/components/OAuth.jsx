import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../fireBase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { signinStart,signinFailure,signinSuccess } from '../redux/user/userSlice';
import "./style/oauth.css"

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleClickHandler = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/auth/google",{
                method:'POST',
                headers:{
                'Content-Type':'application/json'
                },
                body:JSON.stringify({name:result.user.displayName,email:result.user.email,photoURL:result.user.photoURL})
            }
       );
       
       if (res.ok) {
        const data = await res.json();
        debugger
        toast.success(data.message)
        dispatch(signinSuccess(data));
        navigate("/")
      } else {
        console.error('Failed to sign in with Google');
      }   
    } catch (error) {
      console.log("Could not sign in with Google", error);
    }
  };

  return (
    <button type='button' className='btn-google google-btn'   onClick={googleClickHandler}>Continue with Google</button>
  );
}

export default OAuth;
