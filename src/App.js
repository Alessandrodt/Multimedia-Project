import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components imports
import { EditProfile } from "./components/edit-profile/EditProfile";
import { EmailVerify } from "./components/verify-user/VerifyUser";
import { FoldersList } from "./components/folders/FoldersList";
import { Groups } from "./components/groups/Groups";
import { GroupsDetails } from "./components/groups/GroupsDetails";
import { GroupSharing } from "./components/groups/GroupSharing";
import { HomePage } from "./components/home-page/HomePage";
import { LandingPage } from "./components/landing-page/LandingPage";
import { NotFound } from "./components/not-found/NotFound";
import { NotOwnedGroups } from "./components/groups/NotOwnedGroups";
import { Profile } from "./components/profile/Profile";
import { SignUp } from "./components/sign-up/Signup";
import { RequireAuth } from "./components/require-auth/RequireAuth";

// import style scss
import "./App.scss";

// import libraries
import { ModalsProvider } from "@mantine/modals";
import { MantineProvider } from "@mantine/styles";
import { Toaster } from "react-hot-toast";

//import i18n
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { useTranslation } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "it-IT",
    detection: {
      order: [
        "cookie",
        "navigator",
        "htmlTag",
        "localStorage",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },

    backend: {
      loadPath: "assets/locales/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
  });

const App = () => {
  const { t } = useTranslation();

  return (
    <MantineProvider theme={{ loader: "bars" }}>
      <Router>
        <Toaster
          toastOptions={{
            className: "notification",
            duration: 2500,
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
              fontSize: 20,
            },
          }}
        />
        <ModalsProvider>
          <Routes>
            {/* These routes are not guarded */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<LandingPage />} />
            <Route
              path="users/:userId/verify/:hash"
              element={<EmailVerify />}
            />
            <Route path="/*" element={<NotFound />} />
            {/* These routes are guarded */}
            <Route element={<RequireAuth />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/users/:userId/groups" element={<Groups />} />
              <Route path="/users/:userId/editProfile" element={<EditProfile/>}/>
              <Route
                path="/users/:userId/groups/:groupId/details"
                element={<GroupsDetails />}
              />
              <Route
                path="/users/:userId/groups/:groupId/share"
                element={<GroupSharing />}
              />
              <Route
                path="/users/:userId/groups/shared"
                element={<NotOwnedGroups />}
              />
              <Route
                path="/users/:userId/folders/:folderId"
                element={<FoldersList />}
              />
              <Route path="users/:userId/folders" element={<FoldersList />} />
              <Route path="/users/:userId" element={<Profile />} />
              {/* Inserting a route inside RequireAuth makes it unaccessible without being logged in */}
            </Route>
          </Routes>
        </ModalsProvider>
      </Router>
    </MantineProvider>
  );
};

export default App;
