import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  bagde: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
  },
}));

export default useStyles;
