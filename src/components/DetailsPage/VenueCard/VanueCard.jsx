import { createStyles, Card, Text, Group, Loader, Title } from "@mantine/core";
import Image from "next/image";
import { IconHome } from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

const VenueCard = ({ venue }) => {
  const { classes } = useStyles();
  if (!venue) return <Loader />;
  return (
    <>
      <Title mt="lg" mb="sm" size="md">
        Venue
      </Title>
      <Card
        withBorder
        radius="md"
        p={0}
        className={classes.card}
        component={Link}
        href={`/details/venues/${venue._id}`}
      >
        <Group noWrap spacing={0}>
          {venue.image && (
            <Image
              src={venue.image}
              blurDataURL="/assets/blur.jpg"
              placeholder="blur"
              height={100}
              width={100}
              alt={venue.name}
            />
          )}
          <div className={classes.body}>
            <Text className={classes.title} mt="xs" mb="md">
              {venue.name}
            </Text>
            <Group noWrap spacing="xs">
              <Group spacing="xs" noWrap>
                <IconHome />
                <Text size="xs">
                  {venue.address}, {venue.postcode}
                </Text>
              </Group>
            </Group>
          </div>
        </Group>
      </Card>
    </>
  );
};
export default VenueCard;
