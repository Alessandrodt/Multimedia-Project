import React from 'react';
import { Button, Paper, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export const GroupContainer = ({ deleteGroup, groupName, groupLink }) => {
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
        <Link to={groupLink}>
        <Button fullWidth mt='md'>
          Open Group
        </Button>
        </Link>
        <Button color='red' fullWidth mt='md' onClick={() => {deleteGroup()}}>
          Delete Group
        </Button>
    </Paper>
  );
}