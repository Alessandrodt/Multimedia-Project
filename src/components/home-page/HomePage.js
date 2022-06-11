import { Navbar } from '../navbar/Navbar';
import { ButtonChange } from "../open-detail-button/OpenDetailButton"
import { HomeGallery } from '../galleries/HomeGallery';


export const HomePage = () => {

  return (
    <div>
      <ButtonChange/> 
      <Navbar/> 
      <HomeGallery/>
    </div>
  );
}