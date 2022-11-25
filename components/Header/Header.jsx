import { Overlay, Title, Container, Text, Button, Input } from "@mantine/core";

import useStyles from "./styles";
import Filter from "../Filter/Filter";

const Header = () => {
  const { classes, cx } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Strip Radar
          <Text component="span" p="lg" inherit className={classes.highlight}>
            Nights Entertainment
          </Text>
        </Title>

        <Container size={640} pt="lg">
          <Input p="lg" placeholder="Serach.." />
        </Container>

        <div className={classes.controls}>
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default Header;
