import style from 'app/style.css'
import React, { createContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import PrivateRoute from 'components/PrivateRoute'

import Home from 'pages/public/home'
import SignIn from 'pages/signIn'
import ChangePassword from 'pages/public/changePassword'

const App = () => {
 
  return (
      <Router>

        <Routes>        
            <Route exact path="/" element={<Home />} />                    
            <Route exact path="/signin" element={<SignIn />} />                    
            <Route path="/me/changepassword/:token" element={<ChangePassword />} />     
            
        </Routes>

      </Router>
  );
};

export default App;