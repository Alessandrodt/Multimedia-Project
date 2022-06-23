import React from "react";

// components
import { NavbarHome } from "./navbar-home-page/NavbarHome";
import { HomeGallery } from "../galleries/HomeGallery";
import { Upload } from "./Upload/Upload";
import addpics from "../../images/addpics.png";

// libraries
import { Button } from "@mantine/core";
import { useModals } from "@mantine/modals";

export const HomePage = () => {
  const modals = useModals();

  const openContentModal = () => {
    modals.openModal({
      centered: true,
      closeOnClickOutside: false,
      children: <Upload />,
      overflow: "outside",
      size: "70%",
    });
  };

  return (
    <div>
      <NavbarHome />
      <HomeGallery />
      <Button onClick={openContentModal} className="upload-btn">
        <img src={addpics} />
      </Button>
    </div>
  );
};
