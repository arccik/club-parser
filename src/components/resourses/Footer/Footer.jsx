import { Container, Group, ActionIcon, Text } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";
import Image from "next/image";

import useStyles from "./styles";
import { useRouter } from "next/router";

const FooterSocial = () => {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image
          src="/assets/white-logo.png"
          width={120}
          height={60}
          alt="StripRadar logo"
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
        <Group mt="lg" style={{ cursor: "pointer" }}>
          <Text size="xs" onClick={() => router.push("/utils/Privacy-policy")}>
            Privacy Policy
          </Text>
          <Text
            size="xs"
            onClick={() => router.push("/utils/Terms-and-conditions")}
          >
            Terms and Conditions
          </Text>
        </Group>
      </Container>
    </div>
  );
};
export default FooterSocial;
