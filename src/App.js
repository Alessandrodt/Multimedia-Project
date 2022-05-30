// Components imports
<<<<<<< HEAD

import { LandingPage } from "./components/landing-page/landing-page";
=======
import { LandingPage } from "./components/landing-page/landingPage";
>>>>>>> 84083cc4da73b00ddbefea68c673a5a2e5c53426
import { Login } from "./components/login/login";
import { SignUp } from "./components/sign-up/sign-up";
import { HomePage } from "./components/home-page/home-page";


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import React from "react";


function App() {
  return (
  <Router>
     <Routes>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/home' element={<HomePage/>}/>
       <Route path='/' element={<LandingPage/>}/>
     </Routes>
  </Router>
  )
}

export default App;
