import { Grid, Container } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import useStyles from "./styles";

import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { useEffect } from "react";
import CardsCarousel from "../Carousel/Carousel";

const ProfileDetails = () => {
  const { classes } = useStyles();
  const { scrollIntoView, targetRef } = useScrollIntoView({ offset: 60 });
  useEffect(() => {
    scrollIntoView({ alignment: "center" });
  });
  return (
    <Container className={classes.grid}>
      <Card>
        <Card.Section>
          {/* <Button onClick={() => scrollIntoView({ alignment: "bottom" })}>
            Open
          </Button> */}
          <Image
            ref={targetRef}
            src="https://images.unsplash.com/photo-1606874854197-570136ca68ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
            height={400}
            alt="Norway"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>DJVIBE / STUDIOX</Text>
          <Badge color="pink" variant="light">
            On Sale
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          This time, the Alola family return to their London residency and will
          see the night turn into an exclusive Live Mix Album through Alolas
          in-house studios ...
        </Text>

        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Book the ticket
        </Button>
      </Card>
      <CardsCarousel />
    </Container>
  );
};

export default ProfileDetails;
