import { InputWithButton } from "../../navbar/search/Srcbar";
import { Link } from "react-router-dom";

import logo from "../../../images/picsmi.png";

export const NavbarProfile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <>
      <nav>
        <div className="wrapper-navbar-home">
          <div className="log">
            <Link to={`/Home`}>
              <img src={logo} title="logo smi" alt="company log" />
            </Link>
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
          </div>
        </div>
      </nav>
    </>
  );
};
