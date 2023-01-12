import { Container, Grid, Pagination, Title, Divider } from "@mantine/core";
import EventPageCard from "../../EventsPage/EventPageCard";
import FooterSocial from "../../HomePage/Footer/Footer";
import SortButtons from "./sortButtons";
import useStyles from "./styles";

const CardWithPaginationSort = ({
  data,
  activePage,
  setPage,
  setSortValue,
  title,
  numberOfPages,
  type,
}) => {
  const { classes } = useStyles();

  const handleSort = (value) => {
    setSortValue(value);
    setPage(1);
  };
  return (
    <>
      <Container size="md">
        <Title align="center" className={classes.title}>
          {title}
        </Title>
        <SortButtons setValue={handleSort} placeType={type} />
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
          className={classes.item}
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
