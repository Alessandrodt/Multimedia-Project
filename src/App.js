import React from "react";
// Components imports
import { Groups } from "./components/groups/GroupsDetails";
import { LandingPage } from "./components/landing-page/LandingPage";
import { SignUp } from "./components/sign-up/Signup";
import { HomePage } from "./components/home-page/HomePage";
import { EmailVerify } from "./components/verify-user/VerifyUser";
import { RequireAuth } from "./components/require-auth/RequireAuth";
//import style scss
import './App.scss';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { ModalsProvider } from '@mantine/modals';
import { MantineProvider } from "@mantine/styles";
import { Upload } from "./components/home-page/Upload";

const App = () => {
  return (
    <MantineProvider theme={{ loader: 'bars' }}>
      <Router>
        <ModalsProvider>
          <Routes>
            {/* These routes are not guarded */}
            <Route path='/home' element={<HomePage />} />
            <Route path='/groups' element={<Groups />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/' element={<LandingPage />} />
            <Route path='users/:userId/verify/:hash' element={<EmailVerify />} />
            <Route path='/upload' element={<Upload />} />
            
            {/* These routes are guarded */}
            <Route element={<RequireAuth />}>
            {/* Inserting a route inside RequireAuth makes it unaccessible without being logged in */}
            </Route>
          </Routes>
        </ModalsProvider>
      </Router>
    </MantineProvider>
  )
}

export default App;
