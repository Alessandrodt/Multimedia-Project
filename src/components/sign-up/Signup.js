// React imports
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Mantine imports
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";

// Services
import avatarServices from "../../services/avatarServices";
import authServices from "../../services/authServices";

// Translation
import { t } from "i18next";

// Image
import defaultAvatar from "../../images/user.svg";

export const SignUp = () => {
  const modals = useModals();

  const [avatars, setAvatar] = useState([]);
  const [isAvatarPicked, setAvatarStatus] = useState(Boolean);
  const [newConfPassword, setNewConfPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [privacy, setPrivacy] = useState(true);
  const [profilePic, setProfilePic] = useState({});
  const [users, setUser] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    avatarServices.getAvatar().then((response) => {
      // Our GET call responds with 40 avatars. THIS IS A TEMPORARY FIX TO THIS BACKEND PROBLEM!
      setAvatar(response.data.slice(0, 10));
    });
  }, []);

  const openContentModal = () => {
    modals.openModal({
      title: "Choose your avatar:",
      centered: true,
      children: (
        <>
          {avatars.map((avatar) => {
            return (
              <button
                className="custom-avatars"
                onClick={() => {
                  modals.closeModal(setProfilePic(avatar));
                  setAvatarStatus(true);
                }}
                key={avatar.id}
              >
                <img src={`${avatar.link}`} alt={""} width={50}></img>
              </button>
            );
          })}
        </>
      ),
    });
  };

  let picture = (
    <Avatar
      src={isAvatarPicked ? `${profilePic.link}` : defaultAvatar}
      size={80}
      mx="auto"
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
    setVisible(true);
    authServices
      .createUser(newUser)
      .then((response) => {
        if (response.status === 201) {
          setUser(users.concat(response.data));
          setVisible(false);
          toast.success(`A confirmation email was sent to ${newEmail}`);
        }
        return response.data;
      })
      .catch(() => {
        setVisible(false);
        toast.error(`${newEmail} is already in use.`);
      });
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
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form className="form-sign-up" onSubmit={form.onSubmit(addUser)}>
        {picture}
        <Button className="primary reset-avatar" onClick={openContentModal}>
          {t("avatar_button")}
        </Button>
        <div className="wrapper-info">
          <TextInput
            maxLength={15}
            className="change-width"
            required
            label={t("form_name")}
            placeholder="Mario"
            {...form.getInputProps("name")}
            onChange={(event) => {
              form.setFieldValue("name", event.currentTarget.value);
              setNewName(event.target.value);
            }}
          />
          <TextInput
            maxLength={15}
            className="change-width"
            required
            label={t("form_surname")}
            placeholder="Rossi"
            {...form.getInputProps("surname")}
            onChange={(event) => {
              form.setFieldValue("surname", event.currentTarget.value);
              setNewLastName(event.target.value);
            }}
          />
        </div>
        <TextInput
          className="email"
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
          name="reset-input-signup"
          required
          label="Password"
          autoComplete="on"
          placeholder="Password"
          {...form.getInputProps("password")}
          onChange={(event) => {
            form.setFieldValue("password", event.currentTarget.value);
            setNewPassword(event.target.value);
          }}
        />
        <PasswordInput
          name="reset-input-signup"
          required
          mt="sm"
          label={t("form_confirm_password")}
          autoComplete="on"
          placeholder={t("form_confirm_password")}
          {...form.getInputProps("confirmPassword")}
          onChange={(event) => {
            form.setFieldValue("confirmPassword", event.currentTarget.value);
            setNewConfPassword(event.target.value);
          }}
        />
        <Checkbox
          required
          mt="md"
          label={t("form_terms_of_service")}
          {...form.getInputProps("termsOfService", { type: "input" })}
          onChange={(event) => {
            form.setFieldValue("termsOfService", event.currentTarget.value);
            setPrivacy(Boolean(event.target.value));
          }}
        />
        <LoadingOverlay visible={visible} />
        <Group position="right" mt="md">
          <Button className="primary" type="submit">
            {t("form_signup")}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
