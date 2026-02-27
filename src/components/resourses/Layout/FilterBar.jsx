import { Card, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

const FilterBar = ({
  value,
  onChange,
  placeholder = "Search...",
  rightSlot,
  mobileStack = true,
}) => {
  return (
    <Card
      p="sm"
      sx={{
        border: "1px solid #2b3244",
        background: "#111522",
      }}
    >
      <Group
        spacing="sm"
        noWrap={!mobileStack}
        sx={(theme) => ({
          [theme.fn.smallerThan("sm")]: {
            flexDirection: mobileStack ? "column" : "row",
            alignItems: "stretch",
          },
        })}
      >
        <TextInput
          icon={<IconSearch size={16} />}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          sx={{ flex: 1, minWidth: 0 }}
        />
        {rightSlot || null}
      </Group>
    </Card>
  );
};

export default FilterBar;
