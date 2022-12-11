import { Navbar, Tooltip, UnstyledButton, Stack, Image } from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
  IconLogout,
} from "@tabler/icons";
import useStyles from "./styles";
import Link from "next/link";
import { useRouter } from "next/router";

function NavbarLink({ icon: Icon, label, active, onClick }) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, link: "/admin", label: "Home" },
  { icon: IconGauge, link: "/admin/events", label: "Events" },
  { icon: IconDeviceDesktopAnalytics, link: "/admin/venues", label: "Venues" },
];

export default function AppContainerWithSideMenu({ children }) {
  const router = useRouter();
  const links = mockdata.map((link, index) => (
    <Link href={link.link} key={link.label}>
      <NavbarLink
        {...link}
        active={router.asPath.split("/").includes(link.label.toLowerCase())}
      />
    </Link>
  ));

  return (
    <>
      <Navbar width={{ base: 80 }} p="md">
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={0}>
            {links}
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <NavbarLink icon={IconLogout} label="Logout" />
          </Stack>
        </Navbar.Section>
      </Navbar>
      <div>{children}</div>
    </>
  );
}
