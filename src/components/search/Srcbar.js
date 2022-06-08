import React from 'react';
import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { Search, ArrowRight, ArrowLeft } from 'tabler-icons-react';

export function InputWithButton(props) {
  const theme = useMantineTheme();

  return (
    <TextInput
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon size={40}  radius="xl" color={theme.primaryColor} variant="filled">
          <Search size={25} />
        </ActionIcon>
      }
      placeholder="Search"
      rightSectionWidth={42}
      {...props}
    />
  );
}