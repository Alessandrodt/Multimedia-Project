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
<<<<<<< HEAD
        <Link to={groupLink}>
        <Button className="primary" fullWidth mt='md'>
          Open Group
        </Button>
        </Link>
        <Button className='delete' fullWidth mt='md' onClick={() => {deleteGroup()}}>
          Delete Group
        </Button>
=======
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
>>>>>>> origin
    </Paper>
  );
}