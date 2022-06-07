import React, { useState, useEffect } from "react";
//import landingPageServices from "../../services/landingPageServices";

import device from "../../images/device.png";
import logo from "../../images/picsmi.png";
import homepage from "../../video/homepage.mp4";

export const LandingPage = () => {
    
    const [ gallery, setGallery ] = useState([]);

    useEffect(() => {
        //
    })

    return (
        <>
            {/* navbar */}
            <nav>
                <div className="wrapper-nav">
                    <div className="logo">
                        <img src={logo} title="logo smi" alt="company logo" />
                    </div>
                    <div className="signUp">
                        <span>
                            Login
                        </span>
                    </div>
                </div>
            </nav>
            {/* header section.wrapper-review */}
            <header>
                <section className="wrapper-review">
                    <article className="review">
                        <h1>
                            Costruisci il tuo album online.
                        </h1>
                        <div className="wrapper-text">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </div>
                        <div className="image">
                            <img src={device} title="more devices" alt="see the application to join" />
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
                        <h2>
                            Find your memories
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis metus purus. 
                        </p>
                    </div>
                    <div className="video-remember">
                        <div className="shadow">
                            <video width="500" height="400" muted autoPlay={"autoplay"} preLoad="auto" loop>
                                <source src={homepage} type="video/mp4"></source>
                            </video>
                        </div>
                    </div>
                </article>
            </section>
        </>
    )
}

