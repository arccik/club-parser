import { useState } from "react";
import { Table, ScrollArea, ActionIcon, Checkbox } from "@mantine/core";
import Link from "next/link";
import { IconTrashX, IconThumbUp, CheckboxIcon } from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";

import useStyles from "./styles";
import { useDeleteEventMutation } from "../../../features/event/eventSlice";
// import { useRecommendEventMutation } from "../../../features/admin/adminSlice";

const TableScrollArea = ({ data, type = "events" }) => {
  const { classes, cx, theme } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [scrolled, setScrolled] = useState(false);
  const [deleteItem] = useDeleteEventMutation();
  // const [recommendItem] = useRecommendEventMutation();

  // const handleRecommendation = (event) => {
  //   console.log("Recommended : ", event.target.checked);
  // };

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
        <>
          <td>
            <ActionIcon
              title="Delete event"
              onClick={() => deleteItem(row._id)}
            >
              <IconTrashX />
            </ActionIcon>
          </td>
          {/* <td>
            <Checkbox
              checked={data.recommended}
              size="md"
              onChange={handleRecommendation}
            />
          </td> */}
        </>
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
            {/* {!mobile && <th>Recommend</th>} */}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};
export default TableScrollArea;