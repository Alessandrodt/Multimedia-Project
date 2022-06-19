import React from "react";
import { useState, useEffect } from "react";
import { Card } from "./Card";
import Masonry from '@mui/lab/Masonry';
import randomImagesServices from "../../services/randomImagesServices";

export function HomeGallery() {
const [galleryImages, setNewGalleryImages ] = useState([]);

    const styles = {
        container: {
            margin: 0,
            padding: 0,
            width: '80vw',
            transform: 'translateX(-50%)',
            position: 'relative',
            top:'100px',
            left: '50%',
        }
    }


    useEffect(() => {
        randomImagesServices.createGallery()
        .then((galleryImages) => {
            const sizes = [ "small", "medium", "large" ];
        
            galleryImages = galleryImages.map(function(e, i) {
                return { 
                    "urls":  e.urls, 
                    "size" : sizes[i % 3] ,
                    "id" : e.id
                };
              })
              console.log(galleryImages);           
            setNewGalleryImages(galleryImages)
        })
    }, []);

return (
     <div>
             <Masonry columns={5} spacing={2} style={styles.container}>
                    {galleryImages.map(e => <Card size={e.size} img={e.urls.regular} key={e.id} />)}
                </Masonry>
     </div>
    )
}