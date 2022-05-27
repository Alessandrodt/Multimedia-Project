// Components imports
import { LandingPage } from "./components/landing-page/landing-page";
import { Groups } from "./components/groups/groups";
import { Login } from "./components/login/login";
import { SignUp } from "./components/sign-up/sign-up";

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
