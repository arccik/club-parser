import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: "1.2rem",
    fontWeight: 600,
    width: 220,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:hover": {
      textOverflow: "unset",
      display: "block",
      zIndex: 100,
    },
  },
  placesNearBy: {
    color: theme.black,
    marginBottom: 8,
    marginTop: 10,
    fontWeight: 800,
    zIndex: 100,
  },
}));

export default useStyles;
