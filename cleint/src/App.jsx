import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import {Toaster} from 'react-hot-toast';
import "./index.css"
const App = () => {
  return (
    <>
     <Toaster
      position="top-center"
      toastOptions={{
          success: {
                theme: {
                    primary: '#4aed88',
                },
            },
      }}
      containerClassName='custom-toaster' 
      ></Toaster>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home   />} />
          <Route path='/sign-in' element={<SignIn   />} />
          <Route path='/sign-up' element={<SignUp   />} />
          <Route path='/about' element={<About   />} />
          <Route path='/profile' element={<Profile   />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
