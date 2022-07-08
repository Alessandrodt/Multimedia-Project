import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { t } from "i18next";

const EditFolderForm = (props) => {
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
                    maxLength={15}
                    required
                    data-autofocus
                    placeholder={t("folder_name")}
                    {...form.getInputProps('name')}
                />
                <Button name="confirm" fullWidth type="submit">{t("confirm")}</Button>
            </form>
        </Box>
    );
}

export default EditFolderForm;
