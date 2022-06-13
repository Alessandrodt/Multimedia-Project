// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import { Button, Group } from "@mantine/core";

// import profileServices from "../../services/profileServices";

// export const Profile = () => {
//     const {userId} = useParams();
//     const [users, setUsers] = useState([]);

//     useEffect (() => {
//       profileServices.getUser(userId).then((response) => {
//         setUsers(response.data);
//       });
//     });

//     return (
//         <>
//           <h1>{userId}</h1>
//         <Group position="center" mt="md">
//         <Button type="submit">
//           Edit Profile
//         </Button>
//       </Group>
//       </>
//     )
// }
