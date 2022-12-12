import { useState } from "react";
import { Table, ScrollArea } from "@mantine/core";
import Link from "next/link";
import { IconTrashX } from "@tabler/icons";

import useStyles from "./styles";
import Loading from "../../../utils/Loading/Loading";

export default function TableScrollArea({ data, type = "events" }) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
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
      <td>{row.startdate?.split("T")[0] || row.open}</td>
      <td>
        <IconTrashX />
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      sx={{ height: "100vh", mt: "lg" }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table
        sx={{ minWidth: 700 }}
        striped
        withBorder
        highlightOnHover
        withColumnBorders
      >
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
