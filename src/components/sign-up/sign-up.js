// import React, { useState } from "react";
// import {
//   TextInput,
//   Button,
//   Checkbox,
//   Group,
//   Box,
//   PasswordInput,
// } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import authServices from "../../services/authservices";

// export const SignUp = () => {
//   const [users, setUser] = useState([]);
//   const [newUsername, setNewUsername] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const addUser = (event) => {
//     const isUserAdded = users.map((p) => p.user).includes(newUsername);
//     const existingUser = users.find((p) => newUsername === p.user);

//     authServices.createUser(newUser).then((response) => {
//       setUser(users.concat(response.data));
//       setNewUsername("");
//       setNewPassword("");
//     });

//     if (isUserAdded === true) {
//       window.alert(`${newUser.username} was added `);
//     } else if (existingUser) {
//       window.alert(`user already exists`);
//     }
//     console.log(newUser)
//   };

//   const newUser = {
//     username: newUsername,
//     password: newPassword,
//   };

//     return (
//         <Box sx={{ maxWidth: 300 }} mx="auto">
//             <form onSubmit={form.onSubmit(addUser)}>
//                 <TextInput
//                     required
//                     label="Name"
//                     placeholder="Mario"
//                     {...form.getInputProps('name')}
//                 />
//                 <TextInput
//                     required
//                     label="Surname"
//                     placeholder="Rossi"
//                     {...form.getInputProps('surname')}
//                 />
//                 <TextInput
//                     required
//                     label="Email"
//                     placeholder="Mario.Rossi@email.com"
//                     {...form.getInputProps('email')}
//                 />
//                 <PasswordInput
//                     required
//                     label="Password"
//                     placeholder="YourPasswordHere"
//                     {...form.getInputProps('password')}
//                 />
//                 <Checkbox
//                     mt="md"
//                     label="I agree to the Terms of Condition and Service."
//                     {...form.getInputProps('termsOfService', { type: 'checkbox' })}
//                 />

//                 <Group position="right" mt="md">
//                     {/* <Button onSubmit={routeChange} type="submit">Sign-Up</Button> */}
//                 </Group>
//             </form>
//         </Box>
//     );
// }
