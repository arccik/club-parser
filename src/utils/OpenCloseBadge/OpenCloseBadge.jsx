import { Badge } from "@mantine/core";
import useStyles from "./styles";

const OpenCloseBadge = ({ from, to }) => {
  const { classes } = useStyles();
  const nowTime = new Date().getHours();
  const fromHours = from.split(":")[0];
  const toHours = to.split(":")[0];

  const isOpen = nowTime >= fromHours && nowTime > toHours;

  return (
    <Badge className={classes.bagde} size="xs" color={isOpen ? "green" : "red"}>
      Place {isOpen ? "Open" : "Close"}
    </Badge>
  );
};

export default OpenCloseBadge;
