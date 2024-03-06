import React,{useEffect} from 'react';
import { FaSearch,FaListAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';
import "./style/Header.css";
 
const Header = () => {
  const {currentUser} = useSelector((state )=> state.user);
  useEffect(() => {
    const navButton = document.getElementById('icon');
    navButton.addEventListener('click', () => {
      const nav = document.getElementById('ul');
      nav.classList.toggle('show');
    });

    const liButtons = document.querySelectorAll('.link-li');
    liButtons.forEach(liButton => {
      liButton.addEventListener('click', () => {
        const nav = document.getElementById('ul');
        nav.classList.remove('show');
      });
    });
  },[]);

  return (
    <nav>
        <Link to="/" className="header-title">RealEstateVista</Link>
        <div className="header-search-bar">
            <FaSearch className='search-icon'/>
            <input type="text" name="" id="" className="search-bar" placeholder="Search"></ input>
        </div>
        <div className="header-sign-container">
            <ul className='nav-ul' id="ul">
              <li><Link to="/"   className='link-li' id="l-li" >Home</Link></li>
              <li><Link to="/about"   className='link-li' id="l-li" >About</Link></li>
              <li><Link to="/profile">{
                      currentUser? (<Avatar src={currentUser.avatar} name={currentUser.username} round={true} className='avatar'size='40' value="100" />) :(
                        <p className='link-li'>Sign In</p>
                      )
                    }</Link>
              </li>
            </ul>
            <label className="icon" id="icon">
              <FaListAlt className="icon-bar"></FaListAlt>
            </label>
        </div>
    </nav>
  )
}

export default Header
