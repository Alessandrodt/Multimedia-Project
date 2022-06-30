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
        <Text align='center' size='lg' weight={500} mt='md'>
          {groupName}
        </Text>
        <Link to={groupDetails}>
          <Button fullWidth mt='md'>
            Manage Group
          </Button>
        </Link>
        <Link to={groupSharing}>
          <Button fullWidth mt='md'>
            Image Sharing 
          </Button>
        </Link>
    </Paper>
  );
}