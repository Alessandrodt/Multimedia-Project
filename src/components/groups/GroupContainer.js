import React from 'react';
import { Button, Paper, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

export const GroupContainer = ({ groupName, groupDetails, groupSharing }) => {
  return (
     
      <Paper
          p='md'
          className='paper-groups'
          radius='md'
          shadow='xs'
          withBorder
      >
        <Text className='txt-group' align='center' size='lg' weight={500} mt='md'>
          {groupName}
        </Text>
        <div className="button-groups-action">
        <Link to={groupDetails}>
          <Button name="group-button" fullWidth mt='md'>
            {t("manage")}
          </Button>
        </Link>
        <Link to={groupSharing}>
          <Button name="group-button" fullWidth mt='md'>
            {t("share")}
          </Button>
        </Link>
        </div>
    </Paper>
  );
}