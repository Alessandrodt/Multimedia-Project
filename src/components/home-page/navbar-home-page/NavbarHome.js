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
        <div className="wrapper-na">
          <div className="log">
            <img src={logo} title="logo smi" alt="company log" />
          </div>
          <div className="srcnav">
            <InputWithButton className="bar" />
          </div>
          <h4>
            Hello {user.first_name} {user.last_name}!
          </h4>
          <div className="sign">
            <Link to={`/users/${user.id}`}>
              <button>
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
              </button>
            </Link>
            <button>
            <Link to={`/users/${user.id}/groups`}>
              <img
                className="icong"
                src={group}
                title="Groups"
                alt="company logo"
              />
              </Link>
            </button>
            <Link to={`/users/${user.id}/folders`}>
              <button>
                <span>Folders</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
