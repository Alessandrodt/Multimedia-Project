import { Avatar, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

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
      <div>
        <Avatar src={`http://smear-backend.test//images/avatars/${user.avatar.name}`}/>
        <h2>{user.first_name} {user.last_name}</h2>
        <p>{user.email}</p>
      <Group position="center" mt="md">
          <Button type="submit">
            Edit Profile
          </Button>
          <Button onClick={() => logOut()} color="red">
            Log out
          </Button>
      </Group>
    </div>
  )
}
