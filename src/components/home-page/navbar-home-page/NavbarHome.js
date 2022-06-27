import { InputWithButton } from "../../navbar/search/Srcbar";
import { Link } from "react-router-dom";

import defaultAvatar from "../../../images/user.svg";
import group from "../../../images/group.svg";
import logo from "../../../images/picsmi.png";

export const NavbarHome = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <>
      <nav>
        <div className="wrapper-navbar-home">
          <div className="log">
            <img src={logo} title="logo smi" alt="company log" />
          </div>
          <div className="wrapper-search-bar-home">
            <InputWithButton className="bar" />
          </div>
          <div className="wrapper-sign-home">
            <div className="button">
              <span>
                <Link to={`/users/${user.id}/groups`}>
                  Groups
                </Link>
              </span>
            </div>
            <div className="button">
              <span className="">
                <Link to={`/users/${user.id}/folders`}>
                  Folders
                </Link>
              </span>
            </div>
            <h6 className="hello-box">
              {user.first_name} {user.last_name}
            </h6>
            <span className="btt-user">
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
