import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {Link,useNavigate} from 'react-router-dom';
import Avatar from 'react-avatar';
import {  
  updateUserFailure,
  updateUserSuccess,
  updateStart,
  startDeleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  logOutStart,
  logOutSuccess,
  logOutFailure
  } from '../redux/user/userSlice';
import "./styles/profile.css";

const Profile = () => {
  const {currentUser,loading,error} = useSelector((state )=> state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedProfile, setUpdatedProfile] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: ''
  });
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
    if (data.status ===false){
      dispatch(updateUserFailure(data.message));
      toast.error(data.message);
      return
    }
    toast.success("Profile updated successfully");
    dispatch(updateUserSuccess(data.user));

  } catch(error) {
    toast.error(error.message); 
    dispatch(updateUserFailure(error.message));
  } 
  };

  const handleDeleteUser = async (e) => {
    dispatch(startDeleteUser());
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        } 
      });
      const data = await res.json();
  
      if (data.status === true) {
        dispatch(deleteUserSuccess(data));
        toast.success("User deleted successfully");
        navigate("/");
      } else {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.error("Error deleting user:", error);
      toast.error("An error occurred while deleting user.");
    }
  };
  const logOut = async () => {  
    try {
      dispatch(logOutStart());
    const res = await fetch('/api/user/logout',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await res.json();
    if (data.status === true) {
      dispatch(logOutSuccess(data.message));
      navigate("/");
      toast.success(data.message);
      return;
  } else{
    toast.error("An error occurred while logging out");
    dispatch(logOutFailure(data.message));
  };
  } catch (error){
    dispatch(logOutFailure("Failed to log out"));
  console.error("Error logging out:", error);
  toast.error("An error occurred while logging out.");
  }
};

  return (
    <div className="profile-container">
      <div className='profile-img-div'> 
        <Avatar src={currentUser.avatar} 
        name={currentUser.username} 
        round={true} color={Avatar.getRandomColor('sitebase', 
          ['red', 'green', 'blue','yellow','pink']
          )}
           className="profileImg"
          />
      </div>
      <div className="update-form">
        <h2>Update &nbsp; Form</h2>
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
            type="password"
            className='profile-input'
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <div className="btn-wrapper">
            <button type="button" onClick={handleSubmit} className='p-btn update-btn'>{loading? "Laoding": "Update"}</button>
            <Link type="button" className='p-btn cancel-btn'  to="/">Cancel</Link>
          </div>
          <Link className='list-btn'>Create  List</Link>
        </div>
      </div>
      <div className="options">
      <button onClick={handleDeleteUser}>Delete Account</button>
        <button onClick={logOut}>Log Out</button>
      </div>
      <span className='lists-span'>Show Lists</span>
    </div>
  );
};

export default Profile;