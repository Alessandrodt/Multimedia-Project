import { Avatar } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import defaultAvatar from '../../images/user.svg';

export const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate();

  // Simple function that clears the SessionStorage and forces a reload.
  // The guard system redirects the user to the landing page.
  const logOut = () => {
    sessionStorage.clear();
    navigate('/')  
  }
  
  return (
    <div className="wrapper-user">
      <Avatar src={user?.avatar?.name ? `http://smear-backend.test//images/avatars/${user?.avatar?.name}` : defaultAvatar } size={150}/>
      <h2>{user.first_name} {user.last_name}</h2>
      <p>{user.email}</p>
      <div className="wrapper-button">
        <button type="submit" className="primary">
          <span>Edit Profile</span>
        </button>
        <button onClick={() => logOut()} className="delete">
          <span>Log Out</span>
        </button>
      </div>
    </div>
  )
}
