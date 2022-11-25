import { SegmentedControl, Container, Input } from "@mantine/core";

const Filter = () => {
  return (
    <SegmentedControl
      size="lg"
      data={[
        { label: "Club", value: "Club" },
        { label: "Bar", value: "Bar" },
        { label: "Events", value: "Events" },
      ]}
    />
  );
};

export default Filter;
