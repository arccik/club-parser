import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";
import { useState } from "react";

import styles from "./hero.module.css";

const Hero = () => {
  return (
    <div className={styles.container}>
      <video autoPlay muted loop className={styles.video}>
        <source src="/assets/intro.mov" type="video/mp4" />
      </video>
    </div>
  );
};

export default Hero;
