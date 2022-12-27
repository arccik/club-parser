import {
  Dialog,
  Group,
  Button,
  TextInput,
  Text,
  Notification,
} from "@mantine/core";
import { useState } from "react";
import { IconTruckLoading, IconShadow } from "@tabler/icons";

const LoadLocalDialog = ({ setAgree }) => {
  const [opened, setOpened] = useState(true);

  const handleClick = () => {
    setOpened(false);
    setAgree();
  };

  return (
    opened && (
      <Notification
        closeButtonProps={{ color: "red" }}
        icon={<IconShadow size={18} />}
        color="blue"
        onClose={() => setOpened((prev) => !prev)}
      >
        Show most related content
        <Button variant="outline" ml="sm" radius={50} onClick={handleClick}>
          Load
        </Button>
      </Notification>
    )
  );
};

export default LoadLocalDialog;
