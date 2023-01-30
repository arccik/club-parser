import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  card: {
    minWidth: 200,
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginLeft: 20,
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    // lineHeight: 1.2,
    fontSize: "0.9rem",
    // marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    fontSize: 12,
    textTransform: "uppercase",
  },
}));

export default useStyles;
