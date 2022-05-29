import { Button } from '@mantine/core';
import './homepage.css'
import { InputWithButton } from './serch/serch';
import { Upload } from 'tabler-icons-react';
import { Galleries } from '../galleries/galleries';

export const HomePage = () => {
  return (
    <div>
      <div className='navbar'>
        <Button className='logo-home'>
        </Button>
        <InputWithButton/>
        <Button className='avatar'>
        </Button>
        <Button className='uppics'>
        <Upload 
          className='upload'
          size={50}
          strokeWidth={1.5}
          color={'black'}
        />
        </Button>
        
      </div>
      <Galleries></Galleries>
    </div>

  );
}