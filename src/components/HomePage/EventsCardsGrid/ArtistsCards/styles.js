import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    height: 120,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    // fontSize: 32,
    marginTop: theme.spacing.lg,
    textShadow: "1px 1px black",
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,

    textTransform: "uppercase",
  },
  titleBagde: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
    fontSize: 20,
  },
  player: {
    position: "absolute",
    bottom: 20,
  },
  badgeCarousel: {
    maxWidth: 270,
    "@media (min-width: 520px)": {
      maxWidth: "85%",
    },
  },
}));
export default useStyles;
