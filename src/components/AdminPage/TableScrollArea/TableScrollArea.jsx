import { useState } from "react";
import {
  Table,
  ScrollArea,
  ActionIcon,
  Card,
  Group,
  Stack,
  Text,
  Badge,
  TextInput,
  SimpleGrid,
} from "@mantine/core";
import Link from "next/link";
import { IconTrashX, IconSearch } from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";

import useStyles from "./styles";
import { useDeleteEventMutation } from "../../../features/event/eventSlice";

const TableScrollArea = ({ data, type = "events" }) => {
  const { classes, cx, theme } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [deleteItem] = useDeleteEventMutation();
  const normalizedData = data || [];
  const filteredData = normalizedData.filter((row) => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return true;
    const name = row.name?.toLowerCase() || "";
    const location =
      row.formatted_address?.toLowerCase() || row.address?.toLowerCase() || "";
    return name.includes(query) || location.includes(query);
  });

  const rows = filteredData.map((row) => (
    <tr key={row._id}>
      <td style={{ minWidth: 280 }}>
        <Stack spacing={2}>
          <Text
            component={Link}
            href={`${type}/edit/${row._id}`}
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 600,
            }}
          >
            {row.name}
          </Text>
          <Text size="xs" color="dimmed" lineClamp={1}>
            {row.formatted_address || row.address || "Address unavailable"}
          </Text>
        </Stack>
      </td>
      {!mobile && (
        <td style={{ minWidth: 160 }}>
          <Badge variant="light">
            {row.startdate?.split("T")[0] || row.open || "Not set"}
          </Badge>
        </td>
      )}
      {!mobile && (
        <td style={{ width: 90 }}>
          <ActionIcon title="Delete item" onClick={() => deleteItem(row._id)}>
            <IconTrashX />
          </ActionIcon>
        </td>
      )}
    </tr>
  ));

  return (
    <Stack spacing="md" sx={{ minWidth: 0 }}>
      <TextInput
        icon={<IconSearch size={16} />}
        placeholder={`Search ${type} by name or address`}
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
      />

      {mobile ? (
        <SimpleGrid cols={1} spacing="sm">
          {filteredData.map((row) => (
            <Card key={row._id} p="md" withBorder>
              <Group position="apart" align="flex-start" noWrap>
                <Stack spacing={4} sx={{ minWidth: 0 }}>
                  <Text
                    component={Link}
                    href={`${type}/edit/${row._id}`}
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: 600,
                    }}
                    lineClamp={1}
                  >
                    {row.name}
                  </Text>
                  <Text size="xs" color="dimmed" lineClamp={2}>
                    {row.formatted_address || row.address || "Address unavailable"}
                  </Text>
                  <Badge variant="light" w="fit-content">
                    {row.startdate?.split("T")[0] || row.open || "Not set"}
                  </Badge>
                </Stack>
                <ActionIcon title="Delete item" onClick={() => deleteItem(row._id)}>
                  <IconTrashX />
                </ActionIcon>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <ScrollArea
          className="table-scroll-local"
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table
            striped
            withBorder
            highlightOnHover
            withColumnBorders
            sx={{ minWidth: 680 }}
          >
            <thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      )}
      {!filteredData.length ? (
        <Card p="lg" withBorder>
          <Text align="center" color="dimmed">
            No items match your current filter.
          </Text>
        </Card>
      ) : null}
    </Stack>
  );
};
export default TableScrollArea;
