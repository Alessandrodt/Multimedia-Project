import { Link } from "react-router-dom";

import { LanguageSelect } from "../../language-select/LanguageSelect";

import logo from "../../../images/picsmi.png";
import { t } from "i18next";

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
            <div className="switchlng">
              <LanguageSelect />
            </div>
            <div className="button">
              <span>
                <Link to={`/users/${user.id}/groups`}>
                  {t("groups")}
                </Link>
              </span>
            </div>
            <div className="button">
              <span className="">
                <Link to={`/users/${user.id}/folders`}>
                {t("folders")}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
