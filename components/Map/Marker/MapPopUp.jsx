import { useRouter } from "next/router";
import { Card, Image, Text, Group, Badge, Button } from "@mantine/core";

const MapPopUp = (props) => {
  const { image, name, description, _id, open, close } = props.data;
  const router = useRouter();

  const isOpen = (from, to) => {
    return new Date().toLocaleTimeString() >= from &&
      new Date().toLocaleTimeString() <= to
      ? "Open"
      : "Close";
  };
  return (
    <>
      <Card shadow="sm" radius="md" withBorder>
        <Card.Section>
          <Image src={image} height={160} alt="Norway" />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{name}</Text>
          <Badge color="pink" variant="light">
            {isOpen(open, close)}
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          {description}
        </Text>
        <Button
          onClick={() => router.push(`/details/events/${_id}`)}
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
