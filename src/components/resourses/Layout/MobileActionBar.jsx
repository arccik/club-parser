import { Affix, Group, Paper } from "@mantine/core";

const MobileActionBar = ({ children }) => {
  return (
    <Affix position={{ bottom: 12, left: 12, right: 12 }} zIndex={90}>
      <Paper
        p="xs"
        radius="md"
        withBorder
        sx={(theme) => ({
          backdropFilter: "blur(8px)",
          background:
            theme.colorScheme === "dark"
              ? "rgba(14, 18, 27, 0.9)"
              : "rgba(255, 255, 255, 0.92)",
          [theme.fn.largerThan("sm")]: {
            display: "none",
          },
        })}
      >
        <Group grow>{children}</Group>
      </Paper>
    </Affix>
  );
};

export default MobileActionBar;
