import React, { useState } from "react";
import { TextInput, Button, Checkbox, Group, Box, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import authServices from "../../services/authservices";

export const SignUp = () => {
    const [user, setUser] = useState([]);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const addUser = (event) => {
        event.preventDefault();
        const isUserAdded = user.map((p) => p.user).includes(newUsername);
        const existingUser = user.find((p) => newUsername === p.user);

        if(isUserAdded === true) {
            window.alert(`${newUser.user} was added `)
        } else if(existingUser) {
            window.alert(`user already exists`)
        }
    }

    const newUser = {
        user: newUsername,
        password: newPassword,
    };
    
    authServices.createUser(newUser).then((response) => {
        setUser(user.concat(response.data))
        setNewUsername('');
        setNewPassword('');
    });

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            surname: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? null : 'Invalid email'),
            // password: (value) => (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ? null : 'Invalid password')
        },
    });

    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <form onSubmit={form.onSubmit(addUser)}>
                <TextInput
                    required
                    label="Name"
                    placeholder="Mario"
                    {...form.getInputProps('name')}
                />
                <TextInput
                    required
                    label="Surname"
                    placeholder="Rossi"
                    {...form.getInputProps('surname')}
                />
                <TextInput
                    required
                    label="Email"
                    placeholder="Mario.Rossi@email.com"
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    required
                    label="Password"
                    placeholder="YourPasswordHere"
                    {...form.getInputProps('password')}
                />
                <Checkbox
                    mt="md"
                    label="I agree to the Terms of Condition and Service."
                    {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                />

                <Group position="right" mt="md">
                    {/* <Button onSubmit={routeChange} type="submit">Sign-Up</Button> */}
                </Group>
            </form>
        </Box>
    );
}
