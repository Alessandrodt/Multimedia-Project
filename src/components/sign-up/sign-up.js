import { TextInput, Button, Checkbox, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom"

export const SignUp = () => {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/home`; 
    navigate(path);
  }
  
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
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                <TextInput
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
                    <Button onSubmit={routeChange} type="submit">Sign-Up</Button>
                </Group>
            </form>
        </Box>
    );
}
