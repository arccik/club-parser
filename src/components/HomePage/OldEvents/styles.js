import { createStyles } from "@mantine/core";

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
    fontSize: "1rem",
    marginTop: theme.spacing.xs,

    // WebkitTextStroke: 1,
    // WebkitTextStrokeColor: "black",
  },
  textBackground: {
    backgroundColor: "black",

    boxShadow: "10px 0 0px 0px black, -10px 0 0px 0px black",
  },
  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));
export default useStyles;
