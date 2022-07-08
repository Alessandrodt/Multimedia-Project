import { Link } from 'react-router-dom';
import { t } from "i18next";

export const EditProfile = () =>{

    return (
    <div className='background-img'>
      <section className="notFound">
        <div className="img">
        <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"/>
        <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly"/>
        </div>
        <div className="text">
        <h1>{t("oopsie")}</h1>
        <h2>{t("oopsie_not_available")}</h2>
        <h3>{t("oopsie_back_to_home")}</h3>
        <Link className='yes' to={`/home`}>{t("oopsie_yes")}</Link>
        <a href="https://www.youtube.com/watch?v=G3AfIvJBcGo" target="_blank" rel="noreferrer" >NO</a>
        </div>
       </section>
    </div>
)}