import React from 'react';
import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { Search, ArrowRight, ArrowLeft } from 'tabler-icons-react';
import './srch.css'

export function InputWithButton(props) {
  const theme = useMantineTheme();

  return (
    <TextInput className='imput'
      icon={<Search size={18} />}
      radius="xl"
      size="lg"
      rightSection={
        <ActionIcon className='action' size={32} radius="xl" variant="filled">
          {theme.dir === 'ltr' ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
        </ActionIcon>
      }
      placeholder="Search questions"
      rightSectionWidth={42}
      {...props}
    />
  );
}