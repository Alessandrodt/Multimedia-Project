// React imports
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

// Libraries
import {
  Button,
  Box,
  Group,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";
import { t } from "i18next";

// Services
import authServices from "../../services/authServices";

export const Login = () => {
  const modals = useModals();
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const person = {
    email: email,
    password: password,
  };

  const getUser = () => {
    setVisible(true);
    authServices
      .getUser(person)
      .then((response) => {
        const singleUser = JSON.stringify(response.data);
        setUser(user.concat(response.data));
        sessionStorage.setItem("user", singleUser);
        // Need a more elegant solution to this Auth Token problem with interceptors.
        sessionStorage.setItem("Auth Token", JSON.parse(singleUser).token);
        setVisible(false);
        modals.closeModal();
        navigate("/home");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error(`${t("login_credentials_invalid")}`);
        } else {
          toast.error(`${t("login_not_confirmed_yet")} ${email}`);
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
          : `${t("invalid_email")}`,
      password: (value) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
          ? null
          : `${t("invalid_password")}`,
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form className="form-login" onSubmit={form.onSubmit(getUser)}>
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
          name="reset-input-login"
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
          <Button className="primary" type="submit">
            Login
          </Button>
        </Group>
      </form>
    </Box>
  );
};
