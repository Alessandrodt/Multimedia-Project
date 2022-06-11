import { useEffect, useState } from "react";

import { Button, Box, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ErrorMessage } from "../error-message/ErrorMessage";
import { useNavigate } from "react-router-dom";

import authServices from "../../services/authservices";


export const Login = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    authServices.getPerson(person)
      .then((response) => {
        setUser(user.concat(response.data));
        sessionStorage.setItem('Auth Token', response.data.token)
        navigate('/home');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          handleMessage("red", `email or password are invalid`);
        } else {
          handleMessage(
            "red",
            `Go to your email address ${email} and confirm your subscription`
          );
        }
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
          required
          label="Password"
          placeholder="password"
          autoComplete="on"
          {...form.getInputProps("password")}
          onChange={(event) => {
            form.setFieldValue("password", event.currentTarget.value);
            setPassword(event.target.value);
          }}
        />
        <Group position="right" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  );
};
