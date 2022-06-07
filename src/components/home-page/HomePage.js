import { Button } from '@mantine/core';
import './Homepage.css'
import { InputWithButton } from './search/Search';
import { Upload } from 'tabler-icons-react';
import { HomeGallery } from '../galleries/HomeGallery';

export const HomePage = () => {

  return (
    <div>
      <div className='navbar'>
        <Button className='logo-home'>
        </Button>
        <InputWithButton/>
        <div className='flexbutton'>
        <Button className='logo-home'>
        </Button>
        <Button id="upload" className='logo-home'>
        <Upload 
          size={20}
          strokeWidth={2}
          color={'black'}
        />
        </Button>
        </div>
      </div>
      <HomeGallery/>
    </div>

  );
}