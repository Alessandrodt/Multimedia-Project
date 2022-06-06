import React from "react";
import { Navbar } from "./navbar-landing-page/Navbar-landing";

export const LandingPage = () => {

    return (
        <>
        <Navbar/>
        <h1> Hi, welcome to this project!</h1>
        <p>Current routes enabled:</p>
        <ul> 
            <li> LandingPage (This one) == / .</li>
            <li> Signup == /signup .</li>
            <li> Login == /login .</li>
            
        </ul>
        <div>
            <></>
        </div>
        </>
    )
}
