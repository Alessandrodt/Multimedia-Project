// components
import { Link } from "react-router-dom";
import { Search } from "../search/Search";

//styles
import defaultAvatar from "../../../images/user.svg";
import logo from "../../../images/picsmi.png";

// Translation
import { t } from "i18next";

export const NavbarHome = ({ setSearchParams }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <>
      <nav>
        <div className="wrapper-navbar-home">
          <div className="log">
            <img src={logo} title="logo smi" alt="company log" />
          </div>
          <div className="wrapper-search-bar-home">
            <Search setSearchParams={setSearchParams} />
          </div>
          <div className="wrapper-sign-home">
              <span className="link-to link-to-folders">
                <Link to={`/users/${user.id}/folders`}>{t("folders")}</Link>
              </span>
              <span className="link-to link-to-groups">
                <Link to={`/users/${user.id}/groups`}>{t("groups")}</Link>
              </span>
            <h6>
              {user.first_name} {user.last_name}
            </h6>
            <span className="icon-user-home">
              <Link to={`/users/${user.id}`}>
                <img
                  className="icong"
                  src={
                    user?.avatar?.name
                      ? `https://smi-laravel.fly.dev/images/avatars/${user?.avatar?.name}`
                      : defaultAvatar
                  }
                  title="Profilo"
                  alt="company logo"
                />
              </Link>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};
