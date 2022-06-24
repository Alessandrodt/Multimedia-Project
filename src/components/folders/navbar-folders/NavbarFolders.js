import { InputWithButton } from "../../navbar/search/Srcbar";
import { Link } from "react-router-dom";

import defaultAvatar from "../../../images/user.svg";
import logo from "../../../images/picsmi.png";

export const NavbarFolders = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <>
      <nav>
        <div className="wrapper-navb">
          <div className="log">
            <img src={logo} title="logo smi" alt="company log" />
          </div>
          <div className="srcnav">
            <InputWithButton className="bar" />
          </div>
          <div className="sign">
            <div id="but-grps" className="btt-grps">
              <Link to={`/users/${user.id}/groups`}>
                <button>
                  <span>Groups</span>
                </button>
              </Link>
            </div>
            <div id="box-hello" className="box">
              <h6 className="hello-box">
                {user.first_name} {user.last_name}
              </h6>
              <div className="btt-user">
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
