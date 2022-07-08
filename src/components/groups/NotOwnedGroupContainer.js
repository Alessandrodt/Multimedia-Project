import React from "react";
import { Link } from "react-router-dom";

// Components
import { NotOwnedGroups } from "./NotOwnedGroups";
import { Button, Paper, Text } from "@mantine/core";

import addFolder from "../../images/addFolder.svg";
import groupeople from "../../images/groupeople.svg";

export const NotOwnedGroupContainer = ({ groupName, sharedGroup }) => {
  return (
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
        <Link to={sharedGroup}>
          <Button name="group-button" fullWidth mt="md">
            <img src={addFolder} alt=""></img>
          </Button>
        </Link>
      </div>
    </Paper>
  );
};
