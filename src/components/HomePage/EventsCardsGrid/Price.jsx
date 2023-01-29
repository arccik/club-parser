import { Grid, Text, Group } from "@mantine/core";
import { IconCash } from "@tabler/icons";
import displayPrice from "../../../utils/displayPrice";

const Price = ({ price }) => {
  if (!price) return null;
  return (
    <Grid.Col ml={1} span="content">
      <Text size="xs">
        <Group spacing={5}>
          <IconCash size={14} />
          {displayPrice(price)}
        </Group>
      </Text>
    </Grid.Col>
  );
};

export default Price;
