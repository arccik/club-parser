import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  useMantineTheme,
  Image,
  Affix,
  Transition,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { useRouter } from "next/router";

import BurgerMenu from "./BurgerMenu/BurgerMenu";

import { IconMap2, IconArrowUp, IconArrowLeft } from "@tabler/icons";

export const ApplicationContainer = ({ children }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [scrollPosition, scrollTo] = useWindowScroll();
  return (
    <AppShell
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
            <Group>
              <ActionIcon
                // style={{ position: "absolute", right: 45 }}
                variant="subtle"
                color="dark"
                size="xl"
                onClick={() => router.push("/map")}
              >
                <IconMap2 />
              </ActionIcon>
            </Group>
            <Image
              onClick={() => router.push("/", undefined, { scroll: false })}
              src="/assets/white-logo.png"
              alt="StripRadar logo"
              width={130}
              height={50}
              style={{ cursor: "pointer" }}
            />

            <BurgerMenu />
          </div>
        </Header>
      }
    >
      <Affix position={{ top: 80, left: 15 }}>
        <Transition transition="slide-down" mounted={router.route !== "/"}>
          {(transitionStyles) => (
            <ActionIcon
              style={transitionStyles}
              variant="light"
              onClick={() => router.back()}
            >
              <IconArrowLeft size={16} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
      {children}

      <Affix position={{ bottom: 40, right: 20 }} variant="light">
        <Transition transition="slide-up" mounted={scrollPosition.y > 550}>
          {(transitionStyles) => (
            <IconArrowUp
              size={20}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            />
          )}
        </Transition>
      </Affix>
    </AppShell>
  );
};
