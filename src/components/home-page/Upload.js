import React from "react";
import { useState, useEffect } from "react";

// components
import  {Button } from "../utils/Button";
import { UploadPreview } from "./UploadPreview";

// services
import imagesServices from "../../services/imagesServices";

export function Upload() {
    const [imagesToUpload, setNewImageUpload] = useState([]);

    return(
        <div>
            <UploadPreview imagesToUpload={setNewImageUpload}/>
            <input placeholder="type your awesome tags here"></input>
            <Button onClick={() => {console.log('you clicked create tag')}} text={"create tag"}/>
            <br/>
            <Button onClick={() => console.log(imagesToUpload)} text={"upload"}/>
        </div>
    )
}

// <Button onClick={imagesServices.uploadImage(uploadNewImage(imagesToUpload))} text={"upload"}/>