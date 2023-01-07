import { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";

const BuyTickets = ({ eventId, title }) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={title}
        size="lg"
        p={0}
      >
        <iframe
          frameborder="0"
          border="0"
          allowtransparency="true"
          src={`https://www.skiddle.com/infofeed/ticketbox.php?ilid=${eventId}&sktag=15161&test=false&paypal=false`}
          name="childframe"
          id={`childframe${eventId}`}
          width="100%"
          height="400px"
        ></iframe>
      </Modal>

      <Group position="center">
        <Button
          onClick={() => setOpened(true)}
          color="dark"
          fullWidth
          mt="md"
          radius="md"
          mb="lg"
          component="a"
          target="_blank"
        >
          Buy Ticket
        </Button>
      </Group>
    </>
  );
};

export default BuyTickets;
