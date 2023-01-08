// import Image from "next/image";
import useStyles from "./styles";
import { Image } from "@mantine/core";
const Hero = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <Image
        src="/assets/hero-stripradar.png"
        alt="hero image"
        className={classes.heroImage}
      />
    </div>
  );
};

export default Hero;
