import { Link, useNavigate } from "react-router-dom";

// Components
import { NavbarProfile } from "./navbar-profile/NavbarProfile";

// Libraries
import { Avatar } from "@mantine/core";
import { t } from "i18next";

// Styles
import defaultAvatar from "../../images/user.svg";

export const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  // Simple function that clears the SessionStorage and forces a reload.
  // The guard system redirects the user to the landing page.
  const logOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <NavbarProfile />
      <div className="wrapper-user">
        <Avatar
          src={
            user?.avatar?.name
              ? `https://smi-laravel.fly.dev/images/avatars/${user?.avatar?.name}`
              : defaultAvatar
          }
          size={150}
        />
        <h2>
          {user.first_name} {user.last_name}
        </h2>
        <p>{user.email}</p>
        <div className="wrapper-button">
          <Link to={`/users/${user.id}/editProfile`}>
            <button type="submit" className="primary">
              <span>{t("edit_profile")}</span>
            </button>
          </Link>
          <button onClick={() => logOut()} className="delete">
            <span>{t("logout")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
