import { Paper, Text, Button, Title } from "@mantine/core";
import useStyles from "./styles";
import { useRouter } from "next/router";

export default function Card({ image, title, date, id }) {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div className={classes.gradient}>
        <Text className={classes.date} size="xs">
          {date}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button
        variant="filled"
        size="xs"
        color="dark"
        onClick={() => router.push(`/details/events/${id}`)}
      >
        Read
      </Button>
    </Paper>
  );
}
