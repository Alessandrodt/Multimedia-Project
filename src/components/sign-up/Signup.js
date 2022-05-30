import React, { useState, useEffect } from "react";

import { Avatar } from "@mantine/core";
import authServices from "../../services/authservices";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";
import {
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";

export const SignUp = () => {
  const [users, setUser] = useState([]);
  const [newName, setNewName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfPassword, setNewConfPassword] = useState("");
  const [avatars, setAvatar] = useState([]);
  const [profilePic, setProfilePic] = useState("")

  useEffect(() => {
   authServices.getAvatar().then(response => {
     setAvatar(response.data)
   });
  }, []);
  
  const modals = useModals();

  const openContentModal = () => {
    modals.openModal({
      title: "Choose your avatar:",
      children: (
        <div>
          {avatars.map((avatar) => {
            return (
              <Button onClick={() => console.log(setProfilePic(avatar.name))} key={avatar.id} src={`${avatar.name.png}`}>{avatar.id}</Button>
            );
          })}
        </div>
      )
    });
  };

  const addUser = () => {
    const isUserAdded = users.map((p) => p.user).includes(newEmail);
    const existingUser = users.find((p) => newEmail === p.user);

    authServices.createUser(newUser).then((response) => {
      setUser(users.concat(response.data));
      setNewEmail("");
      setNewPassword("");
    });

    if (isUserAdded === true) {
      alert(`${newUser.email} was added `);
    } else if (existingUser) {
      alert(`user already exists`);
    }
    console.log(newUser);
  };

  const newUser = {
    first_name: newName,
    last_name: newLastName,
    email: newEmail,
    privacy: privacy,
    password: newPassword,
    password_confirmation: newConfPassword,
  };

  const form = useForm({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      termsOfService: false,
      password: "",
      confirmPassword: "",
    },
    initialErrors: {
      password:
        "Password must have at least 1 capital letter, a number and be 8 characters long",
    },
    validate: {
      name: (value) =>
        value.length < 2
          ? "the name has to be at least 2 characters long"
          : null,
      surname: (value) =>
        value.length < 2
          ? "the surname has to be at least 2 characters long"
          : null,
      email: (value) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
          ? null
          : "Invalid email",
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
          ? null
          : "Invalid password",
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(addUser)}>
        <Avatar src={profilePic} size={50} />
        <Button onClick={openContentModal}>Choose your Avatar here</Button>
        <TextInput
          required
          label="Name"
          placeholder="Mario"
          {...form.getInputProps("name")}
          onChange={(event) => {
            form.setFieldValue("name", event.currentTarget.value);
            setNewName(event.target.value);
          }}
        />
        <TextInput
          required
          label="Surname"
          placeholder="Rossi"
          {...form.getInputProps("surname")}
          onChange={(event) => {
            form.setFieldValue("surname", event.currentTarget.value);
            setNewLastName(event.target.value);
          }}
        />
        <TextInput
          required
          label="Email"
          placeholder="Mario.Rossi@email.com"
          {...form.getInputProps("email")}
          onChange={(event) => {
            form.setFieldValue("email", event.currentTarget.value);
            setNewEmail(event.target.value);
          }}
        />
        <PasswordInput
          required
          label="Password"
          autoComplete="on"
          placeholder="YourPasswordHere"
          {...form.getInputProps("password")}
          onChange={(event) => {
            form.setFieldValue("password", event.currentTarget.value);
            setNewPassword(event.target.value);
          }}
        />
        <PasswordInput
          mt="sm"
          label="Confirm password"
          autoComplete="on"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
          onChange={(event) => {
            form.setFieldValue("confirmPassword", event.currentTarget.value);
            setNewConfPassword(event.target.value);
          }}
        />
        <Checkbox
          mt="md"
          label="I agree to the Terms of Condition and Service."
          {...form.getInputProps("termsOfService", { type: "input" })}
          onChange={(event) => {
            form.setFieldValue("termsOfService", event.currentTarget.value);
            setPrivacy(Boolean(event.target.value));
          }}
        />
        <Group position="right" mt="md">
          <Button type="submit">Sign-Up</Button>
        </Group>
      </form>
    </Box>
  );
};
