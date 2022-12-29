import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
} from "@mantine/core";
import { IconVinyl } from "@tabler/icons";
import Link from "next/link";

import useStyles from "./styles";

const mockdata = [
  { title: "Drum And Bass", icon: IconVinyl, color: "indigo" },
  { title: "Techno", icon: IconVinyl, color: "indigo" },
  { title: "Dubstep", icon: IconVinyl, color: "indigo" },
  { title: "Neurofunk", icon: IconVinyl, color: "teal" },
  { title: "Hip-hop", icon: IconVinyl, color: "teal" },
  { title: "Trill", icon: IconVinyl, color: "teal" },
  { title: "Reggie", icon: IconVinyl, color: "pink" },
  { title: "Electro", icon: IconVinyl, color: "red" },
  { title: "House", icon: IconVinyl, color: "orange" },
];

const GenresBox = () => {
  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton
      key={item.title}
      className={classes.item}
      component={Link}
      href={`/details/genres/${item.title}`}
    >
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <>
      <Text fz="xl" weight="bolder" ml="lg" mt="lg">
        By Genres
      </Text>
      <Card
        withBorder
        radius="md"
        size="sm"
        ml="md"
        mr="md"
        className={classes.card}
      >
        <Group position="apart">
          {/* <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
          + 21 other services
        </Anchor> */}
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
    </>
  );
};

export default GenresBox;
