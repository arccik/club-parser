import Navigation from "./BurgerMenu/Menu";
import { IconMapPin, ActionIcon } from "@tabler/icons";
import Image from "next/image";
import { Header, Group } from "@mantine/core";

export default function AppHeader() {
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
  );
}
