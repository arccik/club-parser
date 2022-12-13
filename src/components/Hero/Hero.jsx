import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";
import { useState } from "react";

import styles from "./hero.module.css";

const Hero = () => {
  const [searchValue, setSeachValue] = useState();
  const theme = useMantineTheme();

  return (
    <div className={styles.container}>
      <div>
        <TextInput
          value={searchValue}
          onChange={(e) => setSeachValue(e.target.value)}
          className={styles.serachField}
          icon={<IconSearch size={18} stroke={1.5} />}
          radius="xl"
          size="md"
          variant="filled"
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color={theme.primaryColor}
              variant="transparent"
            >
              {theme.dir === "ltr" ? (
                <IconArrowRight size={18} stroke={1.5} />
              ) : (
                <IconArrowLeft size={18} stroke={1.5} />
              )}
            </ActionIcon>
          }
          placeholder="Search events or venues"
          rightSectionWidth={42}
        />
      </div>
      <video autoPlay muted loop className={styles.video}>
        <source src="/assets/intro.mov" type="video/mp4" />
      </video>
    </div>
  );
};

export default Hero;
