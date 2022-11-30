import { createStyles, Select, TextInput, Container } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import useStyles from "./styles";
import { ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";

export default function ContainedInputs() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <Container size="xs">
      <TextInput
        icon={<IconSearch size={18} stroke={1.5} />}
        radius="xl"
        size="md"
        p="lg"
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.secondaryColor}
            variant="filled"
          >
            {theme.dir === "ltr" ? (
              <IconArrowRight size={18} stroke={1.5} />
            ) : (
              <IconArrowLeft size={18} stroke={1.5} />
            )}
          </ActionIcon>
        }
        placeholder="Artist, Event or place name"
        rightSectionWidth={42}
      />

      <DatePicker
        style={{ marginTop: 20 }}
        label="Choose the date"
        placeholder="Up to for a party ?"
        classNames={classes}
        clearable={false}
      />
    </Container>
  );
}
