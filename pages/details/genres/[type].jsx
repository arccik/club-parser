import {
  Container,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
  Blockquote,
} from "@mantine/core";
import { useGetByGenresQuery } from "../../../src/features/both/bothSlice";
import { useRouter } from "next/router";
import Loading from "../../../src/utils/Loading/Loading";
import Link from "next/link";

const GenresPage = (props) => {
  const router = useRouter();
  const { type } = router.query;

  const { data, isLoading, error } = useGetByGenresQuery(type, {
    skip: !type,
  });
  console.log("GenresPage DATA", data);
  if (isLoading) return <Loading />;
  if (error) return <p>Could not load data</p>;
  return (
    <Container>
      <Blockquote cite="– StripRadar" align="center">
        {type}
      </Blockquote>
      {/* <Title m="lg" align="center" order={4}>
        &apos;{type}&apos;
      </Title> */}
      {data?.map((place) => (
        <Card key={place._id} shadow="sm" p="lg" m="lg" radius="md" withBorder>
          <Card.Section
            component={Link}
            href={`/details/${place.placeType}s/${place._id}`}
          >
            <Image src={place.image} height={160} alt={place.name} />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>
              {place.placeType.toUpperCase()}: {place.name}
            </Text>
          </Group>
          {place.genres?.map((genre) => (
            <Badge key={genre} color="pink" variant="light">
              {genre}
            </Badge>
          ))}
          <Text size="sm" m="md" color="dimmed">
            {place.description}
          </Text>

          {/* <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Check this out
          </Button> */}
        </Card>
      ))}
    </Container>
  );
};

export default GenresPage;
