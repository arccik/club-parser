import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    width: "100%",
    height: 50,
    padding: 10,
    position: "relative",
    boxSizing: "borderBox",
    alignItems: "center",
    borderRadius: 10,
    opacity: 0.4,
    boxShadow: "2px 2px 2px red",
    border: "1px solid #e9ecef",
    "&:hover, &:focus": {
      // backgroundColor: "lightblue",

      boxShadow:
        "0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 28px 23px -7px, rgb(0 0 0 / 4%) 0px 12px 12px -7px",
    },
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export default useStyles;
