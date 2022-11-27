import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  card: {
    marginTop: -10,
    transition: "transform 150ms ease, box-shadow 150ms ease",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
  placesNearBy: {
    zIndex: 10,
    marginBottom: 10,
    fontWeight: 800,
  },
}));

export default useStyles;
