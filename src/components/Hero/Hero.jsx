import Image from "next/image";
import styles from "./hero.module.css";
import { useState } from "react";

const Hero = () => {
  return (
    <div className={styles.container}>
      <video autoPlay muted loop className={styles.video}>
        <source src="/assets/next-stripradar-intro.mov" type="video/mp4" />
      </video>
    </div>
  );
};

export default Hero;
