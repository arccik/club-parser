import {
  Container,
  Grid,
  Pagination,
  Text,
  Title,
  Divider,
  Group,
  Button,
} from "@mantine/core";
import EventPageCard from "../../../src/components/EventsPage/EventPageCard";
import FooterSocial from "../../../src/components/HomePage/Footer/Footer";

const CardWithPaginationSort = ({
  data,
  activePage,
  setPage,
  setSortValue,
  title,
  numberOfPages,
  type,
}) => {
  return (
    <>
      <Container size="md">
        <Title
          align="center"
          style={{
            position: "relative",

            zIndex: -1,
            fontSize: 100,
            WebkitTextStroke: "3px black",
            color: "white",
          }}
        >
          {title}
        </Title>
        <Group spacing="xs">
          <Text size="sm">Sort By</Text>
          <Button
            onClick={() => {
              setPage(1);

              type === "event"
                ? setSortValue("startdate")
                : setSortValue("date");
            }}
            size="xs"
            variant="light"
          >
            Date
          </Button>
          <Button
            onClick={() => {
              setPage(1);
              setSortValue("distance");
            }}
            size="xs"
            variant="light"
          >
            Distance
          </Button>
          {type === "event" && (
            <Button
              onClick={() => setSortValue("price")}
              size="xs"
              variant="light"
            >
              Price
            </Button>
          )}
        </Group>
        <Divider mt="sm" />
        <Grid mt="lg">
          {data.map((event) => (
            <Grid.Col key={event._id} lg={4} xs={6}>
              <EventPageCard event={event} />
            </Grid.Col>
          ))}
        </Grid>
        <Pagination
          position="center"
          m="lg"
          noWrap
          styles={(theme) => ({
            item: {
              "&[data-active]": {
                backgroundImage: theme.fn.gradient({
                  from: "red",
                  to: "yellow",
                }),
              },
            },
          })}
          page={activePage}
          onChange={setPage}
          total={numberOfPages}
        />
      </Container>
      <FooterSocial />
    </>
  );
};

export default CardWithPaginationSort;
