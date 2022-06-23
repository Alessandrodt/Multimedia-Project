//Import Translate
import i18next from "i18next";
import t from "i18next";

//Import Images
import britishFlag from "../../images/britishFlag.svg";
import italianFlag from "../../images/italianFlag.svg";

export const LanguageSelect = () => {
  // In these ternary operators 't' is checked to see what is the global language state.
  // If it's not english, then it's italian and vice versa.
  const lng = t.language === "en" ? "it" : "en";

  const img = t.language === "en" ? britishFlag : italianFlag;

  // This function imports changeLanguage from i18next and gives the code in string
  // format via the lng parameter.
  const languageSwitch = (lng) => {
    i18next.changeLanguage(lng);
  };

  return (
    <>
      <div className="switch-box">
        <div>
          <label className="switch">
            <input type="checkbox"></input>
            <span className="slider round" onClick={() => languageSwitch(lng)}>
              <p className="lngtext">{t.language}</p>
            </span>
          </label>
        </div>
        <div className="switch-img">
          <img src={img} alt={"Language Select"} />
        </div>
      </div>
    </>
  );
};
