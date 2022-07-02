import React, { useState, useEffect } from "react";
//Services
import imagesServices from "../../services/imagesServices";

export const DetailImg = ({ idImage }) => {
  const [imgDetail, setImgDetail] = useState([]);

  useEffect(() => {
    imagesServices.loadImageDetail(idImage).then((imgDetail) => {
      console.log(imgDetail);
      setImgDetail(imgDetail);
    });
  }, [idImage]);

  return (
    <>
      <div className="inner-box">
        <div className="img-box">
          <img src={imgDetail} alt="images" />
        </div>
        <div className="info-external-box">
          <div className="tag-box">
            <div className="text-box">
              <div className="title-box" tags={imgDetail.tags}></div>
            </div>
          </div>
          <div className="external-button-box">
            <button className="button-action">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};
