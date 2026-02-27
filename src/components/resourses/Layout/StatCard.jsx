import { Card, Group, Text, ThemeIcon } from "@mantine/core";

const StatCard = ({ icon, label, value, hint, color = "blue" }) => {
  return (
    <Card
      p="lg"
      sx={{
        background: "linear-gradient(160deg, #131723, #0f131d)",
        border: "1px solid #2b3244",
      }}
    >
      <Group position="apart" align="flex-start" noWrap={false} sx={{ rowGap: 8 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <Text size="xs" color="dimmed" sx={{ textTransform: "uppercase" }}>
            {label}
          </Text>
          <Text size="xl" weight={700} mt={4} sx={{ lineHeight: 1.2 }}>
            {value}
          </Text>
          {hint ? (
            <Text size="xs" color="dimmed" mt={6} sx={{ lineHeight: 1.35 }}>
              {hint}
            </Text>
          ) : null}
        </div>
        <ThemeIcon variant="light" color={color} size={38} radius="xl">
          {icon}
        </ThemeIcon>
      </Group>
    </Card>
  );
};

export default StatCard;
