import { useModals } from "@mantine/modals";
import { Login } from "../../components/login/Login";
import { Toggle } from "../toggle/Toggle";
//import landingPageServices from "../../services/landingPageServices";

import { LanguageSelect } from "../language-select/LanguageSelect";
import { SignUp } from "../../components/sign-up/Signup";

//import img
import devices from "../../images/Devices.png";
import logo from "../../images/picsmi.png";
import wireframe from "../../images/Wireframe.png";
//import video
import group from "../../video/Group.mp4";
import homepage from "../../video/homepage.mp4";
import search from "../../video/Search.mp4";

//import Language
import { t } from "i18next";

export const LandingPage = () => {
  const modals = useModals();

  const openContentModal = () => {
    modals.openModal({
      children: <Login />,
    });
  };
  return (
    <>
      {/* navbar */}
      <nav className="navbr">
        <div className="wrapper-nav">
          <div className="logo">
            <a href="#landing-page">
              <img src={logo} title="logo smi" alt="company logo" />
            </a>
          </div>
          <div className="switchlng">
            <LanguageSelect />
          </div>
          <div className="signUp">
            <span onClick={openContentModal} className="button-bg">
              {t("login")}
            </span>
          </div>
        </div>
      </nav>
      {/* header section.wrapper-review. */}
      <header id="landing-page">
        <section className="wrapper-review">
          <article className="review">
            <h1>{t("Welcome")}</h1>
            <div className="wrapper-text">
              <p>
                {t("find")}
                <br />
                {t("findsecond")}
                <br />
                {t("findthird")}
                <br />
              </p>
            </div>
            <div className="image">
              <img
                src={devices}
                title="more devices"
                alt="see the application to join"
              />
            </div>
            <div className="signUp">
              <span className="button-bg">
                <a href="#signUp">{t("signupfree")}</a>
              </span>
            </div>
          </article>
        </section>
      </header>
      {/* main & section */}
      <main>
        {/* wrapper-memories - Relive your emotions */}
        <section className="wrapper-memories">
          <article className="memories">
            <div className="text">
              <h2>{t("emotion")}</h2>
              <p>
                {t("thrill")} <strong>{t("thrillcolor")}</strong>
                {t("thrillsecond")}
              </p>
            </div>
            <div className="video-remember">
              <div className="shadow">
                <video
                  title="homepage"
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
          {/* search you foto */}
          <article className="memories">
            <div className="video-remember">
              <div className="shadow">
                <video
                  title="searchbar"
                  muted
                  autoPlay={"autoplay"}
                  preload="auto"
                  loop
                >
                  <source src={search} type="video/mp4"></source>
                </video>
              </div>
            </div>
            <div className="text end">
              <h2>{t("serch_by_tag")}</h2>
              <p>
                <strong>Search your images</strong> easily{" "}
                <strong>by the tags</strong> you have previously assigned to
                them.
              </p>
            </div>
          </article>
          {/* Share them with all of yours groups. */}
          <article className="memories">
            <div className="text">
              <h2>{t("share_groups")}</h2>
              <p>
                <strong>Create groups</strong> with your friends and share the
                most exciting and meaningful images of your life with them.
              </p>
            </div>
            <div className="video-remember">
              <div className="shadow">
                <video
                  title="your group"
                  muted
                  autoPlay={"autoplay"}
                  preload="auto"
                  loop
                >
                  <source src={group} type="video/mp4"></source>
                </video>
              </div>
            </div>
          </article>
        </section>
        {/* image all pages */}
        <div className="wireframe">
          <img
            src={wireframe}
            title="pages website"
            alt="rewiev all website pages"
          />
        </div>
        {/* signUp */}
        <article className="wrapper-signUp" id="signUp">
          <div className="signUp">
            <div className="text-signUp">
              <p>
                <strong>Welcome to PicSmi!</strong> <br />
                Sign Up to start your <br />
                experience.
              </p>
            </div>
            <div className="sign-up">
              <SignUp />
            </div>
          </div>
        </article>
      </main>
      {/* footer */}
      <footer>
        <div className="wrapper-footer">
          <div className="wrapper-about">
            <h3>About PicSmi</h3>
            <p>
              picSmi is an Italian company that has created an image publishing
              application.
            </p>
          </div>
          <div className="wrapper-about">
            <h3>Contact Us</h3>
            <div className="about-info">
              {/* location-dot */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
              </svg>
              <p>
                Via della Sierra Nevada, 60 00144
                <br /> Roma (RM)
              </p>
            </div>
          </div>
          <div className="wrapper-about">
            <h3>Social</h3>
            {/* facebook */}
            <div className="about-info">
              <svg
                width="13"
                height="25"
                viewBox="0 0 13 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_254_341)">
                  <path d="M12.155 13.91L12.805 9.425H8.58V6.5C8.58 5.265 9.165 4.095 11.05 4.095H13V0.325C13 0.325 11.245 0 9.62 0C6.11 0 3.835 2.145 3.835 6.045V9.425H0V13.91H3.835V24.7H8.58V13.91H12.155Z" />
                </g>
                <defs>
                  <clipPath id="clip0_254_341">
                    <rect width="13" height="24.7" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p>facebook</p>
            </div>
            {/* Twitter */}
            <div className="about-info">
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_254_343)">
                  <path d="M17.9429 4.05714C17.9429 4.22857 17.9429 4.4 17.9429 4.57143C17.9429 10 13.8286 16.2286 6.28571 16.2286C3.94286 16.2286 1.82857 15.5429 0 14.4C0.342857 14.4571 0.628571 14.4571 0.971429 14.4571C2.91429 14.4571 4.62857 13.8286 6.05714 12.6857C4.22857 12.6286 2.74286 11.4857 2.22857 9.82857C2.45714 9.88571 2.74286 9.88571 3.02857 9.88571C3.37143 9.88571 3.77143 9.82857 4.11429 9.77143C2.22857 9.37143 0.8 7.71429 0.8 5.77143V5.71429C1.37143 6 2 6.22857 2.62857 6.22857C1.54286 5.48571 0.8 4.22857 0.8 2.8C0.8 2.05714 1.02857 1.31429 1.37143 0.742857C3.42857 3.25714 6.45714 4.85714 9.82857 5.02857C9.77143 4.74286 9.71428 4.4 9.71428 4.11429C9.71428 1.82857 11.5429 0 13.8286 0C15.0286 0 16.0571 0.514286 16.8 1.31429C17.7714 1.14286 18.6286 0.8 19.4286 0.285714C19.1429 1.25714 18.4571 2.05714 17.6 2.57143C18.4 2.45714 19.2 2.22857 19.9429 1.94286C19.4286 2.74286 18.7429 3.48571 17.9429 4.05714Z" />
                </g>
                <defs>
                  <clipPath id="clip0_254_343">
                    <rect width="20" height="16.5714" />
                  </clipPath>
                </defs>
              </svg>
              <p>Twitter</p>
            </div>
            {/* whatsapp */}
            <div className="about-info">
              <svg
                width="20"
                height="23"
                viewBox="0 0 20 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.0045 4.33472C15.1339 2.45972 12.6429 1.42847 9.99554 1.42847C4.53125 1.42847 0.0848214 5.8749 0.0848214 11.3392C0.0848214 13.0847 0.540179 14.7901 1.40625 16.2945L0 21.4285L5.25446 20.049C6.70089 20.8392 8.33036 21.2544 9.99107 21.2544H9.99554C15.4554 21.2544 20 16.8079 20 11.3436C20 8.69632 18.875 6.20972 17.0045 4.33472ZM9.99554 19.5847C8.51339 19.5847 7.0625 19.1874 5.79911 18.4374L5.5 18.2588L2.38393 19.0758L3.21429 16.0356L3.01786 15.7231C2.19196 14.4106 1.75893 12.8972 1.75893 11.3392C1.75893 6.799 5.45536 3.10257 10 3.10257C12.2009 3.10257 14.2679 3.95972 15.8214 5.51775C17.375 7.07579 18.3304 9.14275 18.3259 11.3436C18.3259 15.8883 14.5357 19.5847 9.99554 19.5847ZM14.5134 13.4151C14.2679 13.2901 13.0491 12.6919 12.8214 12.6115C12.5938 12.5267 12.4286 12.4865 12.2634 12.7365C12.0982 12.9865 11.625 13.5401 11.4777 13.7097C11.3348 13.8749 11.1875 13.8972 10.942 13.7722C9.48661 13.0445 8.53125 12.4731 7.57143 10.8258C7.31696 10.3883 7.82589 10.4195 8.29911 9.47311C8.37946 9.30793 8.33929 9.16507 8.27679 9.04007C8.21429 8.91507 7.71875 7.69632 7.51339 7.20079C7.3125 6.71865 7.10714 6.78561 6.95536 6.77668C6.8125 6.76775 6.64732 6.76775 6.48214 6.76775C6.31696 6.76775 6.04911 6.83025 5.82143 7.07579C5.59375 7.32579 4.95536 7.924 4.95536 9.14275C4.95536 10.3615 5.84375 11.5401 5.96429 11.7053C6.08929 11.8704 7.70982 14.3704 10.1964 15.4463C11.7679 16.1249 12.3839 16.1829 13.1696 16.0669C13.6473 15.9954 14.6339 15.4686 14.8393 14.8883C15.0446 14.3079 15.0446 13.8124 14.9821 13.7097C14.9241 13.5981 14.7589 13.5356 14.5134 13.4151Z" />
              </svg>
              <p>Whatsapp</p>
            </div>
          </div>
        </div>
        <p>
          Copyright
          {/* copiright logo */}
          <svg
            viewBox="0 0 143 143"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M71.5 0C32.0074 0 0 32.0074 0 71.5C0 110.993 32.0074 143 71.5 143C110.993 143 143 110.993 143 71.5C143 32.0074 110.993 0 71.5 0ZM71.5 129.594C39.4646 129.594 13.4062 103.533 13.4062 71.5C13.4062 39.4674 39.4646 13.4062 71.5 13.4062C103.535 13.4062 129.594 39.4674 129.594 71.5C129.594 103.533 103.535 129.594 71.5 129.594ZM71.2486 49.1562C77.1306 49.1562 82.6775 51.4778 86.8418 55.6862C89.4602 58.296 93.6929 58.3395 96.3295 55.7298C98.9566 53.1201 98.9742 48.8787 96.3731 46.2421C89.67 39.4776 80.7465 35.7517 71.2504 35.7517C71.2504 35.7517 71.2591 35.7517 71.2504 35.7517C61.7626 35.7517 52.8307 39.4776 46.1276 46.2421C32.3192 60.1734 32.3192 82.83 46.1276 96.7669C52.8307 103.531 61.7626 107.257 71.2504 107.257C71.2591 107.257 71.2504 107.257 71.2504 107.257C80.7465 107.257 89.67 103.531 96.3731 96.7669C98.9739 94.1309 98.9566 89.8906 96.3295 87.2792C93.6935 84.6784 89.4616 84.7044 86.8418 87.3228C82.6775 91.5291 77.1306 93.8528 71.2486 93.8528C71.2486 93.8528 71.2574 93.8528 71.2486 93.8528C65.3583 93.8528 59.8114 91.5313 55.6387 87.3228C46.9973 78.6032 46.9973 64.4121 55.6387 55.6785C59.8254 51.4744 65.3555 49.1562 71.2486 49.1562Z" />
          </svg>
          2022 PicSmi
        </p>
      </footer>
    </>
  );
};
