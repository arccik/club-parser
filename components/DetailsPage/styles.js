import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  card: {
    margin: "auto",
    width: 600,
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
    },
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white,
  },
  container: {
    height: "100vh",
    backgroundColor: "black",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export default useStyles;
