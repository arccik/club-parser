import { forwardRef } from "react";
import { Group, Avatar, Text } from "@mantine/core";

let i = 0;
// eslint-disable-next-line react/display-name
const AutoCompleteItem = forwardRef(
  ({ description, value, image, placeType, ...others }, ref) => {
    console.log("Auto complete : ", description);
    return (
      <div ref={ref} key={value + i++} {...others}>
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
    );
  }
);

export default AutoCompleteItem;
