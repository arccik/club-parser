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
import EventPageCard from "../../EventsPage/EventPageCard";
import FooterSocial from "../../HomePage/Footer/Footer";

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

          {type === "event" ? (
            <>
              <Button
                onClick={() => setSortValue("price")}
                size="xs"
                variant="light"
              >
                Price
              </Button>
              <Button
                onClick={() => {
                  setPage(1);
                  setSortValue("startdate");
                }}
                size="xs"
                variant="light"
              >
                Date
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setSortValue("name")}
              size="xs"
              variant="light"
            >
              Name
            </Button>
          )}
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
          onChange={(e) => {
            setPage(e);
            window.scrollTo(0, 0);
          }}
          total={numberOfPages}
        />
      </Container>
      <FooterSocial />
    </>
  );
};

export default CardWithPaginationSort;
