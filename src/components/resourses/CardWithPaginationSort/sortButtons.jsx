import { Text, Group, SegmentedControl } from "@mantine/core";
import useCurrentLocation from "../../../Hooks/useCurrentLocaiton";
import { useState } from "react";

const SortButtons = ({ placeType, setValue }) => {
  const [selectValue, setSelectValue] = useState("startdate");
  const { location, getLocation } = useCurrentLocation();

  const handleSelect = (event) => {
    setSelectValue(event);
    if (event === "distance" && !location) getLocation();
    setValue(event);
  };

  const EventButtons = () => (
    <>
      <SegmentedControl
        id="sort"
        value={selectValue}
        onChange={handleSelect}
        defaultValue="Start Date"
        data={[
          { label: "Price", value: "price" },
          { label: "Start Date", value: "startdate" },
          { label: "Distance", value: "distance" },
        ]}
      />
    </>
  );
  const VenueButtons = () => (
    <>
      <SegmentedControl
        id="sort"
        value={selectValue}
        onChange={handleSelect}
        data={[
          { label: "Name", value: "name" },
          { label: "Distance", value: "Distance" },
        ]}
      />
    </>
  );

  return (
    <Group spacing="xs">
      <Text component="label" size="sm" weight={500}>
        Sort By
      </Text>
      {placeType === "event" ? <EventButtons /> : <VenueButtons />}
    </Group>
  );
};

export default SortButtons;
