// import React from "react";
// import { useState, useEffect } from "react";

// export function Search() {
// child component
// export function Card({size, img}) {
//     const styles = {
//         card: {
//             margin: '10px 10px',
//             padding: 0,
//             borderRadius: '16px',
//         },
//         small: {

//         },
//         medium: {
//         },
//         large: {
//         }
//     }

//     const detailComponent = () => {
//         console.log("make this component pls")
//     }

//     return (
//             <img src={img} alt="random images" style={{
//                     ...styles.card,
//                     ...styles[size]
//                 }} onClick={detailComponent} />
//     )
// }

// father component:
//     const [galleryImages, setNewGalleryImages ] = useState([]);

//     const styles = {
//         container: {
//             margin: 0,
//             padding: 0,
//             width: '80%',
//             position: 'absolute',
//             left: '50%',
//             transform: 'translateX(-50%)',
//         }
//     }

//     useEffect(() => {
//         randomImagesServices.createGallery()
//         .then((galleryImages) => {
//             const sizes = [ "small", "medium", "large" ];

//             galleryImages = galleryImages.map(function(e, i) {
//                 return {
//                     "urls":  e.urls,
//                     "size" : sizes[i % 3] ,
//                     "id" : e.id
//                 };
//               })
//               console.log(galleryImages);
//             setNewGalleryImages(galleryImages)
//         })
//     }, []);

// return (
//      <div>
//              <Masonry columns={[1, 2, 3, 4]} spacing={2} style={styles.container}>
//                     {galleryImages.map(e => <Card size={e.size} img={e.urls.regular} key={e.id} />)}
//                 </Masonry>
//      </div>
//     )

// }
