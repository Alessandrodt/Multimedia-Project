import device from "../../images/device.png";
import homepage from "../../video/homepage.mp4";
import { NavbarLanding } from "./navbar-landing-page/Navbar-landing";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

export const LandingPage = () => {
  i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Welcome to React": "Welcome to React and react-i18next"
        }
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });
  const { t } = useTranslation();

  return (
    <>
      {/* navbar */}
      <NavbarLanding />
      {/* header section.wrapper-review */}
      <header>
        <section className="wrapper-review">
          <article className="review">
            <h1>Costruisci il tuo album online.</h1>
            <h2>{t('Welcome to React')}</h2>;
            <div className="wrapper-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
            <div className="image">
              <img
                src={device}
                title="more devices"
                alt="see the application to join"
              />
            </div>
            <div className="signUp">
              <span>Get started it's free</span>
            </div>
          </article>
        </section>
      </header>
      {/* found your memories */}
      <section className="wrapper-memories">
        <article className="memories">
          <div className="text">
            <h2>Find your memories</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              quis metus purus.
            </p>
          </div>
          <div className="video-remember">
            <div className="shadow">
              <video
                width="500"
                height="400"
                muted
                autoPlay={"autoplay"}
                preload="auto"
                loop
              >
                <source src={homepage} type="video/mp4"></source>
              </video>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};
