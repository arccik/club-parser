import { Paper, Text, Title } from "@mantine/core";

import useStyles from "./styles";

const Artist = ({ image, name }) => {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="md"
      // radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
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
