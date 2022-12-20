import Image from "next/image";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.video}
        fill={true}
        alt="stripradar-intro-video"
        src="/assets/logo.gif"
      />
    </div>
  );
};

export default Hero;
