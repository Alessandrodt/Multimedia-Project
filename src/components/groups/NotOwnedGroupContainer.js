import React from "react";
import { Link } from "react-router-dom";

// Components
import { Button, Paper, Text } from "@mantine/core";

import folderWithElement from "../../images/folder_icon.svg";
import groupeople from "../../images/groupeople.svg";

// GroupContainer is a simple component used to store the non owned group infos displayed in the Groups page.
export const NotOwnedGroupContainer = ({ groupName, sharedGroup }) => {
  return (
    <Link className="link-groups" to={sharedGroup}>
      <Paper p="md" className="paper-groups" radius="md" shadow="xs" withBorder>
        <div className="group-name-svg">
          <img src={groupeople} alt=""></img>
          <Text
            className="txt-group"
            align="center"
            size="lg"
            weight={500}
            mt="md"
          >
            {groupName}
          </Text>
        </div>
        <div className="button-groups-action">
          <Button name="group-button" fullWidth mt="md">
            <img src={folderWithElement} alt=""></img>
          </Button>
        </div>
      </Paper>
    </Link>
  );
};
