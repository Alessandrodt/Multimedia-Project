import React from "react";
// Components imports
import { Groups } from "./components/groups/Groups"; 
import { LandingPage } from "./components/landing-page/LandingPage";
import { Login } from "./components/login/login";
import { SignUp } from "./components/sign-up/sign-up";
import { HomePage } from "./components/home-page/HomePage";


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"



const App = () => {
  return (
  <Router>
     <Routes>
       <Route path='/groups' element={<Groups/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/home' element={<HomePage/>}/>
       <Route path='/' element={<LandingPage/>}/>
     </Routes>
  </Router>
  )
}

export default App;
