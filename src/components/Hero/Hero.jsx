import Image from "next/image";
import styles from "./hero.module.css";
import { useState } from "react";

const Hero = () => {
  const [ratio, setRatio] = useState(4 / 3); // default to 16:9
  return (
    <div className={styles.container}>
      <Image
        className={styles.heroImage}
        alt=""
        src="/assets/logo.gif"
        fill
        // layout="responsive" // you can use "responsive", "fill" or the default "intrinsic"
        // onLoadingComplete={({ naturalWidth, naturalHeight }) =>
        //   setRatio(naturalWidth / naturalHeight)
        // }
      />
    </div>
  );
};

export default Hero;
