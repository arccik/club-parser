import { Container, Grid, Pagination, Title, Divider } from "@mantine/core";
import EventPageCard from "../../EventsPage/EventPageCard";
import SortButtons from "./sortButtons";
import useStyles from "./styles";

const CardWithPaginationSort = ({
  data,
  setSortValue,
  title,
  type,
  setPage,
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
          {data?.map((event) => (
            <Grid.Col key={event._id} lg={4} xs={6}>
              <EventPageCard event={event} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CardWithPaginationSort;
