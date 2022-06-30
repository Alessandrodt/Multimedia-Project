// React imports
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Mantine imports
import { Button, Box, Group, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";

import { ErrorMessage } from "../error-message/ErrorMessage";

// Services
import authServices from "../../services/authServices";

export const Login = () => {
  const modals = useModals();
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const person = {
    email: email,
    password: password,
  };

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

  const getUser = () => {
    setVisible(true);
    authServices
    .getUser(person)
    .then((response) => {
        const singleUser = JSON.stringify(response.data);
        setUser(user.concat(response.data));
        sessionStorage.setItem('user', singleUser);
        // Need a more elegant solution to this Auth Token problem with interceptors.
        sessionStorage.setItem('Auth Token', JSON.parse(singleUser).token);
        setVisible(false);
        modals.closeModal();
        navigate('/home');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          handleMessage(`email or password are invalid`);
        } else {
          handleMessage(
            "red",
            `Go to your email address ${email} and confirm your subscription`
          );
        }
        setVisible(false);
      });
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
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
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <ErrorMessage message={errorMessage} style={errorStyle} />
      <form onSubmit={form.onSubmit(getUser)}>
        <TextInput
          maxLength={25}
          required
          label="Email"
          placeholder="Email"
          autoComplete="on"
          {...form.getInputProps("email")}
          onChange={(event) => {
            form.setFieldValue("email", event.currentTarget.value);
            setEmail(event.target.value);
          }}
        />
        <PasswordInput
          maxLength={15}
          required
          label="Password"
          placeholder="Password"
          autoComplete="on"
          {...form.getInputProps("password")}
          onChange={(event) => {
            form.setFieldValue("password", event.currentTarget.value);
            setPassword(event.target.value);
          }}
        />
        <LoadingOverlay visible={visible} />
        <Group position="right" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  );
};
