// Components
import { Link } from "react-router-dom";

// Libraries
import { t } from "i18next";

export const EditProfile = () => {
  return (
    <div className="edit-profile">
      <div className="background-img">
      <section className="notFound">
        <div className="img">
          <img
            src="https://assets.codepen.io/5647096/backToTheHomepage.png"
            alt="Back to the Homepage"
          />
          <img
            src="https://assets.codepen.io/5647096/Delorean.png"
            alt="El Delorean, El Doc y Marti McFly"
          />
        </div>
        <div className="text">
          <h2 className="title-text">{t("oopsie")}</h2>
          <h3 className="title-text">{t("oopsie_not_available")}</h3>
          <h4 className="title-text">{t("oopsie_back_to_home")}</h4>
          <div className="choose-profile">
          <Link className="yes" to={`/home`}>
            {t("oopsie_yes")}
          </Link>
          <a
            href="https://www.youtube.com/watch?v=G3AfIvJBcGo"
            target="_blank"
            rel="noreferrer"
          >
            NO
          </a>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};
