import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  title: {
    position: "relative",
    zIndex: -1,
    fontSize: 60,
    WebkitTextStroke: "3px black",
    color: "white",
    "@media (max-width: 520px)": {
      fontSize: 50,
    },
  },
  quotes: {
    padding: 10,
    margin: 10,
    boxShadow:
      "-1px 0 0 1px rgba(255, 203, 82, 0.75), -1px -1px 0 1px rgba(255, 170, 70, 0.25), -1px 1px 0 1px rgba(255, 170, 70, 0.25), 0 -1px 0 1px rgba(255, 136, 57, 0.5), 0 1px 0 1px rgba(255, 136, 57, 0.5), 1px -1px 0 1px rgba(255, 103, 44, 0.25), 1px 1px 0 1px rgba(255, 103, 44, 0.25), 1px 0 0 1px rgba(255, 69, 31, 0.75)",
  },
  description: {
    display: "block",
    display: "-webkit-box",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    overflow: "hidden",
    maxHeight: "3.6em",
    lineHeight: "1.8em",
  },
}));

export default useStyles;
