import { Paper, Text, Button, Title } from "@mantine/core";
import useStyles from "./styles";
import { useRouter } from "next/router";
import Link from "next/link";

const Card = ({ image, title, date, id }) => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Paper
      shadow="lg"
      p="md"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
      component={Link}
      href={`/details/events/${id}`}
    >
      <div className={classes.gradient}>
        <Text className={classes.date} size="xs">
          {date}
        </Text>
        <Title order={3} className={classes.title}>
          <span className={classes.textBackground}>{title}</span>
        </Title>
      </div>
      <Button
        variant="outline"
        shadow="lg"
        size="xs"
        color="dark"
        className={classes.date}
        fullWidth
        onClick={() => router.push(`/details/events/${id}`)}
      >
        Open
      </Button>
    </Paper>
  );
};
export default Card;