// Libraries
import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { t } from "i18next";

const AddFolderForm = (props) => {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) =>
        value.length < 3 ? `${t("add_folder_name_length")}` : null,
    },
  });

  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) =>
          props.onSubmit(props.userId, values)
        )}
      >
        <TextInput
          maxLength={25}
          required
          data-autofocus
          placeholder={t("folder_name")}
          {...form.getInputProps("name")}
        />
        <Button name="confirm" fullWidth type="submit">
          {" "}
          {t("confirm")}{" "}
        </Button>
      </form>
    </Box>
  );
};

export default AddFolderForm;
