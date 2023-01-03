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
      display: "inline-block",
      textOverflow: "ellipsis",
      wordWrap: "break-word",
      overflow: "hidden",
      maxHeight: "4.8em",
      lineHeight: "1.2em",
    },
    textBackground: {
      opacity: 0.8,
      backgroundColor: "black",
      boxShadow: "10px 0 0px 0px black, -10px 0 0px 0px black",
    },

    date: {
      color: theme.white,
      fontWeight: 700,
      textTransform: "uppercase",
      textShadow:
        "3px 3px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;",
    },
  };
});
export default useStyles;
