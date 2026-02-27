import { Group, Stack, Badge, Title, Text } from "@mantine/core";

const SectionHeader = ({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}) => {
  return (
    <Group position="apart" align="flex-end" noWrap={false}>
      <Stack spacing={6} sx={{ maxWidth: 760 }}>
        {eyebrow ? (
          <Badge
            variant="light"
            sx={{
              width: "fit-content",
              letterSpacing: 0.3,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </Badge>
        ) : null}
        <Title
          order={2}
          align={align}
          sx={{ lineHeight: 1.15, fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)" }}
        >
          {title}
        </Title>
        {description ? (
          <Text color="dimmed" sx={{ maxWidth: 620 }}>
            {description}
          </Text>
        ) : null}
      </Stack>
      {action || null}
    </Group>
  );
};

export default SectionHeader;
