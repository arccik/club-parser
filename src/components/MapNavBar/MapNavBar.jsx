import { Loader, SegmentedControl } from "@mantine/core";
import useStyles from "./styles";
import { useState } from "react";

export default function MapNavBar({ handleClick }) {
  const { classes } = useStyles();

  const onSelectHandle = (event) => {
    if (event.target.value) {
      handleClick(event.target.value);
    }
  };

  return (
    <SegmentedControl
      radius="xl"
      size="md"
      onLoad={(e) => <Loader />}
      onClick={onSelectHandle}
      defaultValue={"venues"}
      data={[
        { label: "All", value: "all" },
        { label: "Clubs", value: "venues" },
        // { label: "Bars", value: "bars" },
        { label: "Events", value: "events" },
      ]}
      classNames={classes}
    />
  );
}
