<<<<<<< HEAD
import React, { useState } from "react";
import landingPageServices  from "../../services/landingPageServices";
=======
import React, { useState, useEffect } from "react";
import landingPageServices from "../../services/landingPageServices";
>>>>>>> 7f5117fce0d238646874f98f983d74c912a3ab0b

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