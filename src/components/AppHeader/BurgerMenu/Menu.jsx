import { Menu, Burger, NavLink, Button } from "@mantine/core";
import { useState } from "react";
import Link from "next/link";
import {
  IconArrowsLeftRight,
  IconHome2,
  IconMusic,
  IconMap2,
  IconBuildingSkyscraper,
  IconLogout,
  IconLogin,
  IconPlus,
  IconBrandDjango,
} from "@tabler/icons";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Navigation() {
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(false);
  const { user } = useUser();

  const items = [
    { icon: <IconHome2 />, link: "/", label: "Home" },
    { icon: <IconMusic />, link: "/events", label: "Events" },
    {
      icon: <IconBuildingSkyscraper />,
      link: "/venues",
      label: "Venues",
    },
    { icon: <IconMap2 />, link: "/map", label: "Map" },
    { icon: <IconBrandDjango />, link: "/genres", label: "Genres" },
  ];

  const list = items.map(({ icon, label, link }, index) => (
    <Menu.Item key={label} onClick={() => setOpened(false)}>
      <NavLink
        href={link}
        component={Link}
        key={label}
        active={active === index}
        label={label}
        icon={icon}
        onClick={() => {
          setActive(index);
        }}
        variant="light"
      />
    </Menu.Item>
  ));

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          title={"title"}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        {list}

        <Menu.Divider />

        {user ? (
          <>
            <Menu.Label>ADMIN zone</Menu.Label>

            <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
              <NavLink
                href="/admin"
                component={Link}
                label="Admin Panel"
                onClick={() => {
                  setOpened(false);
                }}
                variant="light"
              />
            </Menu.Item>
            <Menu.Item icon={<IconMusic size={14} />}>
              <NavLink
                href="/admin/events"
                component={Link}
                label="Events List"
                onClick={() => {
                  setOpened(false);
                }}
                variant="light"
              />
            </Menu.Item>
            <Menu.Item icon={<IconBuildingSkyscraper size={14} />}>
              <NavLink
                href="/admin/venues"
                component={Link}
                label="Venues List"
                onClick={() => {
                  setOpened(false);
                }}
                variant="light"
              />
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" icon={<IconLogout size={14} />}>
              <Button
                variant="subtle"
                color="red"
                component="a"
                href="/api/auth/logout"
              >
                Logout
              </Button>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item color="green" icon={<IconLogin size={14} />}>
            <Button
              variant="subtle"
              color="red"
              component="a"
              href="/api/auth/login"
            >
              Login
            </Button>
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
