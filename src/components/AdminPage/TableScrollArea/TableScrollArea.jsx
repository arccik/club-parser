import { useState } from "react";
import { Table, ScrollArea, ActionIcon } from "@mantine/core";
import Link from "next/link";
import { IconTrashX } from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";

import useStyles from "./styles";
import { useDeleteEventMutation } from "../../../features/event/eventSlice";

const TableScrollArea = ({ data, type = "events" }) => {
  const { classes, cx, theme } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [scrolled, setScrolled] = useState(false);
  const [deleteItem] = useDeleteEventMutation();

  const rows = data?.map((row) => (
    <tr key={row._id}>
      <td>
        <Link
          href={`${type}/edit/${row._id}`}
          style={{ textDecoration: "none", color: "currentcolor" }}
        >
          {row.name}
        </Link>
      </td>
      {!mobile && <td>{row.startdate?.split("T")[0] || row.open}</td>}
      {!mobile && (
        <td>
          <ActionIcon title="Add new Event" onClick={() => deleteItem(row._id)}>
            <IconTrashX />
          </ActionIcon>
        </td>
      )}
    </tr>
  ));

  return (
    <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table striped withBorder highlightOnHover withColumnBorders>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            {!mobile && <th>Date</th>}
            {!mobile && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
export default TableScrollArea;