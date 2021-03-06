import React, { useState, useEffect } from "react";

//Services
import imagesServices from "../../services/imagesServices";

export const DetailImg = ({ idImage }) => {
  const [imageDetail, setImgDetail] = useState({});

  useEffect(() => {
    imagesServices.loadImageDetail(idImage).then((imageDetail) => {
      setImgDetail(imageDetail.data);
    });
  }, [idImage]);

  return (
    <>
      <div className="inner-box">
        <div className="img-box">
          <img
            src={"data:image/png;base64, " + imageDetail.content}
            alt="images"
          />
        </div>
        <div className="info-external-box">
          <div className="tag-box">
            <h6> Tags: </h6>
            <div className="tag-cont-style">
              {imageDetail.tags
                ? imageDetail.tags.map((x) => <span key={x.id}>{x.name}</span>)
                : "no tags, no nothing"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
