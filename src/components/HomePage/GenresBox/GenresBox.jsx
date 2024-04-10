import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  Container,
  Anchor,
  Loader,
} from "@mantine/core";
import { IconMusic } from "@tabler/icons";
import Link from "next/link";
import { useGetGenresQuery } from "../../../../src/features/event/eventSlice";

import useStyles from "./styles";
import { useState } from "react";

const GenresBox = () => {
  const { classes, theme } = useStyles();
  const [expanded, setExpanded] = useState(false);

  const { data: genres, isLoading, error } = useGetGenresQuery();

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className="mx-auto">
        <Text>No genres</Text>
      </div>
    );
  const slicer = expanded ? genres.length : 9;
  const items = genres.slice(0, slicer).map((item, i) => (
    <UnstyledButton
      key={item}
      className={classes.item}
      component={Link}
      href={`/details/genres/${item.split("/")}`}
    >
      <IconMusic color={theme.colors.blue[7]} size={32} />
      <Text size="xs" mt={7}>
        {item}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Container
      sx={{
        "@media (max-width: 755px)": {
          margin: 0,
          padding: 0,
        },
      }}
    >
      <Card radius="sm" size="sm" className={classes.card}>
        <Group position="apart">
          <Text fz="xl" weight="bolder">
            By Genres
          </Text>
          <Anchor
            size="xs"
            color="dimmed"
            sx={{ lineHeight: 1 }}
            onClick={() => setExpanded((prev) => !prev)}
          >
            See all Genres
          </Anchor>
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
    </Container>
  );
};

export default GenresBox;
