import { Badge } from "@mantine/core";
import useStyles from "./styles";

const OpenCloseBadge = ({ from, to }) => {
  const { classes } = useStyles();
  return new Date().toLocaleTimeString() >= from &&
    new Date().toLocaleTimeString() < to ? (
    <Badge className={classes.bagde} size="xs" color="green">
      Place Open
    </Badge>
  ) : (
    <Badge className={classes.bagde} size="xs" color="red">
      Place Closed
    </Badge>
  );
};

export default OpenCloseBadge;
