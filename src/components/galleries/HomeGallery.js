import React from "react";
import { useState, useEffect } from "react";

// components and library
import Masonry from "@mui/lab/Masonry";
import { Card } from "./Card";

// services
import randomImagesServices from "../../services/randomImagesServices";

export function HomeGallery() {
  const [galleryImages, setNewGalleryImages] = useState([]);

  const styles = {
    container: {
      margin: 0,
      padding: 0,
      width: "80%",
      position: "relative",
      left: "50%",
      transform: "translateX(-50%)",
      top:'100px',
    },
  };

  useEffect(() => {
    randomImagesServices.createGallery().then((galleryImages) => {
      galleryImages = galleryImages.map(function (e) {
        return {
          urls: e.urls,
          id: e.id,
        };
      });
      console.log(galleryImages);
      setNewGalleryImages(galleryImages);
    });
  }, []);

  return (
    <div>
      <Masonry columns={[1, 2, 3, 4]} spacing={2} style={styles.container}>
        {galleryImages.map((e) => (
          <Card img={e.urls.regular} key={e.id} />
        ))}
      </Masonry>
    </div>
  );
}
