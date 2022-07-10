//Import Translate
import i18next from "i18next";
import {t} from "i18next";

export const LanguageSelect = () => {
  // In these ternary operators 't' is checked to see what is the global language state.
  // If it's not english, then it's italian and vice versa.
  const lng = i18next.language === "en" ? "it" : "en";

  // This function imports changeLanguage from i18next and gives the code in string
  // format via the lng parameter.
  const languageSwitch = (lng) => {
    i18next.changeLanguage(lng);
  };

  return (
    <>
      <div className="switch-box">
        <div>
          <label id="cange" className="switch">
            <input type="checkbox"></input>
            <span className="sliderr round" onClick={() => languageSwitch(lng)}>
              <div className="language-box">
            <p className="lngtext">{t("lng")}</p>
            <p className="lngtitle">{t("code")}</p>
            </div>
            </span>
          </label>
        </div>
        <div className="switch-img">
        </div>
      </div>
    </>
  );
};
