import { Paper, Text, Button, Title } from "@mantine/core";
import useStyles from "./styles";
import { useRouter } from "next/router";
export default function Card({ image, title, category }) {
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
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button
        variant="white"
        color="dark"
        onClick={() => router.push(`/details/${title}`)}
      >
        Read
      </Button>
    </Paper>
  );
}
