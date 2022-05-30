import React, { useState, useEffect } from "react";
import landingPageServices from "../../services/landingPageServices";

export const LandingPage = () => {
    
    const [ gallery, setGallery ] = useState([]);

    useEffect(() => {
        //
    })

    return (
        <>
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