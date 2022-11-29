import { useState } from "react";
import { createStyles, Table, ScrollArea, Group, Text } from "@mantine/core";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function TableSelection({ data }) {
  const router = useRouter();
  const rows = data.map((item) => {
    return (
      <tr key={item._id} onClick={() => router.push(`/editpage/${item._id}`)}>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
          </Group>
        </td>
        <td>{item.address}</td>
        <td>{`Open ${item.open} close ${item.close}`}</td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 900 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Venue name</th>
            <th>Address</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
