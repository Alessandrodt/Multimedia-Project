// Components imports
import { LandingPage } from "./components/landing-page/LandingPage";
import { Login } from "./components/login/Login";
import { SignUp } from "./components/sign-up/Sign-up";
import { Groups } from "./components/groups/Groups";

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
       <Route path='/' element={<LandingPage/>}/>
     </Routes>
  </Router>
  )
}

export default App;
