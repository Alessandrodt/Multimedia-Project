import { Navbar } from '../navbar/Navbar';

import { HomeGallery } from '../galleries/HomeGallery';
import { DettagioImg } from '../dettaglio-img/DettagioImg';

export const HomePage = () => {

  return (
    <div>
      <Navbar/> 
      <DettagioImg/>
      <HomeGallery/>
    </div>
  );
}