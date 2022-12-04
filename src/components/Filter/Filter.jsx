import { SegmentedControl, Container, Input } from "@mantine/core";

const Filter = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 70 }}>
      <SegmentedControl
        size="sm"
        data={[
          { label: "Club", value: "club" },
          { label: "Bar", value: "bar" },
          { label: "Events", value: "events" },
        ]}
      />
    </div>
  );
};

export default Filter;
