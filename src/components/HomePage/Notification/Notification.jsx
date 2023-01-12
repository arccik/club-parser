import { Dialog, Group, Button, Text } from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";

const Notification = ({ setAgree, title = "Show nearby places" }) => {
  const [showCurrentLocationDialog, setShowCurrentLocationDialog] =
    useSessionStorage({
      key: title,
      defaultValue: true,
    });

  const handleClick = () => {
    setShowCurrentLocationDialog(false);
    setAgree();
  };

  return (
    <Dialog
      opened={showCurrentLocationDialog}
      withCloseButton
      position={{ bottom: 20, right: 10 }}
      onClose={() => setShowCurrentLocationDialog(false)}
      radius="md"
      size="md"
      mx={0}
    >
      <Group spacing="xs" position="apart">
        <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
          {title}
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
  );
};

export default Notification;
