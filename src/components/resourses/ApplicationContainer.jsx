import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  useMantineTheme,
  Image,
} from "@mantine/core";
import { useRouter } from "next/router";
import BurgerMenu from "../AppHeader/BurgerMenu/BurgerMenu";

import { IconMapPin } from "@tabler/icons";

export const ApplicationContainer = ({ children }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  return (
    <AppShell
      // fixed
      padding={0}
      header={
        <Header
          height={60}
          p="md"
          style={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.dark[4],
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Image
              onClick={() => router.push("/")}
              src="/assets/white-logo.png"
              // theme.colorScheme === "light"
              // ? "/assets/logo.png"
              // : "/assets/white-logo.png"
              alt="StripRadar logo"
              width={140}
              height={60}
              style={{ cursor: "pointer", padding: "5px 5px 5px 0px" }}
            />

            <Group>
              <ActionIcon
                style={{ position: "absolute", right: 45 }}
                variant="subtle"
                color="dark"
                size="xl"
                onClick={() => router.push("/map")}
              >
                <IconMapPin />
              </ActionIcon>
            </Group>

            <BurgerMenu />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
