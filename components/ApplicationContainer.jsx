import {
  ActionIcon,
  AppShell,
  Footer,
  Group,
  Header,
  Text,
  Input,
} from "@mantine/core";
import { useRouter } from "next/router";
import Navigation from "./BurgerMenu/Menu";
import { useState } from "react";

import { IconArrowLeft, IconMap, IconSearch } from "@tabler/icons";

export const ApplicationContainer = ({ children }) => {
  const [searchInputBarShow, setSearchInputBarShow] = useState();
  const router = useRouter();
  return (
    <AppShell
      styles={{
        main: {
          background: "white",
          width: "100vw",
          height: "100vh",
          paddingLeft: "0px",
        },
      }}
      fixed
      header={
        <Header height={60} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text size="lg" weight="boldest" onClick={() => router.push("/")}>
              Next StripRadar
            </Text>
            {searchInputBarShow && (
              <Input
                autoFocus
                style={{
                  position: "absolute",
                  width: "60%",
                  animation: "2s",
                  zIndex: 1,
                }}
                placeholder="Search..."
              />
            )}

            <Group>
              {router.pathname !== "/" && (
                <ActionIcon
                  variant="subtle"
                  color="dark"
                  size="xl"
                  onClick={() => router.push("/")}
                  style={{ marginRight: 30 }}
                >
                  <IconArrowLeft />
                </ActionIcon>
              )}
              <ActionIcon
                style={{
                  position: "absolute",
                  right: searchInputBarShow ? 60 : 100,
                }}
                variant="subtle"
                color="dark"
                size="xl"
                onClick={() => setSearchInputBarShow((prev) => !prev)}
              >
                <IconSearch />
              </ActionIcon>
              {!searchInputBarShow && (
                <ActionIcon
                  style={{ position: "absolute", right: 60 }}
                  variant="subtle"
                  color="dark"
                  size="xl"
                  onClick={() => router.push("/map")}
                >
                  <IconMap />
                </ActionIcon>
              )}
            </Group>

            <Navigation />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
