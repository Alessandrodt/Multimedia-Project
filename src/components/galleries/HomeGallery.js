import React from "react"
import { useState, useEffect } from "react"
import { Card } from "./Card" 
import randomImagesServices from "../../services/randomImagesServices";

export function HomeGallery() {
const [galleryImages, setNewGalleryImages ] = useState([]);
const [imageSize, setImageSize] = useState("");

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

    const assignSize = (imageSize) => {
        const sizes = [ "small", "medium", "large" ];

        for ( let i = 0; i < sizes.length; i++) {
            imageSize = sizes.values[i];
        }
        return imageSize
    }

    useEffect(() => {
        randomImagesServices.createGallery()
        .then((galleryImages) => {
            console.log(galleryImages)
            setNewGalleryImages(galleryImages)
            assignSize((imageSize) => { 
                console.log(imageSize)
                setImageSize(imageSize)
            })
        })
    }, []);

    return (
        <div style={styles.container}>
                {galleryImages.map(el => <Card size={imageSize} img={el.urls.regular} key={el.id} />)}
        </div>
    )
}