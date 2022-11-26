import {
  ActionIcon,
  AppShell,
  Footer,
  Group,
  Header,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";
import Navigation from "./Navigation/Navigation";

import { IconMap, IconSearch } from "@tabler/icons";

export const ApplicationContainer = ({ children }) => {
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
      //   footer={
      //     <Footer height={60} p="md">
      //       <Group position="apart" spacing="xl">
      //         <Text size="sm">
      //           <span style={{ fontWeight: "bolder" }}>Left Side</span> Some Time
      //         </Text>
      //         <Text size="sm">
      //           <span style={{ fontWeight: "bolder" }}>Right Side</span> Some Time
      //         </Text>
      //       </Group>
      //     </Footer>
      //   }
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
            <ActionIcon
              style={{ position: "absolute", right: 100 }}
              variant="subtle"
              color="dark"
              size="xl"
              radius="lg"
            >
              <IconSearch style={{ margin: 10 }} />
            </ActionIcon>
            <ActionIcon
              style={{ position: "absolute", right: 60 }}
              variant="subtle"
              color="dark"
              size="xl"
              radius="lg"
              onClick={() => router.push("/map")}
            >
              <IconMap />
            </ActionIcon>
            <Navigation />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
