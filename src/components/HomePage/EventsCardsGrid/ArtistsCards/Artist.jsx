import { Paper, Text, Title } from "@mantine/core";
import Link from "next/link";

import useStyles from "./styles";

const Artist = ({ image, name, _id, events }) => {
  const { classes } = useStyles();
  return (
    <Paper
      shadow="md"
      p="md"
      // radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
      component={Link}
      href={`/details/artists/${_id}`}
    >
      <div>
        <Text className={classes.category} size="xs">
          Artist
        </Text>
        <Title order={6} className={classes.title}>
          {name}
        </Title>
      </div>
    </Paper>
  );
};

export default Artist;
