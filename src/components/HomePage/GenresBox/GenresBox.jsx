import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  Container,
  Anchor,
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
          {/* <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
            All other Genres
          </Anchor> */}
        </Group>
        <SimpleGrid cols={3} mt="md">
          {items}
        </SimpleGrid>
      </Card>
    </Container>
  );
};

export default GenresBox;
