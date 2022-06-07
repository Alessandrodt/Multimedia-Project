import React from "react"
import { useState, useEffect } from "react"
import { Card } from "./Card" 
import randomImagesServices from "../../services/randomImagesServices";

export function HomeGallery() {
const [galleryImages, setNewGalleryImages ] = useState([]);

    const styles = {
        container: {
            margin: 0,
            padding: 0,
            width: '90vw',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 250px)',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            justifyContent: 'center',
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
        <div style={styles.container}>
                {galleryImages.map(e => <Card size={e.size} img={e.urls.regular} key={e.id} />)}
        </div>
    )
}