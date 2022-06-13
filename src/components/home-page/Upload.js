import React from "react";
import { useState, useEffect } from "react";

// components
import  {Button } from "../utils/Button";
import { UploadForm } from "./UploadForm";

// services
import imagesServices from "../../services/imagesServices";

export function Upload() {
const [imagesToUpload, setNewImageUpload] = useState([]);

useEffect(() => {
        setNewImageUpload()
}, []);

    return(
        <div>
            <UploadForm />
            <input placeholder="type your awesome tags here"></input>
            <Button onClick={() => {console.log('you clicked create tag')}} text={"create tag"}/>
            <br/>
            <Button onClick={imagesServices.uploadImage(imagesToUpload)} text={"upload"}/>
        </div>
    )
}