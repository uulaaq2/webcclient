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

const App = () => {
 
  return (
      <Router>

        <Routes>        
            <Route exact path="/" element={<Home />} />        
            <Route exact path="/signin" element={<SignIn />} />                    
            
        </Routes>

      </Router>
  );
};

export default App;