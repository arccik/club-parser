import { Card, Image, Text, Group, RingProgress, Rating } from "@mantine/core";
import useStyles from "./styles";

export default function DetailsPage({ data }) {
  const { classes } = useStyles();
  return (
    <Card withBorder className={classes.card}>
      <Card.Section>
        <Image src={data.image} alt={data.name} height={400} />
      </Card.Section>

      <Group position="apart" mt="xl">
        <Text size="sm" weight={700} className={classes.title}>
          {data.name}
        </Text>
        <Group spacing={5}>
          <span>
            <Rating defaultValue={data.rating} />
          </span>
          <RingProgress size={18} sections={[{ value: 80, color: "blue" }]} />
        </Group>
      </Group>
      <Text mt="sm" mb="md" color="dimmed" size="xs">
        {data.description}
      </Text>
      <Card.Section className={classes.footer}>
        <div>
          <Text size="xs" color="dimmed">
            Distance
          </Text>
          <Text weight={500} size="sm">
            {data.distance}
          </Text>
        </div>
        <div>
          <Text size="xs" color="dimmed">
            Address
          </Text>
          <Text weight={500} size="sm">
            {data.formatted_address}
          </Text>
        </div>
      </Card.Section>
    </Card>
  );
}
