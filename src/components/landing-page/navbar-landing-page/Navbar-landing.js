import { Button } from '@mantine/core';
import { useState } from 'react';
import './Navbar.css'

export const Navbar = () => {
  const [state, setState] = useState('start')

  return (
    <div>
      <div className='navbar'>
        <Button className='logo-home'>
        </Button>
        <div className='container'>
        <Button className='avatar'>
        </Button>
        <Button className='uppics'>
        </Button>
        </div>
      </div>
    </div>

  );
}