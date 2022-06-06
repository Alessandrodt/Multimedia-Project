import React from "react";
import { Navbar } from "./navbar-landing-page/Navbar-landing";

export const LandingPage = () => {

    return (
        <>
        <Navbar/>
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
