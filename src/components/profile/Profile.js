import { Avatar, Button, Group } from "@mantine/core";

export const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
      <div>
        <Avatar src={`http://smear-backend.test//images/avatars/${user.avatar.name}`}/>
        <h2>{user.first_name} {user.last_name}</h2>
        <p>{user.email}</p>
      <Group position="center" mt="md">
          <Button type="submit">
            Edit Profile
          </Button>
      </Group>
    </div>
  )
}
