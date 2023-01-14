import { Table, Group, Text, ScrollArea } from "@mantine/core";
import {
  useGetMessagesQuery,
  useReadMessageMutation,
} from "../../../../features/admin/adminSlice";
import Loading from "../../../../utils/Loading/Loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IconX } from "@tabler/icons";
dayjs.extend(relativeTime);

const MessageTable = () => {
  const { data, isLoading, error } = useGetMessagesQuery();
  const [markAsRead] = useReadMessageMutation();
  if (isLoading) return <Loading />;
  if (error) return <Text>Problem with messages</Text>;

  const handleMessageRead = async (id) => {
    const response = await markAsRead(id);
    console.log("Message marked as read", response);
  };

  const rows = data.map((item) => (
    <>
      <tr key={item.name}>
        <td>
          <Group spacing="sm">
            <div>
              <Text size="sm" weight={500}>
                {item.name}
              </Text>
              <Text color="dimmed" size="xs">
                {item.email}
              </Text>
            </div>
          </Group>
        </td>
        <td>
          <Text size="xs" color="dimmed">
            {item.subject}
          </Text>
          <Text size="sm">{item.message}</Text>
        </td>
        <td>
          <Text size="sm">{dayjs(item.createdAt).fromNow()}</Text>
          <Text size="xs" color="dimmed">
            Received
          </Text>
        </td>
        <td>
          <Text size="xs" color="dimmed">
            <IconX onClick={() => handleMessageRead(item._id)} />
          </Text>
        </td>
      </tr>
    </>
  ));

  return (
    <>
      <ScrollArea>
        <Table sx={{ minWidth: 600 }} verticalSpacing="md">
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
};
export default MessageTable;
