import { useRouter } from "next/router";
import { Card, Image, Text, Group, Badge, Button } from "@mantine/core";
import OpenCloseBadge from "../../../utils/OpenCloseBadge/OpenCloseBadge";

const MapPopUp = (props) => {
  const {
    image,
    name,
    description,
    _id,
    open,
    close,
    placeType,
    startdate,
    price,
  } = props.data;
  const router = useRouter();
  return (
    <Card shadow="sm" withBorder p="xs">
      <Card.Section>
        <Image
          src={image}
          height={200}
          fit="contain"
          alt={name}
          withPlaceholder
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{name}</Text>
        {open && close && <OpenCloseBadge from={open} to={close} />}
      </Group>

      <Text
        size="sm"
        color="dimmed"
        style={{
          display: "block",
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {description}
      </Text>
      {price && <Badge>Entry: {price}</Badge>}
      <Button
        onClick={() => router.push(`/details/${placeType}s/${_id}`)}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        Open
      </Button>
    </Card>
  );
};

export default MapPopUp;
