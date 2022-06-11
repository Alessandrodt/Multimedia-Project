import React, { useState, useEffect } from "react";
//import landingPageServices from "../../services/landingPageServices";


import { SignUp } from "../../components/sign-up/sign-up";

//import img
import devices from "../../images/Devices.png";
import logo from "../../images/picsmi.png";
import wireframe from "../../images/Wireframe.png";
//import video
import group from "../../video/Group.mp4";
import homepage from "../../video/Homepage.mp4";
import search from "../../video/Search.mp4";


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
            {/* header section.wrapper-review - Find your memories. */}
            <header>
                <section className="wrapper-review">
                    <article className="review">
                        <h1>
                            Find your memories.
                        </h1>
                        <div className="wrapper-text">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </div>
                        <div className="image">
                            <img src={devices} title="more devices" alt="see the application to join" />
                        </div>
                        <div className="signUp">
                            <span>Get started it's free</span>
                        </div>
                    </article>
                </section>
            </header>
            <main>
                {/* Relive your emotions */}
                <section className="wrapper-memories">
                    <article className="memories">
                        <div className="text">
                            <h2>
                                Relive your emotions.
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis metus purus. 
                            </p>
                        </div>
                        <div className="video-remember">
                            <div className="shadow">
                                <video width="600" height="500" muted autoPlay={"autoplay"} preload="auto" loop>
                                    <source src={homepage} type="video/mp4"></source>
                                </video>
                            </div>
                        </div>
                    </article>
                    {/* search you foto */}
                    <article className="memories">
                        <div className="video-remember">
                            <div className="shadow">
                                <video width="600" height="500" muted autoPlay={"autoplay"} preload="auto" loop>
                                    <source src={search} type="video/mp4"></source>
                                </video>
                            </div>
                        </div>
                        <div className="text end">
                            <h2>
                                Search by tag.
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis metus purus. 
                            </p>
                        </div>
                    </article>
                    {/* Share them with all of yours groups. */}
                    <article className="memories">
                        <div className="text">
                            <h2>
                                Share them with all of yours groups.
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis metus purus. 
                            </p>
                        </div>
                        <div className="video-remember">
                            <div className="shadow">
                                <video width="600" height="500" muted autoPlay={"autoplay"} preload="auto" loop>
                                    <source src={group} type="video/mp4"></source>
                                </video>
                            </div>
                        </div>
                    </article>
                </section>
                {/* image all pages */}
                <div className="wireframe">
                    <img src={wireframe} title="pages website" alt="rewiev all website pages" />
                </div>
                {/* signUp */}
                <article className="wrapper-signUp">
                    <div className="signUp">
                        <div className="text-signUp">
                            <p>hello</p>
                        </div>
                        <div className="sign-up">
                            <div className="wrapper-img">
                                <p className="font-size">PicSmi</p>
                                <div className="img">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" fill="none" viewBox="0 0 58 58">
                                        <circle cx="29" cy="29" r="29"/>
                                        <path fill="#fff" d="M29.1106 30.1988C33.9051 30.1988 37.7909 26.2505 37.7909 21.3789C37.7909 16.5073 33.9051 12.5591 29.1106 12.5591C24.3161 12.5591 20.4303 16.5073 20.4303 21.3789C20.4303 26.2505 24.3161 30.1988 29.1106 30.1988ZM35.1868 32.4038H34.0543C32.5488 33.1066 30.8737 33.5063 29.1106 33.5063C27.3474 33.5063 25.6791 33.1066 24.1669 32.4038H23.0344C18.0025 32.4038 13.92 36.5519 13.92 41.6646V44.5311C13.92 46.3571 15.3781 47.8385 17.1752 47.8385H41.046C42.8431 47.8385 44.3011 46.3571 44.3011 44.5311V41.6646C44.3011 36.5519 40.2186 32.4038 35.1868 32.4038Z"/>
                                    </svg>
                                </div>
                                <p>Sign Up</p>
                            </div>
                            <SignUp/>
                        </div>
                    </div>
                </article>
            </main>
            <footer>

            </footer>

        </>
    )
}

