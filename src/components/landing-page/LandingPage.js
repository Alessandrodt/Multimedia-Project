import React, { useState, useEffect } from "react";
//import landingPageServices from "../../services/landingPageServices";


import { SignUp } from "../../components/sign-up/Signup";

//import img
import devices from "../../images/Devices.png";
import logo from "../../images/picsmi.png";
import wireframe from "../../images/Wireframe.png";
//import video
import group from "../../video/Group.mp4";
import homepage from "../../video/homepage.mp4";
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
                            <span>
                                <a href="#signUp">
                                    Get started it's free
                                </a>
                            </span>
                        </div>
                    </article>
                </section>
            </header>
            {/* main & section */}
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
                                <video muted autoPlay={"autoplay"} preload="auto" loop>
                                    <source src={homepage} type="video/mp4"></source>
                                </video>
                            </div>
                        </div>
                    </article>
                    {/* search you foto */}
                    <article className="memories">
                        <div className="video-remember">
                            <div className="shadow">
                                <video muted autoPlay={"autoplay"} preload="auto" loop>
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
                                <video muted autoPlay={"autoplay"} preload="auto" loop>
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
                <article className="wrapper-signUp" id="signUp">
                    <div className="signUp">
                        <div className="text-signUp">
                            <p>hello</p>
                        </div>
                        <div className="sign-up">
                            <SignUp/>
                        </div>
                    </div>
                </article>
            </main>
            {/* footer */}
            <footer>
                <div className="wrapper-footer">
                    <div className="about">
                        <h3>About PicSmi</h3>
                        <p>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. 
                            Morbi quis metus purus.
                        </p>
                    </div>
                    <div className="about">
                        <h3>Contact Us</h3>
                        <p>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. 
                            Morbi quis metus purus.
                        </p>
                    </div>
                    <div className="about">
                        <h3>Social</h3>
                        <p>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. 
                            Morbi quis metus purus.
                        </p>
                    </div>
                    <div className="about">
                        <h3>Newsletter</h3>
                        <p>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. 
                            Morbi quis metus purus.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

