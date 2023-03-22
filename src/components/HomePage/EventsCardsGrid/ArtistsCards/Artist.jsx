import {
  Paper,
  Text,
  Title,
  Modal,
  Group,
  Card,
  Image,
  Badge,
} from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons";
import { useState } from "react";

import useStyles from "./styles";

const Artist = ({ image, name, _id, spotifymp3url }) => {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title={name}>
        <Card withBorder radius="md">
          <Card.Section>
            <Image src={image} alt={name} height={400} />
          </Card.Section>

          <Badge
            className={classes.titleBagde}
            variant="gradient"
            gradient={{ from: "yellow", to: "red" }}
          >
            {name}
          </Badge>
          {spotifymp3url && (
            <audio controls className={classes.player}>
              <source src={spotifymp3url} type="audio/mpeg" width="100%" />
              Your browser does not support the audio element.
            </audio>
          )}
        </Card>
      </Modal>

      <Group position="center">
        <Paper
          shadow="md"
          p="md"
          sx={{ backgroundImage: `url(${image})` }}
          className={classes.card}
          onClick={() => setOpened(true)}
        >
          <div>
            {/* <Text className={classes.category} size="xs">
              Artist
            </Text> */}
            <Title order={6} className={classes.title}>
              {name}
            </Title>
            <IconPlayerPlay
              style={{
                marginTop: 40,
                marginLeft: -8,
                color: "white",
              }}
            />
          </div>
        </Paper>
      </Group>
    </>
  );
};

export default Artist;
