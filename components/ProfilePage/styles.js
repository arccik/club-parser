import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  grid: {
    position: "absolute",
    left: "50%",
    marginRight: "auto",
    padding: 10,
    transform: "translate(-50%)",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    width: "100%",
    borderRadius: "10px",
    margin: 1,
    top: 700,
    zIndex: 1,
  },
  //   footer: {
  //     borderTop: `1px solid ${
  //       theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
  //     }`,
  //   },

  //   inner: {
  //     display: "flex",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     // paddingTop: theme.spacing.xl,
  //     paddingBottom: theme.spacing.xl,

  //     [theme.fn.smallerThan("xs")]: {
  //       flexDirection: "column",
  //     },
  //   },

  //   links: {
  //     [theme.fn.smallerThan("xs")]: {
  //       marginTop: theme.spacing.md,
  //     },
  //   },
}));

export default useStyles;
