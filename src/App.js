// Components imports
import { LandingPage } from "./components/landing-page/LandingPage";
import { Login } from "./components/login/Login";
import { SignUp } from "./components/sign-up/Signup";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { HomePage } from "./components/home-page/HomePage";

const App = () => {
  return (
    <>
      <MantineProvider>
        <ModalsProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </Router>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
};

export default App;
