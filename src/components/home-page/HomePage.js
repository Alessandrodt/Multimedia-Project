import { Navbar } from '../navbar/Navbar';
import './Homepage.css';
import { HomeGallery } from '../galleries/HomeGallery';

export const HomePage = () => {

  return (
    <div>
      <Navbar></Navbar> 
      <HomeGallery/>
    </div>
  );
}