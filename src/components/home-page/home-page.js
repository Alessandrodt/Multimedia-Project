import { Button } from '@mantine/core';
import './Homepage.css'
import { InputWithButton } from './search/Search';
import { Upload } from 'tabler-icons-react';
import { Subgrid } from '../galleries/Galleries';
import AddTripButton from '../button/Button'
import { Login } from '../login/login';
import { useState } from 'react';

export const HomePage = () => {
  const [state, setState] = useState('start')

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
      <div>
      {state === 'start' && (
        <AddTripButton addTrip={() => setState('add-trip') } />
      )}

      {state === 'add-trip' && <Login />}
    </div>
      <Galleries></Galleries>
    </div>

  );
}