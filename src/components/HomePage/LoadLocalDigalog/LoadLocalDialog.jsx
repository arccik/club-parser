import {
  Dialog,
  Group,
  Button,
  TextInput,
  Text,
  Notification,
} from "@mantine/core";
import { useState } from "react";
import { IconTruckLoading, IconAnalyze } from "@tabler/icons";

const LoadLocalDialog = ({ setAgree, show, getCurrentLocation }) => {
  const [opened, setOpened] = useState(show);

  const handleClick = () => {
    setOpened(false);
    setAgree();
  };

  return (
    opened && (
      <Dialog
        opened={opened}
        withCloseButton
        position={{ bottom: 20, right: 10 }}
        onClose={() => setOpened(false)}
        radius="md"
        size="md"
        mx={0}
      >
        <Group spacing="xs" position="apart">
          <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
            Show nearby places
          </Text>
          <Button
            color="pink"
            variant="outline"
            radius="md"
            onClick={handleClick}
            mr="lg"
          >
            Load
          </Button>
        </Group>
      </Dialog>
    )
  );
};

export default LoadLocalDialog;
