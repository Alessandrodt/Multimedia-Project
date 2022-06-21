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
          <div className="sign">
              <div className="hello-box">
                <h6>
                  Hello
                </h6>
                <h6>
                 {user.first_name} {user.last_name}!
                </h6>
              </div>
              <div>
                <Link to={`/users/${user.id}`}>
                  <button id="button-profile">
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
            </div>
            <div>
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
            </div>
            <div className="folders">
              <Link to={`/users/${user.id}/folders`}>
                <button>
                  <span>Folders</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
