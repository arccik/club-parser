import { Loader, SegmentedControl } from "@mantine/core";
import useStyles from "./styles";

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
        { label: "Clubs", value: "venues" },
        { label: "Events", value: "events" },
      ]}
      classNames={classes}
    />
  );
}
