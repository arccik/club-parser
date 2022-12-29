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
  ActionIcon,
  TextInput,
} from "@mantine/core";
import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const UniversalCards = ({ data, cardType }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filtredData, setFiltredData] = useState(data);

  const handleSearch = (value) => {
    setSearchValue(value);
    if (!value) {
      console.log("value empty", value);
      return setFiltredData(data);
    }
    const filterd = filtredData.filter((v) => {
      const re = new RegExp(`/${value}/`, "gi");
      return v.toString().match(re);
    });
    setFiltredData(filterd);
    console.log("Filtred Data: ", filterd);
  };
  // console.log("UniversalCards", data);
  const router = useRouter();
  if (!data.length)
    return (
      <>
        <Text align="center" m="lg">
          Nothing was found
        </Text>
        <Button fullWidth onClick={() => router.back()}>
          Back
        </Button>
      </>
    );
  return (
    <Container>
      <ActionIcon onClick={() => router.back()}>&#171;Back</ActionIcon>
      <Blockquote align="center">{cardType || "Event"}</Blockquote>
      <TextInput
        placeholder="Search.."
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {[...(filtredData || data)]?.map((place) => (
        <Card key={place._id} shadow="sm" p="lg" mt="lg" radius="md" withBorder>
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
          <Card.Section align="center">
            {place.startdate && (
              <Group position="center">
                <Badge size="sm">
                  {new Date(place.startdate).toUTCString().split("GMT")}
                </Badge>
                {place.price && (
                  <Badge size="sm">
                    Price
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
