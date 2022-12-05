import { Group, Avatar, Text } from "@mantine/core";
import { forwardRef } from "react";
const AutoCompleteItem = () => {
  // eslint-disable-next-line react/display-name
  return forwardRef(({ description, value, image, id, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text>{value}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  ));
};

export default AutoCompleteItem;
