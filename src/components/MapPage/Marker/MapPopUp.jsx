import { useRouter } from "next/router";
import { Card, Image, Text, Group, Badge, Button } from "@mantine/core";
import OpenCloseBadge from "../../../utils/OpenCloseBadge/OpenCloseBadge";

const MapPopUp = (props) => {
  const { image, name, description, _id, open, close, placeType, startdate } =
    props.data;
  const router = useRouter();
  return (
    <>
      <Card shadow="sm" radius="md" withBorder>
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

        <Text size="sm" color="dimmed">
          {description}
        </Text>
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
    </>
  );
};

export default MapPopUp;
