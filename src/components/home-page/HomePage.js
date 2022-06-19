import React from "react";

// components
import { Navbar } from "../navbar/Navbar";
import { HomeGallery } from "../galleries/HomeGallery";
import { Upload } from "./Upload";

// libraries
import { Button } from "@mantine/core";
import { useModals } from "@mantine/modals";

export const HomePage = () => {
  const modals = useModals();

  const openContentModal = () => {
    modals.openModal({
      size: "70%",
      overflow: "inside",
      centered: true,
      children: <Upload />,
    });
  };

  return (
    <div>
      <Navbar />
      <HomeGallery />
      <Button onClick={openContentModal} className="upload-btn">
        upload
      </Button>
    </div>
  );
};
