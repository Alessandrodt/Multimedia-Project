import React from 'react';
import { Button, Paper, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export const GroupContainer = ({ groupName, groupDetails, groupSharing }) => {
  return (
     
      <Paper
          p='md'
          radius='md'
          shadow='xs'
          withBorder
      >
        <Text className='txt-group' align='center' size='lg' weight={500} mt='md'>
          {groupName}
        </Text>
        <div className="button-groups-action">
        <Link to={groupDetails}>
          <Button fullWidth mt='md'>
            Manage
          </Button>
        </Link>
        <Link to={groupSharing}>
          <Button fullWidth mt='md'>
              Sharing 
          </Button>
        </Link>
        </div>
    </Paper>
  );
}