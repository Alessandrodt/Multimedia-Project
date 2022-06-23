import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";

const EditFolderForm = (props) => {
    const modal = useModals()

    const form = useForm({
        initialValues: {
            name: '',
        },

        validate: {
            name: (value) => value.length < 3 ? "the name has to be at least 3 characters long" : null,
        },
    });

    return (
        <Box>
            <form onSubmit={form.onSubmit(values => props.onSubmit(props.userId, props.folderId, values))}>
                <TextInput
                    required
                    data-autofocus
                    placeholder="Folder name"
                    {...form.getInputProps('name')}
                />
                <Button fullWidth onClick={() => modal.closeModal()} type="submit">Confirm</Button>
            </form>
        </Box>
    );
}

export default EditFolderForm;