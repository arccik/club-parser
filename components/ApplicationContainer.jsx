import { ActionIcon, AppShell, Group, Header } from "@mantine/core";
import { useRouter } from "next/router";
import Navigation from "./BurgerMenu/Menu";

import { IconArrowLeft, IconMapPin } from "@tabler/icons";
import Image from "next/image";

export const ApplicationContainer = ({ children }) => {
  const router = useRouter();
  return (
    <AppShell
      styles={{
        main: {
          width: "100vw",
          height: "100vh",
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
            <Image
              onClick={() => router.push("/")}
              src="/assets/logo.png"
              alt="StripRadar logo"
              width={120}
              height={60}
              style={{ cursor: "pointer", padding: "5px 5px 5px 0px" }}
            />

            <Group>
              {router.pathname !== "/" && (
                <ActionIcon
                  variant="subtle"
                  color="dark"
                  size="xl"
                  onClick={() => router.push("/")}
                  style={{ position: "absolute", right: 130 }}
                >
                  <IconArrowLeft />
                </ActionIcon>
              )}

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

            <Navigation />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
