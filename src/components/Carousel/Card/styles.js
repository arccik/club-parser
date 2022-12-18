import { createStyles, keyframes } from "@mantine/core";

export const glower = keyframes({
  "0%": {
    backgroundPosition: " 0 0",
  },

  "50%": {
    backgroundPosition: "400% 0",
  },

  "100%": {
    backgroundPosition: "0 0",
  },
});

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
      [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
        width: 250,
        height: 300,
      },
    },
    gradient: {
      background: "linear-gradient(from top, rgba(0, 0, 0, 0.85), transparent)",
    },
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: "bolder",
      color: theme.white,
      lineHeight: 1.2,
      fontSize: "1.2rem",
      marginTop: theme.spacing.xs,
    },
    textBackground: {
      backgroundColor: "black",
      boxShadow: "10px 0 0px 0px black, -10px 0 0px 0px black",
    },

    date: {
      color: theme.white,
      opacity: 0.7,
      fontWeight: 700,
      textTransform: "uppercase",
    },
  };
});
export default useStyles;
