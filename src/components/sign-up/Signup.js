import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";

import authServices from "../../services/authservices";
import { ErrorMessage } from "../error-message/ErrorMessage";

export const SignUp = () => {
  const [avatars, setAvatar] = useState([]);
  const [isAvatarPicked, setAvatarStatus] = useState(Boolean);
  const [newConfPassword, setNewConfPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [profilePic, setProfilePic] = useState({});
  const [users, setUser] = useState([]);

  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    authServices.getAvatar().then((response) => {
      setAvatar(response.data);
    });
  }, []);

  const errorStyle = {
    color: color,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const handleMessage = (color, message) => {
    setColor(color);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const modals = useModals();

  const openContentModal = () => {
    modals.openModal({
      title: "Choose your avatar:",
      centered: true,
      children: (
        <div>
          {avatars.map((avatar) => {
            return (
              <Button
                onClick={() => {
                  modals.closeModal(setProfilePic(avatar));
                  setAvatarStatus(true);
                }}
                key={avatar.id}
              >
                <img
                  src={`http://smear-backend.test${avatar.link}`}
                  alt={""}
                  width={50}
                  height={150}
                ></img>
              </Button>
            );
          })}
        </div>
      ),
    });
  };

  let picture = (
    <Avatar
      src={
        isAvatarPicked ? `http://smear-backend.test${profilePic.link}` : null
      }
      size={150}
    />
  );

  const newUser = {
    first_name: newName,
    last_name: newLastName,
    email: newEmail,
    privacy: privacy,
    password: newPassword,
    password_confirmation: newConfPassword,
    avatar: {
      id: profilePic.id,
    },
  };

  const addUser = () => {
    authServices
      .createUser(newUser)
      .then((response) => {
        if (response.status === 201) {
          setUser(users.concat(response.data));
          handleMessage(
            "green",
            `A confirmation email was sent to ${newEmail}`
          );
        }
      })
      .catch(() => {
        handleMessage("red", `${newEmail} is already in use.`);
      });
    console.log(newUser);
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
          : "Password must have at least 1 capital letter, a number and be 8 characters long",
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <ErrorMessage message={errorMessage} style={errorStyle} />
      <form onSubmit={form.onSubmit(addUser)}>
        {picture}
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
