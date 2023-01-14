import { Group, ActionIcon, Menu } from "@mantine/core";
import {
  IconPencil,
  IconMessages,
  IconNote,
  IconReportAnalytics,
  IconTrash,
  IconDots,
} from "@tabler/icons";

const DropdownMenu = () => {
  return (
    <Group spacing={0} position="right">
      <ActionIcon>
        <IconPencil size={16} stroke={1.5} />
      </ActionIcon>
      <Menu transition="pop" withArrow position="bottom-end">
        <Menu.Target>
          <ActionIcon>
            <IconDots size={16} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconMessages size={16} stroke={1.5} />}>
            Send message
          </Menu.Item>
          <Menu.Item icon={<IconNote size={16} stroke={1.5} />}>
            Add note
          </Menu.Item>
          <Menu.Item icon={<IconReportAnalytics size={16} stroke={1.5} />}>
            Analytics
          </Menu.Item>
          <Menu.Item icon={<IconTrash size={16} stroke={1.5} />} color="red">
            Terminate contract
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default DropdownMenu;
