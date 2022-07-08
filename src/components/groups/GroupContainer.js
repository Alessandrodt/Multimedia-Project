import React from 'react';
import { Button, Paper, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import groupeople from '../../images/groupeople.svg'
import addFolder from "../../images/addFolder.svg"
import settings from "../../images/settings.svg"

export const GroupContainer = ({ groupName, groupDetails, groupSharing }) => {
  return (
     
      <Paper
          p='md'
          className='paper-groups'
          radius='md'
          shadow='xs'
          withBorder
      >
        <div className='group-name-svg'>
        <img src={groupeople}></img>
        <Text className='txt-group' align='center' size='lg' weight={500} mt='md'>
          {groupName}
        </Text>
        </div>
        <div className="button-groups-action">
        <Link to={groupDetails}>
          <Button name="group-button" fullWidth mt='md'>
            <img className='settings' src={settings}></img>
          </Button>
        </Link>
        <Link to={groupSharing}>
          <Button name="group-button" fullWidth mt='md'>
            <img src={addFolder}></img>
          </Button>
        </Link>
        </div>
    </Paper>
  );
}