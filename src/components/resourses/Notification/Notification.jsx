import { Dialog, Group, Button, Text } from "@mantine/core";
import { useSessionStorage, useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";

const Notifications = ({ setAgree }) => {
  const cookieTitle = "Cookie Consent";
  const nearByTitle = "Show nearby places";
  const [showCurrentLocationDialog, setShowCurrentLocationDialog] =
    useSessionStorage({
      key: nearByTitle,
      defaultValue: true,
    });
  const [showCookieConsent, setShowCookieConsent] = useLocalStorage({
    key: cookieTitle,
    defaultValue: true,
  });

  const handleClick = () => {
    setShowCurrentLocationDialog(false);
    setAgree();
  };

  // useEffect(() => {
  //   if (!showCurrentLocationDialog) setAgree();
  // }, [showCurrentLocationDialog]);
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
          <Button variant="outline" radius="md" onClick={handleClick} mr="lg">
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
            We use cookies to personalise content for you and to analyse our
            traffic. By accessing and using ClubChaser you agree to our Cookies
            Policy. ClubChaser uses cookies and other tracking technologies to
            customise your experience including map navigation and other
            services.
          </Text>
          <Button
            // color="pink"
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
