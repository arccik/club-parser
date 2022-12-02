import { ActionIcon, AppShell, Group, Header } from "@mantine/core";
import { useRouter } from "next/router";
import Navigation from "./BurgerMenu/Menu";

import { IconMapPin } from "@tabler/icons";
import Image from "next/image";

export const ApplicationContainer = ({ children }) => {
  const router = useRouter();
  return (
    <AppShell
      fixed
      padding={0}
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
              onClick={() => router.back()}
              src="/assets/logo.png"
              alt="StripRadar logo"
              width={120}
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

            <Navigation />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
