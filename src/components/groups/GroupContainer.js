import React from 'react';
import { Button, Paper, Text } from '@mantine/core';

export const GroupContainer = ({ deleteGroup, groupName, openGroup }) => {
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
      <Button fullWidth mt='md' onClick={() => {openGroup()}}>
        Open Group
      </Button>
      <Button color='red' fullWidth mt='md' onClick={() => {deleteGroup()}}>
       Delete Group
      </Button>
    </Paper>
  );
}