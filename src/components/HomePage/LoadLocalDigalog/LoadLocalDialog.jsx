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

const LoadLocalDialog = ({ setAgree, show }) => {
  const [opened, setOpened] = useState(show);

  const handleClick = () => {
    setOpened(false);
    setAgree();
  };

  return (
    opened && (
      <Notification
        closeButtonProps={{ color: "red" }}
        icon={<IconAnalyze size={18} />}
        color="pink"
        onClose={() => setOpened((prev) => !prev)}
      >
        Show nearby places
        <Button
          color="pink"
          variant="outline"
          ml="sm"
          radius={50}
          onClick={handleClick}
        >
          Load
        </Button>
      </Notification>
    )
  );
};

export default LoadLocalDialog;
