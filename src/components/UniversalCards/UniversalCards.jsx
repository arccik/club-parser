import {
  Container,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Blockquote,
  ActionIcon,
  TextInput,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const UniversalCards = ({ data, cardType }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [filtredData, setFiltredData] = useState(data);

  const handleSearch = (value) => {
    setSearchValue(value);
    // if (!value) {
    //   return setFiltredData(data);
    // }
    const filterd = filtredData.filter((v) => {
      const re = new RegExp(`/${value}/`, "gi");
      return v.toString().match(re);
    });
    console.log("FIlterd Data ", filterd);
    setFiltredData(filterd);
  };

  return (
    <Container>
      {/* <TextInput
        placeholder="Search.."
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      /> */}
      <ActionIcon onClick={() => router.back()}>&#171;Back</ActionIcon>
      <Blockquote
        style={{
          padding: 10,
          margin: 10,
          boxShadow:
            "-1px 0 0 1px rgba(255, 203, 82, 0.75), -1px -1px 0 1px rgba(255, 170, 70, 0.25), -1px 1px 0 1px rgba(255, 170, 70, 0.25), 0 -1px 0 1px rgba(255, 136, 57, 0.5), 0 1px 0 1px rgba(255, 136, 57, 0.5), 1px -1px 0 1px rgba(255, 103, 44, 0.25), 1px 1px 0 1px rgba(255, 103, 44, 0.25), 1px 0 0 1px rgba(255, 69, 31, 0.75)",
        }}
        align="center"
      >
        {cardType || router.query.type || "Event"}
      </Blockquote>
      {data?.map((place) => (
        <Card key={place._id} shadow="sm" p="lg" mt="lg" radius="md" withBorder>
          <Card.Section
            component={Link}
            href={`/details/${place.placeType}s/${place._id}`}
          >
            <Image src={place.image} height={160} alt={place.name} />
          </Card.Section>

          <Stack mt="sm" mb="xs" spacing={0}>
            <Text weight={500} m={0} p={0}>
              {place.placeType.toUpperCase()}: {place.name}
            </Text>
            <Text size="sm" color="dimmed">
              {place.formatted_address || place.address}
            </Text>
          </Stack>

          <Card.Section align="center">
            {place.startdate && (
              <Group position="center">
                <Badge size="lg">
                  {new Date(place.startdate).toUTCString().split("GMT")}
                </Badge>
                {place.price && (
                  <Badge size="sm">
                    Price{" "}
                    {place.price.includes("£")
                      ? place.price
                      : " £ " + place.price}
                  </Badge>
                )}
              </Group>
            )}
          </Card.Section>
          <Text size="sm" m="md" color="dimmed">
            {place.description}
          </Text>
          {place.genres?.map((genre) => (
            <Badge key={genre} color="pink" variant="light">
              {genre}
            </Badge>
          ))}

          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            component={Link}
            href={`/details/${place.placeType}s/${place._id}`}
          >
            Check this out
          </Button>
        </Card>
      ))}
    </Container>
  );
};

export default UniversalCards;
