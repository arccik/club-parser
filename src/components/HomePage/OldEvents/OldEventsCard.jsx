import { createStyles, Paper, Text, Title, Button } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import useStyles from "./styles";
import Link from "next/link";

export default function ArticleCardImage({ data }) {
  const { classes } = useStyles();
  const { image, name, enddate, _id } = data;
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {dayjs(enddate).fromNow()}
        </Text>
        <Title order={3} className={classes.title}>
          <span className={classes.textBackground}>{name}</span>
        </Title>
      </div>
      <Button
        variant="black"
        color="dark"
        component={Link}
        href={`/details/events/${_id}`}
      >
        Read
      </Button>
    </Paper>
  );
}
