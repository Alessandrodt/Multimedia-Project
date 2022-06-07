import React from "react";
// Components imports
import { Groups } from "./components/groups/GroupsDetails"; 
import { LandingPage } from "./components/landing-page/LandingPage";
import { Login } from "./components/login/Login";
import { SignUp } from "./components/sign-up/Signup";
import { HomePage } from "./components/home-page/HomePage";

//import style scss
import './App.scss';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { ModalsProvider } from '@mantine/modals';
import { MantineProvider } from "@mantine/styles";

const App = () => {
  return (
    <MantineProvider>
    <ModalsProvider>
  <Router>
     <Routes>
       <Route path='/groups' element={<Groups/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/home' element={<HomePage/>}/>
       <Route path='/' element={<LandingPage/>}/>
     </Routes>
  </Router>
  </ModalsProvider>
  </MantineProvider>
  )
}

export default App;
