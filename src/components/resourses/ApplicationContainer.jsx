import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  useMantineTheme,
  Image,
  Affix,
  Button,
  Transition,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { useRouter } from "next/router";

import BurgerMenu from "../AppHeader/BurgerMenu/BurgerMenu";

import { IconMapPin, IconArrowUp, IconArrowLeft } from "@tabler/icons";

export const ApplicationContainer = ({ children }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();
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
            <Image
              onClick={() => router.push("/", undefined, { scroll: false })}
              src="/assets/white-logo.png"
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
      <Affix position={{ top: 70, left: 15 }}>
        <Transition transition="slide-down" mounted={router.route !== "/"}>
          {(transitionStyles) => (
            <ActionIcon
              style={transitionStyles}
              variant="outline"
              onClick={() => router.back()}
            >
              <IconArrowLeft size={16} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
      {children}

      <Affix position={{ bottom: 40, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 550}>
          {(transitionStyles) => (
            <IconArrowUp
              size={16}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            />
            // <Button
            //   leftIcon={<IconArrowUp size={16} />}
            //   style={transitionStyles}
            //   color="dark"
            //   onClick={() => scrollTo({ y: 0 })}
            // >
            //   {/* Scroll to top */}
            // </Button>
          )}
        </Transition>
      </Affix>
    </AppShell>
  );
};
