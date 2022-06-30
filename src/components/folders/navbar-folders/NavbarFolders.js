import { InputWithButton } from "../../navbar/search/Srcbar";
import { Link } from "react-router-dom";

import defaultAvatar from "../../../images/user.svg";
import logo from "../../../images/picsmi.png";

export const NavbarFolders = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <>
      <nav>
        <div className="wrapper-folders">
          <div className="logo">
            <Link to={`/Home`}>
              <img src={logo} title="logo smi" alt="company log" />
            </Link>
          </div>
          <div className="wrapper-search-bar">
            <InputWithButton className="search-bar" />
          </div>
          <div className="sign-folders">
            <div className="groups">
              <Link to={`/users/${user.id}/groups`}>
                Groups
              </Link>
            </div>
            <h6>
              {user.first_name} {user.last_name}
            </h6>
            <div className="wrapper-user-home">
              <Link to={`/users/${user.id}`}>
                <img
                  className="user"
                  src={
                    user?.avatar?.name
                      ? `https://smi-laravel.fly.dev/images/avatars/${user?.avatar?.name}`
                      : defaultAvatar
                  }
                  title="Profilo"
                  alt="company logo"
                />
              </Link>
            </div> 
          </div>
        </div>
      </nav>
    </>
  );
};
