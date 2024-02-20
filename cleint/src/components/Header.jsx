import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
 
const Header = () => {
  return (
    <header className='bg-slate-300 shadow-md'>
       
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
            <Link to="/">
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Ashok Wankhede</span>
                    <span className='text-slate-700'>&nbsp; Real Estate</span>
                </h1>
            </Link>
            <form action="" 
                className='bg-slate-100 p-3 rounded-lg flex items-center'
            >
                <input 
                    type="text"  
                    placeholder='search' 
                    className=' bg-transparent outline-none w-24 sm:w-64 md:w-auto'
                />

                <FaSearch />
            </form>

            <ul className='flex gap-4 pl-2'>
                <Link to="/about"  className='hidden sm:inline text-slate-900 hover:underline' >About</Link>
                <Link to="/profile" className='hidden sm:inline text-slate-900 hover:underline'>Profile</Link>
                <Link to="/sign-in"className='text-slate-900 hover:underline'>Sign-In</Link>
            </ul>

        </div>
    </header>
  )
}

export default Header
