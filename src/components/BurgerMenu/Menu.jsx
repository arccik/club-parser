import { Menu, Burger, NavLink, Button } from "@mantine/core";
import { useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconTrash,
  IconArrowsLeftRight,
  IconHome2,
  IconRadio,
  IconMusic,
  IconFriends,
  IconBuildingSkyscraper,
} from "@tabler/icons";

export default function Navigation() {
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const items = [
    { icon: <IconHome2 />, link: "/", label: "Home" },
    { icon: <IconSettings />, link: "/admin", label: "Admin Panel" },
    { icon: <IconMusic />, link: "/admin/events", label: "Events" },
    {
      icon: <IconBuildingSkyscraper />,
      link: "/admin/venues",
      label: "Venues",
    },
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

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
