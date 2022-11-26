import { Overlay, Title, Container, Text, Button, Input } from "@mantine/core";

import useStyles from "./styles";
import Filter from "../Filter/Filter";

const Header = () => {
  const { classes, cx } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        {/* TODO: NICE HEADER */}
        {/* <Title className={classes.title}>
          <Text component="span" p="lg" inherit className={classes.highlight}>
            Strip Radar
          </Text>
          -
        </Title> */}

        <div className={classes.controls}></div>
      </div>
    </div>
  );
};

export default Header;
