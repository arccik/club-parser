import { Grid, Text, Group } from "@mantine/core";
import { IconCash } from "@tabler/icons";
import displayPrice from "../../../utils/displayPrice";

const Price = ({ price }) => {
  if (!price) return null;
  return (
    <Text size="xs">
      <Group spacing={5}>
        <IconCash size={14} />
        {displayPrice(price)}
      </Group>
    </Text>
  );
};

export default Price;
