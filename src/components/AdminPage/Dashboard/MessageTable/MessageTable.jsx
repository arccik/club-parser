import {
  Table,
  Group,
  Text,
  ScrollArea,
  ActionIcon,
  Card,
  Stack,
  SimpleGrid,
} from "@mantine/core";
import {
  useGetMessagesQuery,
  useReadMessageMutation,
} from "../../../../features/admin/adminSlice";
import Loading from "../../../../utils/Loading/Loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconX } from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";
dayjs.extend(relativeTime);

const MessageTable = () => {
  const { data, isLoading, error } = useGetMessagesQuery();
  const [markAsRead] = useReadMessageMutation();
  const isMobile = useMediaQuery("(max-width: 48em)");
  if (isLoading) return <Loading />;
  if (error) return <Text>Problem with messages</Text>;

  const handleMessageRead = async (id) => {
    const response = await markAsRead(id);
    console.log("Message marked as read", response);
  };

  const rows = data.map((item) => (
    <tr key={item._id}>
      <td style={{ minWidth: 220 }}>
        <Text size="sm" weight={600}>
          {item.name}
        </Text>
        <Text color="dimmed" size="xs">
          {item.email}
        </Text>
      </td>
      <td style={{ minWidth: 280 }}>
        <Text size="xs" color="dimmed">
          {item.subject}
        </Text>
        <Text size="sm" lineClamp={2}>
          {item.message}
        </Text>
      </td>
      <td style={{ minWidth: 120 }}>
        <Text size="sm">{dayjs(item.createdAt).fromNow()}</Text>
        <Text size="xs" color="dimmed">
          Received
        </Text>
      </td>
      <td style={{ width: 80 }}>
        <ActionIcon color="red" variant="light" onClick={() => handleMessageRead(item._id)}>
          <IconX size={16} />
        </ActionIcon>
      </td>
    </tr>
  ));

  if (isMobile) {
    return (
      <SimpleGrid cols={1} spacing="sm">
        {data.map((item) => (
          <Card key={item._id} withBorder p="md">
            <Stack spacing={8}>
              <Group position="apart" align="flex-start" noWrap>
                <div>
                  <Text weight={600} size="sm">
                    {item.name}
                  </Text>
                  <Text size="xs" color="dimmed">
                    {item.email}
                  </Text>
                </div>
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => handleMessageRead(item._id)}
                >
                  <IconX size={16} />
                </ActionIcon>
              </Group>
              <div>
                <Text size="xs" color="dimmed">
                  {item.subject}
                </Text>
                <Text size="sm" lineClamp={4}>
                  {item.message}
                </Text>
              </div>
              <Text size="xs" color="dimmed">
                {dayjs(item.createdAt).fromNow()}
              </Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  return (
    <ScrollArea className="table-scroll-local">
      <Table sx={{ minWidth: 760 }} verticalSpacing="md" withBorder highlightOnHover>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
export default MessageTable;
