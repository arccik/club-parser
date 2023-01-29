import { Badge, Group, Text } from "@mantine/core";

const DisplayEndDate = ({ enddate }) => {
  if (!(enddate < new Date())) return null;

  return (
    <Group position="apart" mt="md">
      <Badge color="pink">
        <Text size="xs" color="dimmed">
          Ended on
          <b> {dayjs(article.enddate).format("DD MMM YYYY")}</b>
        </Text>
      </Badge>
    </Group>
  );
};

export default DisplayEndDate;
