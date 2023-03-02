import { Container, Group, ActionIcon } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";
import Image from "next/image";

import useStyles from "./styles";

const FooterSocial = () => {
  const { classes, theme } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image
          src="/assets/logo.png"
          // {
          //   theme.colorScheme === "light"
          //     ? "/assets/logo.png"
          //     : "/assets/white-logo.png"
          // }
          width={120}
          height={60}
          alt="ClubChaser logo"
          blurDataURL="/assets/blur.jpg"
          placeholder="blur"
        />
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};
export default FooterSocial;
