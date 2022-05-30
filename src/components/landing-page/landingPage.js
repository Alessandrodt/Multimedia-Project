import React, { useState } from "react";
import landingPageServices from "../../services/landingPageServices";

export const LandingPage = () => {
    
    // const [ gallery, setGallery ] = useState([]);

    // const populateGallery = "la chiamata in get"

    return (
        <>
        <h1> Hi, welcome to this project!</h1>
        <p>Current routes enabled:</p>
        <ul> 
            <li> LandingPage (This one) == / .</li>
            <li> Signup == /signup .</li>
            <li> Login == /login .</li>
        </ul>
        </>
    )
}