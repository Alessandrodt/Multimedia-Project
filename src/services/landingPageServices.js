import axios from "axios";

const UNSPLASH_KEY = "Ji_F7pcWeS4AvsuieRjBupXzCoUNsD-eZdnLMnVjZ_8";
// https://api.unsplash.com/photos/?client_id=Ji_F7pcWeS4AvsuieRjBupXzCoUNsD-eZdnLMnVjZ_8

const landingImg = `https://api.unsplash.com/photos/?client_id=${UNSPLASH_KEY}`;

const createGallery = (newGallery) => {
    return axios.get(landingImg, newGallery)
 }
 
 const landingPageServices = {createGallery}
 export default landingPageServices;