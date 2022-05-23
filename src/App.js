// Components imports
import { Home } from "./components/homepage/home";
import { Login } from "./components/login/login";
import { SignUp } from "./components/sign-up/sign-up";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"


function App() {
  return (
  <Router>
     <Routes>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/' element={<Home/>}/>
     </Routes>
  </Router>
  )
}

export default App;
