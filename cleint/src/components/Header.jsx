import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "./style/Header.css"
 
const Header = () => {
  return (
    <header className="header-content">
        {/* <img src=".\image-removebg-preview.png" alt="logo img" className='logo'></img> */}
        <Link to="/" className="header-title">RealEstateVista</Link>
        <div className="header-search-bar">
        <FaSearch className='search-icon'/>
            <input type="text" name="" id="" className="search-bar" placeholder="Seach or type for places"/>
        </div>
        <div className="header-sign-container">
            <ul className='flex gap-4 pl-2'>
                    <Link to="/about"   className='link-li' >About</Link>
                    <Link to="/profile" className='link-li' >Profile</Link>
                    <Link to="/sign-in" className='link-li'>Sign-In</Link>
            </ul>
        </div>
    </header>
  )
}

export default Header
