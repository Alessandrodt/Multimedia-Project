import React from "react";
import { useState, useEffect } from "react";

// components and library
import Masonry from "@mui/lab/Masonry";
import { Card } from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";

// services
import imagesServices from "../../services/imagesServices";

export function Gallery({ folderId }) {
  const [galleryImages, setNewGalleryImages] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    finalPage: 1,
    totalImages: 1,
  });

  const styles = {
    container: {
      margin: 0,
      padding: 0,
      width: "80%",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: "120px",
    },
  };

  useEffect(() => {
    imagesServices
      .createFolderGallery(folderId, pagination.currentPage, setPagination)
      .then((galleryImages) => {
        setNewGalleryImages(
          galleryImages
            ? galleryImages.data.map((e) => ({
                urls: e.content,
                id: e.id,
              }))
            : []
        );
        if (galleryImages) {
          setPagination((oldPagination) => {
            let old = { ...oldPagination };
            old.finalPage = galleryImages.last_page;
            old.totalImages = galleryImages.total;
            return old;
          });
        }
        console.log(pagination);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId]);

  const fetchMoreData = () => {
    imagesServices
      .createFolderGallery(folderId, pagination.currentPage + 1, setPagination)
      .then((galleryImages) => {
        setNewGalleryImages((oldArray) =>
          oldArray.concat(
            galleryImages.data.map((e) => ({
              urls: e.content,
              id: e.id,
            }))
          )
        );
        setPagination((oldPagination) => {
          let obj = { ...oldPagination };
          obj.currentPage++;
          return obj;
        });
      });
  };

  return (
    <div>
      {" "}
      <InfiniteScroll
        dataLength={galleryImages ? galleryImages.length : 0}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <Masonry columns={[1, 2, 3, 4]} spacing={2} style={styles.container}>
          {galleryImages.map((e) => (
            <Card img={"data:image/png;base64, " + e.urls} key={e.id} />
          ))}
        </Masonry>
      </InfiniteScroll>{" "}
    </div>
  );
}
