import { Text, Group, Button } from "@mantine/core";
import useCurrentLocation from "../../../Hooks/useCurrentLocaiton";

const SortButtons = ({ placeType, setValue }) => {
  const { location } = useCurrentLocation();
  const eventLabels = ["Price", "StartDate", "Distance"];
  if (!location) eventLabels.filter((v) => v !== "Distance");
  const eventButtons = eventLabels.map((label) => (
    <Button
      key={label}
      onClick={() => setValue(label.toLocaleLowerCase())}
      size="xs"
      variant="light"
    >
      {label}
    </Button>
  ));
  const venueButtons = ["Name", "Distance"].map((label) => (
    <Button
      key={label}
      onClick={() => setValue(label.toLocaleLowerCase())}
      size="xs"
      variant="light"
    >
      {label}
    </Button>
  ));

  return (
    <Group spacing="xs">
      <Text size="sm" weight="bold">
        Sort By
      </Text>
      {placeType === "event" ? eventButtons : venueButtons}
    </Group>
  );
};

export default SortButtons;
