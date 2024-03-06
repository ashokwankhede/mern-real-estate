import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom';
import Avatar from 'react-avatar';
import {updateUserFailure,updateUserSuccess,updateStart} from '../redux/user/userSlice';
import "./styles/profile.css";

const Profile = () => {
  const {currentUser} = useSelector((state )=> state.user);
  const dispatch = useDispatch();
  const [updatedProfile, setUpdatedProfile] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: ''
  });
  const {loading,setLaoding} = useSelector((state)=> state.user);
  const handleChange = (e) => {
    setUpdatedProfile({
     ...updatedProfile,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    try {
    const res = await fetch(`/api/user/update/${currentUser._id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(updatedProfile)
    }); 
    const data = await res.json();
    console.log(data);
    toast.success("Profile updated successfully");
    dispatch(updateUserSuccess(data.user));

  } catch(error) {
    toast.error(error.message); 
    dispatch(updateUserFailure(error.message));
  } 
  };
  return (
    <div className="profile-container">
      <div className="profileImg"> 
        <Avatar src={currentUser.avatar} 
        name={currentUser.username} 
        round={true} color={Avatar.getRandomColor('sitebase', 
          ['red', 'green', 'blue','yellow','pink']
          )}
          size='70' 
          />
      </div>
      <div className="update-form">
        <div className="inpt-wrapper">
          <input
            type="text"
            className='profile-input'
            id="username"
            placeholder="Username"
            value={updatedProfile.username}
            onChange={handleChange}

          />
          <input
            type="text"
            className='profile-input'
            id="email"
            placeholder="Email"
            value={updatedProfile.email}
            onChange={handleChange}
          />
          <input
            type="text"
            className='profile-input'
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <div className="btn-wrapper">
            <button type="button" onClick={handleSubmit}>{loading? "Laoding": "Update"}</button>
            <Link type="button"  to="/">Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;