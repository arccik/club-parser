import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
} from "@mantine/core";
import { IconVinyl } from "@tabler/icons";

import useStyles from "./styles";

const mockdata = [
  { title: "Drum And Bass", icon: IconVinyl, color: "indigo" },
  { title: "Techno", icon: IconVinyl, color: "indigo" },
  { title: "DubStep", icon: IconVinyl, color: "indigo" },
  { title: "Neurofunk", icon: IconVinyl, color: "teal" },
  { title: "Hip Hop", icon: IconVinyl, color: "teal" },
  { title: "Trill", icon: IconVinyl, color: "teal" },
  { title: "Reggie", icon: IconVinyl, color: "pink" },
  { title: "Electro", icon: IconVinyl, color: "red" },
  { title: "House", icon: IconVinyl, color: "orange" },
];

const GenresBox = () => {
  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" m="md" className={classes.card}>
      <Group position="apart">
        <Text className={classes.title}>Check your Favorite Genre</Text>
        {/* <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
          + 21 other services
        </Anchor> */}
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
};

export default GenresBox;
