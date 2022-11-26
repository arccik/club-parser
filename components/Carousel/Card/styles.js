import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => {
  return {
    card: {
      height: 250,
      width: 150,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      backgroundSize: "cover",
      backgroundPosition: "center",
      [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
        width: 250,
        height: 300,
      },
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 900,
      color: theme.white,
      lineHeight: 1.2,
      fontSize: "1.2rem",
      marginTop: theme.spacing.xs,
    },

    category: {
      color: theme.white,
      opacity: 0.7,
      fontWeight: 700,
      textTransform: "uppercase",
    },
  };
});
export default useStyles;
