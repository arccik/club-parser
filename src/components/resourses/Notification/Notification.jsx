import { Dialog, Group, Button, Text } from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";

const Notifications = ({ setAgree }) => {
  const cookieTitle = "Cookie Consent";
  const nearByTitle = "Show nearby places";
  const [showCurrentLocationDialog, setShowCurrentLocationDialog] =
    useSessionStorage({
      key: nearByTitle,
      defaultValue: true,
    });
  const [showCookieConsent, setShowCookieConsent] = useSessionStorage({
    key: cookieTitle,
    defaultValue: true,
  });

  const handleClick = () => {
    setShowCurrentLocationDialog(false);
    setAgree();
  };

  return (
    <>
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
          <Text size="sm" weight={500}>
            {nearByTitle}
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
      <Dialog
        opened={showCookieConsent}
        position={{ bottom: 20, right: 10 }}
        radius="md"
        size="md"
        mx={0}
      >
        <Group spacing="xs" position="apart">
          <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
            {cookieTitle}
          </Text>
          <Text size="xs">
            {" "}
            We use cookies to personalise content for you and to analyse our
            traffic. Also, to keep this button status and not to be anoying you
            with this question next time
          </Text>
          <Button
            color="pink"
            variant="outline"
            radius="md"
            onClick={() => setShowCookieConsent(false)}
            mr="lg"
          >
            Got it!
          </Button>
        </Group>
      </Dialog>
    </>
  );
};

export default Notifications;
