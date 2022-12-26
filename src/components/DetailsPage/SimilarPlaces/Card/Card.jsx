import { Paper, Text, Title } from "@mantine/core";
import useStyles from "./styles";
import Link from "next/link";
import OpenCloseBadge from "../../../../utils/OpenCloseBadge/OpenCloseBadge";

const SimilarCard = ({ open, title, image, distance, link, close }) => {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="md"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
      component={Link}
      href={link}
    >
      <div>
        <Text className={classes.category}>{`${open}-${close}`}</Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
        <Text size="xs" className={classes.category}>
          {Math.floor(distance)} km
        </Text>
      </div>
    </Paper>
  );
};

export default SimilarCard;
