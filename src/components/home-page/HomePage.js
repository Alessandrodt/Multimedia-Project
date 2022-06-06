import { Button } from '@mantine/core';
import './Homepage.css'
import { InputWithButton } from './search/Search';
import { Upload } from 'tabler-icons-react';

export const HomePage = () => {


  return (
    <div>
      <div className="navbar">
        <Button className="logo-home"></Button>
        <InputWithButton />
        <Button className="avatar"></Button>
        <Button className="uppics">
          <Upload
            className="upload"
            size={50}
            strokeWidth={1.5}
            color={"black"}
          />
        </Button>
      </div>
    </div>
  );
}