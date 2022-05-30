import style from 'app/style.css'
import React, { createContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"
import PublicRoute from 'components/PublicRoute'
import PrivateRoute from 'components/PrivateRoute'

import PublicHome from 'pages/public/home'
import SignIn from 'pages/signIn'
import SignOut from 'pages/signOut'
import ChangePassword from 'pages/public/changePassword'

import ProtectedHome from 'pages/protected/home'

const App = () => {
 
  return (
      <Router>

        <Routes>        
            <Route exact path="/signin" element={<SignIn />} />                    
            <Route exact path="/signout" element={<SignOut />} />                                
            <Route path="/me/changepassword/:token" element={<ChangePassword />} />     

            <Route 
              path="/public"
              element={
                <PublicRoute element={<PublicHome />} />
              }
            />

            <Route 
              path="/" 
              element={
                <PrivateRoute element={<ProtectedHome />} />
              }            
            />
            
        </Routes>

      </Router>
  );
};

export default App;