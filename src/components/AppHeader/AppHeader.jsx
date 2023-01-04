import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { IconMapPin, ActionIcon } from "@tabler/icons";
import Image from "next/image";
import { Header, Group, useMantineTheme } from "@mantine/core";

export default function AppHeader() {
  const theme = useMantineTheme();
  return (
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
          onClick={() => router.replace("/")}
          src={
            theme.colorScheme === "light"
              ? "/assets/logo.png"
              : "/assets/white-logo.png"
          }
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

        <BurgerMenu />
      </div>
    </Header>
  );
}
