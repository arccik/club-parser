import { AppShell, Footer, Group, Header, Text } from "@mantine/core";
import Navigation from "./Navigation/Navigation";

export const ApplicationContainer = ({ children }) => {
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
            <Text size="lg" weight="boldest">
              Next StripRadar
            </Text>
            <Navigation />
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
