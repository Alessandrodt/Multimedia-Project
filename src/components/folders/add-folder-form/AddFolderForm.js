import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const AddFolderForm = (props) => {


  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) =>
        value.length < 3
          ? "the name has to be at least 3 characters long"
          : null,
    },
  });

    return (
        <Box>
            <form onSubmit={form.onSubmit(values => props.onSubmit(props.userId, values))}>
                <TextInput
                    maxLength={15}
                    required
                    data-autofocus
                    placeholder="Folder name"
                    {...form.getInputProps('name')}
                />
                <Button name="confirm" fullWidth type="submit">Confirm</Button>
            </form>
        </Box>
    );
}

export default AddFolderForm;
