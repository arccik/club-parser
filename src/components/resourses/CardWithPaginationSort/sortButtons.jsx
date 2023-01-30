import { Text, Group, SegmentedControl } from "@mantine/core";
import useCurrentLocation from "../../../Hooks/useCurrentLocaiton";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const SortButtons = ({ placeType, setValue }) => {
  const eventSortOptions = [
    { label: "Price", value: "price" },
    { label: "Start Date", value: "startdate" },
    { label: "Distance", value: "distance" },
  ];

  const router = useRouter();
  const [selectValue, setSelectValue] = useState("startdate");
  const { location, getLocation } = useCurrentLocation();

  useEffect(() => {
    const { sort } = router.query;

    if (sort) setSelectValue(String(sort));
    if (sort === "distance" && !location) getLocation();
    setValue(sort);
  }, [router.query]);

  const handleSelect = (event) => {
    setSelectValue(event);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort: event.toLowerCase(),
      },
    });
    // router.push(`?sort=${event.toLowerCase()}`);
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
        data={eventSortOptions}
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
          { label: "Distance", value: "distance" },
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
