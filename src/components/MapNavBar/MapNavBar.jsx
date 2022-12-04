import { SegmentedControl } from "@mantine/core";
import useStyles from "./styles";

export default function MapNavBar() {
  const { classes } = useStyles();

  return (
    <SegmentedControl
      radius="xl"
      size="md"
      onClick={(e) => {
        console.log("Segment clicked! ", e.target.value);
      }}
      data={[
        { label: "All", value: "all" },
        { label: "Clubs", value: "clubs" },
        { label: "Bars", value: "bars" },
        { label: "Events", value: "events" },
      ]}
      classNames={classes}
    />
  );
}
