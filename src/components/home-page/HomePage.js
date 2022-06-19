
// components
import { Navbar } from '../navbar/Navbar';
import { HomeGallery } from '../galleries/HomeGallery';
import { Upload } from './Upload';

export const HomePage = () => {

  return (
    <div>
      <Navbar></Navbar>
      <HomeGallery/>
    </div>
  );
}