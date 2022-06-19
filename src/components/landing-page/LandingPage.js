import device from "../../images/device.png";
import homepage from "../../video/homepage.mp4";
import { NavbarLanding } from "./navbar-landing-page/Navbar-landing";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import i18next from 'i18next'
import cookies from 'js-cookie'
import { useEffect } from "react";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({

    fallbackLng: "en",
    detection: {
      order: ['cookie','htmlTag',  'localStorage', 'path', 'subdomain'],
      caches:['cookie'],
    },

    backend: {
      loadPath: 'assets/locales/{{lng}}/translation.json',
    },
    react: { useSuspense: false },
  });

export const LandingPage = () => {
  const { t } = useTranslation();

  const languages = [
    {
      code:'fr',
      name:'français',
      country_code:'fr',

  },
  {
    code:'en',
    name:'english',
    country_code:'gb',

}
]

  return (
    <>
      {/* navbar */}
      <NavbarLanding />
      {/* header section.wrapper-review */}
      <header>
        <section className="wrapper-review">
          <article className="review">
            <h1>Costruisci il tuo album online.</h1>
            <h2>{t("welcome_message")}</h2>;
            <h2>{t("country")}</h2>;
            {languages.map(({code, name, country_code})=>
             <button onClick={()=> i18next.changeLanguage(code)}>cambia</button>
            )}
           
            <div>

            </div>

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
