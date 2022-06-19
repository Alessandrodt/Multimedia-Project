// Components imports
import { EmailVerify } from "./components/verify-user/VerifyUser";
import { Folders } from "./components/folders/Folders";
import { Groups } from "./components/groups/Groups";
import { GroupsDetails } from "./components/groups/GroupsDetails";
import { HomePage } from "./components/home-page/HomePage";
import { LandingPage } from "./components/landing-page/LandingPage";
import { NotFound } from "./components/not-found/NotFound";
import { Profile } from "./components/profile/Profile";
import { SignUp } from "./components/sign-up/Signup";
import { RequireAuth } from "./components/require-auth/RequireAuth";
//import style scss
import "./App.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ModalsProvider } from "@mantine/modals";
import { MantineProvider } from "@mantine/styles";


const App = () => {
  
  return (
    <MantineProvider theme={{ loader: "bars" }}>
      <Router>
        <ModalsProvider>
          <Routes>
            {/* These routes are not guarded */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/users/:userId/groups" element={<Groups />} />
            <Route
              path="/users/:userId/groups/details"
              element={<GroupsDetails />}
            />
            <Route
              path="/users/:userId/folders/:folderId"
              element={<Folders />}
            />
            <Route path="users/:userId/folders" element={<Folders />} />
            <Route path="/users/:userId" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<LandingPage />} />
            <Route
              path="users/:userId/verify/:hash"
              element={<EmailVerify />}
            />
            <Route path="/*" element={<NotFound />} />
            {/* These routes are guarded */}
            <Route element={<RequireAuth />}>
              {/* Inserting a route inside RequireAuth makes it unaccessible without being logged in */}
            </Route>
          </Routes>
        </ModalsProvider>
      </Router>
    </MantineProvider>
  );
};

export default App;
