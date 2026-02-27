import { Card, Stack, Title, Text } from "@mantine/core";

const EmptyState = ({ title = "Nothing found", description, action }) => {
  return (
    <Card
      p="xl"
      sx={{
        border: "1px dashed #2b3244",
        background: "#10131e",
      }}
    >
      <Stack spacing="xs" align="center">
        <Title order={4}>{title}</Title>
        {description ? (
          <Text color="dimmed" align="center" sx={{ maxWidth: 500 }}>
            {description}
          </Text>
        ) : null}
        {action || null}
      </Stack>
    </Card>
  );
};

export default EmptyState;
