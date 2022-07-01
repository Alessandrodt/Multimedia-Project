import React from "react";
import { TextInput } from "@mantine/core";
// import { Search, ArrowRight, ArrowLeft } from 'tabler-icons-react';

export function InputWithButton(props) {
  // const theme = useMantineTheme();

  return (
    <TextInput
      name="search"
      radius="xl"
      size="md"
      placeholder="Search"
      rightSectionWidth={42}
      {...props}
    />
  );
}
