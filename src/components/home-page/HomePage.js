
// components
import { Navbar } from './navbar-home-page/Navbar-home-page';
import { HomeGallery } from '../galleries/HomeGallery';
// import { Upload } from './Upload';

export const HomePage = () => {

  return (
    <div>
      <Navbar></Navbar> 
      <HomeGallery/>
    </div>
  );
}