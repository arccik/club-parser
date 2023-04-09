import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    marginBottom: 20,
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },
  link: {
    cursor: "pointer",
    "&:hover": {
      fontSize: 18,
      boxShadow: theme.shadows.md,
      transition: "all 0.5s ease;",
      whiteSpace: "nowrap",
    },
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    cursor: "pointer",
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
    "@media (min-width: 520px)": {
      width: "70%",
    },
  },
  badgeCarousel: {
    width: 280,
    "@media (min-width: 520px)": {
      width: "70%",
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
