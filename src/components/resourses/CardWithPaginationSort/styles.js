import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  title: {
    position: "relative",
    zIndex: -1,
    fontSize: 100,
    WebkitTextStroke: "3px black",
    color: "white",
  },
  item: {
    "&[data-active]": {
      backgroundImage: theme.fn.gradient({
        from: "red",
        to: "yellow",
      }),
    },
  },
}));

export default useStyles;
