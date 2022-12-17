import { createStyles, Paper, Text, Title, Button } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    // fontFamily: `Greycliff CF ${theme.fontFamily}`,
    color: theme.white,
    fontWeight: 900,
    lineHeight: 1.2,
    fontSize: "2rem",
    marginTop: theme.spacing.xs,
    WebkitTextStroke: 1,
    WebkitTextStrokeColor: "black",
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

let data = {
  image: "https://i.ytimg.com/vi/3CGNM-VnO5g/maxresdefault.jpg",
  title: "Most Advanced party",
  category: "Category",
};

export default function ArticleCardImage(props) {
  const { classes } = useStyles();
  const { image, title, category } = data;
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        {/* <Text className={classes.category} size="xs">
          {category}
        </Text> */}
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="black" color="dark">
        Read
      </Button>
    </Paper>
  );
}
