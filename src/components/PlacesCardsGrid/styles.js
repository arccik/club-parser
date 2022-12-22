import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  card: {
    margin: 0,
    // top: 300,
    transition: "transform 150ms ease, box-shadow 150ms ease",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
    width: 140,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      textOverflow: "unset",
      zIndex: 10,
    },
  },
  placesNearBy: {
    color: theme.white,
    marginBottom: 8,
    marginTop: 10,
    fontWeight: 800,
    zIndex: 100,
  },
}));

export default useStyles;
