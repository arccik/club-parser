import { Menu, Burger, NavLink } from "@mantine/core";
import { useState } from "react";
import Link from "next/link";
import {
  IconArrowsLeftRight,
  IconHome2,
  IconMusic,
  IconMap2,
  IconBuildingSkyscraper,
} from "@tabler/icons";

export default function Navigation() {
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(false);
  const items = [
    { icon: <IconHome2 />, link: "/", label: "Home" },
    { icon: <IconMusic />, link: "/events", label: "Events" },
    {
      icon: <IconBuildingSkyscraper />,
      link: "/admin/venues",
      label: "Venues",
    },
    { icon: <IconMap2 />, link: "/map", label: "Map" },
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
        <Menu.Item color="red" icon={<IconMusic size={14} />}>
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
        <Menu.Item color="green" icon={<IconBuildingSkyscraper size={14} />}>
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
      </Menu.Dropdown>
    </Menu>
  );
}
