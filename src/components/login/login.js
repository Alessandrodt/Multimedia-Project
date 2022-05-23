import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export const Login = () => {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      // email: (value) => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? null : 'Invalid email'),
      // password: (value) => (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ? null : 'Invalid password')
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          required
          label="username"
          placeholder="Username"
          {...form.getInputProps('username')}
        />
         <TextInput
          required
          label="Password"
          placeholder="password"
          {...form.getInputProps('password')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Log in</Button>
        </Group>
      </form>
    </Box>
  );
}