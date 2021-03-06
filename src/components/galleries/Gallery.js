import React from "react";
import { useState, useEffect } from "react";

// components
import { Card } from "./Card";

// Services
import imagesServices from "../../services/imagesServices";

//Libraries
import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import InfiniteScroll from "react-infinite-scroll-component";

// Styles
import addNoMatchImage from "../../images/resultnomatch.png";

export function Gallery({ folderId, userId, searchParams, newUploadImages }) {
  const [galleryImages, setNewGalleryImages] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    finalPage: 1,
    totalImages: 1,
  });

  /**
   * the initial loading of the images,
   * setting pagination parameters and gallery images based on the response
   * if response.data is not defined it returns an empty array
   */
  useEffect(() => {
    imagesServices
      .loadImages(folderId, userId, 1, searchParams)
      .then((galleryImages) => {
        setNewGalleryImages(
          galleryImages && galleryImages.data.length > 0
            ? galleryImages.data.map((e) => ({
                urls: e.content,
                id: e.id,
                tags: e.tags.map((x) => x.name),
              }))
            : [{ urls: addNoMatchImage, id: -1 }]
        );

        if (galleryImages) {
          setPagination((oldPagination) => {
            let old = { ...oldPagination };
            old.finalPage = galleryImages.last_page;
            old.currentPage = 1;
            old.totalImages = galleryImages.total;
            return old;
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId, searchParams, newUploadImages]);

  /**
   * it loads more data, getting the next page and increasing the value
   * of the current page. It also appends the next images to the existing ones
   */
  const fetchMoreData = () => {
    if (pagination.finalPage > pagination.currentPage) {
      imagesServices
        .loadImages(folderId, userId, pagination.currentPage + 1, searchParams)
        .then((galleryImages) => {
          setNewGalleryImages((oldArray) =>
            oldArray.concat(
              galleryImages.data.map((e) => ({
                urls: e.content,
                id: e.id,
                tags: e.tags.map((x) => x.name),
              }))
            )
          );
          setPagination((oldPagination) => {
            let obj = { ...oldPagination };
            obj.currentPage++;
            return obj;
          });
        });
    }
  };

  return (
    <main>
      <InfiniteScroll
        dataLength={galleryImages ? galleryImages.length : 0}
        next={fetchMoreData}
        hasMore={true}
        loader={""}
      >
        <Box>
          <Masonry columns={[1, 2, 3, 4]} spacing={2} loading="lazy">
            {galleryImages.map((e) => (
              <div className="box-gallery-home" key={e.id}>
                <span className="title-tags">
                  {e.tags ? e.tags.join(", ") : ""}
                </span>
                <Card img={e.urls} idImage={e.id} key={e.id}></Card>
              </div>
            ))}
          </Masonry>
        </Box>
      </InfiniteScroll>
    </main>
  );
}
