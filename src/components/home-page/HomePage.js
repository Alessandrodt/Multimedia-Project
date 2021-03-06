import React, { useState } from "react";

// Components
import { NavbarHome } from "./navbar-home-page/NavbarHome";
import { Gallery } from "../galleries/Gallery";
import { Upload } from "./Upload/Upload";

// Libraries
import { Button } from "@mantine/core";
import { useModals } from "@mantine/modals";

export const HomePage = () => {
  const modals = useModals();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [newUploadImages, setNewUploadImages] = useState([]);

  const [searchParams, setSearchParams] = useState({});

  const openContentModal = () => {
    modals.openModal({
      centered: true,
      closeOnClickOutside: false,
      children: <Upload setNewUploadImages={setNewUploadImages} />,
      overflow: "outside",
      size: "40%",
    });
  };

  return (
    <div>
      {/* add style scss */}
      <NavbarHome setSearchParams={setSearchParams} />
      <div className="wrapper-gallery">
        <Gallery
          userId={user.id}
          searchParams={searchParams}
          newUploadImages={newUploadImages}
        />
      </div>
      <Button onClick={openContentModal} className="upload-btn">
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_490_401)">
            <path
              d="M16.4 72.1C16.4 55.7 16.4 40 16.4 24.4C37.8 24.4 58.8 24.4 80.2 24.4C80.2 32.4 80.2 40 80.2 47.7C83 47.7 85.3 47.7 88 47.7C88 39.6 88.2 31.7 87.9 23.9C87.8 19 84.5 16.1 79.4 16C58.4 15.9 37.4 15.9 16.4 16C11.3 16 8.10005 19.1 8.00005 24C7.90005 40 7.90005 56 8.00005 72C8.00005 76.2 10.5 79.5 14.5 79.7C25.6 80.1 36.7001 79.9 47.7001 79.9C47.7001 77.1 47.7001 74.8 47.7001 72.2C37.2001 72.1 27 72.1 16.4 72.1Z"
              fill="white"
            />
            <path d="M72 96C72 90.9 72 85.7 72 80.1C66.6 80.1 61.5 80.1 56.3 80.1C56.3 77.3 56.3 75 56.3 72.2C61.3 72.2 66.3001 72.2 71.9001 72.2C71.9001 66.6 71.9001 61.6 71.9001 56.3C74.7001 56.3 77.0001 56.3 79.8001 56.3C79.8001 61.2 79.8001 66.3 79.8001 72C85.6001 72 90.8 72 96.1 72C96.1 74.7 96.1 77.3 96.1 80C90.9 80 85.6 80 80.1 80C80.1 85.8 80.1 90.9 80.1 96C77.3 96 74.7 96 72 96Z" />
            <path
              d="M16.4 72.1C27 72.1 37.3 72.1 47.8 72.1C47.8 74.7 47.8 77 47.8 79.8C36.8 79.8 25.7 80.1 14.6 79.6C10.6 79.4 8.10002 76.1 8.10002 71.9C8.00002 55.9 8.00002 39.9 8.10002 23.9C8.10002 19 11.4 15.9 16.5 15.9C37.5 15.8 58.5 15.8 79.5 15.9C84.6 15.9 87.9 18.9 88 23.8C88.2 31.6 88.1 39.4 88.1 47.6C85.5 47.6 83.1 47.6 80.3 47.6C80.3 40 80.3 32.4 80.3 24.3C58.9 24.3 37.9 24.3 16.5 24.3C16.4 40 16.4 55.7 16.4 72.1Z"
              fill="black"
            />
            <path
              d="M33.8 38.2C33.8 38.8 33.7 39.3 33.5 39.8C33.3 40.3 33 40.8 32.5 41.1C32.1 41.5 31.6 41.8 31.1 42C30.6 42.2 30.1 42.3 29.5 42.3C27.1 42.3 25.3 40.6 25.3 38.2C25.3 37.7 25.4 37.2 25.6 36.7C25.8 36.2 26.1 35.7 26.6 35.3C27 34.9 27.5 34.5 28 34.3C28.5 34.1 29 33.9 29.6 33.9C32.1 33.9 33.9 35.7 33.8 38.2Z"
              fill="black"
            />
            <path
              d="M66.3 60.4001C66.3 61.5001 65.5 62.4 64.2 62.5H25.8C24.1 62.5 23.2 61.6 23.3 60.1C23.3 59.7 23.5 59.3 23.8 59.1C26.9 54.9 30 50.7001 33.1 46.5001C34.1 45.2001 35.5 45.2001 36.5 46.5001C37.4 47.5001 38.1 48.6001 38.9 49.7001C39.6 50.6001 39.6 50.6001 40.1 49.7001C42.7 45.9001 45.3 42.2 47.8 38.3C48.9 36.5 50.9 36.9 51.9 38.3L65.6 58.8C66 59.4 66.2 59.9001 66.3 60.4001Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_490_401">
              <rect width="96" height="96" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Button>
    </div>
  );
};
