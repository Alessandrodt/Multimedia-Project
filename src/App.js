// Components imports
import { LandingPage } from "./components/landing-page/landing-page";
import { Login } from "./components/login/login";
import { SignUp } from "./components/sign-up/sign-up";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { useState } from "react";
// import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
// import { DarkTheme } from "./components/theme-toggle/theme-toggle";

const App = () => {
  // const [colorScheme, setColorScheme] = useState("light");
  // const toggleColorScheme = (value) =>
  //   setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <>
      {/* <div>
        {" "}
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme }}
            withGlobalStyles
            withNormalizeCSS
          ></MantineProvider>
          <DarkTheme />
        </ColorSchemeProvider>
      </div> */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
