import axios from "axios";

const UNSPLASH_KEY = "Ji_F7pcWeS4AvsuieRjBupXzCoUNsD-eZdnLMnVjZ_8";
// https://api.unsplash.com/photos/?client_id=Ji_F7pcWeS4AvsuieRjBupXzCoUNsD-eZdnLMnVjZ_8

const randomImg = `https://api.unsplash.com/photos/?client_id=${UNSPLASH_KEY}`;

const createGallery = (newGallery) => {
    return axios.get(randomImg, newGallery)
    .then((x) => {
        console.log(x.data);
        return x.data;
    }).catch((error) => console.log(error));
 }
 
 const randomImagesServices = {createGallery}
 export default randomImagesServices;