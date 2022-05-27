import React, { useState } from "react";
import {
  TextInput,
  Button,
  Checkbox,
  Group,
  Box,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import authServices from "../../services/authservices";


export const SignUp = () => {
  const [users, setUser] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const addUser = () => {
    const isUserAdded = users.map((p) => p.user).includes(newEmail);
    const existingUser = users.find((p) => newEmail === p.user);

    authServices.createUser(newUser).then((response) => {
      setUser(users.concat(response.data));
      setNewEmail("");
      setNewPassword("");
    });

    if (isUserAdded === true) {
      window.alert(`${newUser.username} was added `);
    } else if (existingUser) {
      window.alert(`user already exists`);
    }
    console.log(newUser)
  };

  const newUser = {
    username: newEmail,
    password: newPassword,
  };

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      surname: "",
      termsOfService: false,
    },
    initialErrors: {
      password: 
        "Password must have at least 1 capital letter, a number and be 8 characters long"
    },
    validate: {
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
        <TextInput
          required
          label="Name"
          placeholder="Mario"
          {...form.getInputProps("name")}
        />
        <TextInput
          required
          label="Surname"
          placeholder="Rossi"
          {...form.getInputProps("surname")}
        />
        <TextInput
          value={form.values.email}
          required
          label="Email"
          placeholder="Mario.Rossi@email.com"
          {...form.getInputProps("email")}
          onChange={(event) =>
            {form.setFieldValue("email", event.currentTarget.value)
            setNewEmail(event.target.value)}
          }
        />
        <PasswordInput
          value={form.values.password}
          required
          label="Password"
          autoComplete="on"
          placeholder="YourPasswordHere"
          {...form.getInputProps("password")}
          onChange={(event) =>
            {form.setFieldValue("password", event.currentTarget.value)
            setNewPassword(event.target.value)}
          }
        />
        <PasswordInput
          mt="sm"
          label="Confirm password"
          autoComplete="on"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />
        <Checkbox
          mt="md"
          label="I agree to the Terms of Condition and Service."
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />
        <Group position="right" mt="md">
          <Button type="submit">Sign-Up</Button>
        </Group>
      </form>
    </Box>
  );
};
