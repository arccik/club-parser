import { Container, Group, ActionIcon, Text } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandFacebook,
  IconBrandInstagram,
} from "@tabler/icons";
import Image from "next/image";

import useStyles from "./styles";
import { useRouter } from "next/router";

const FooterSocial = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const handleClick = (event) => {
    console.log("Clicked >>> ", event);
  };
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <img src="/assets/logo.png" width={120} alt="ClubChaser logo" />
        <Group spacing={0} className={classes.links} position="right" noWrap>
          {/* <ActionIcon
            size="lg"
            component="a"
            href="https://twitter.com/StripRadar"
            target="_blank"
          >
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            component="a"
            href="https://www.instagram.com/stripradar/"
            target="_blank"
          >
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            component="a"
            href="https://www.facebook.com/profile.php?id=100089814724859"
            target="_blank"
          >
            <IconBrandFacebook size={18} stroke={1.5} />
          </ActionIcon> */}
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
