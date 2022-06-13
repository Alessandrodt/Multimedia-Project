import { useParams } from "react-router-dom";

import { Button, Group } from "@mantine/core";


export const Profile = () => {
    const {userId} = useParams();

    return (
        <>
          <h1>{userId}</h1>
        <Group position="center" mt="md">
        <Button type="submit">
          Edit Profile
        </Button>
      </Group>
      </>
    )
}
