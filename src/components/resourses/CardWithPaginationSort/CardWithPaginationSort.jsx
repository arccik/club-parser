import { Container, Grid, Divider } from "@mantine/core";
import ItemCard from "./ItemCard/ItemCard";
import SectionHeader from "../Layout/SectionHeader";
import EmptyState from "../Layout/EmptyState";

const CardWithPaginationSort = ({
  data,
  setSortValue,
  title,
  type,
  setPage,
}) => {
  return (
    <Container size="xl" sx={{ paddingTop: 12, paddingBottom: 36 }}>
      <SectionHeader
        eyebrow="Collection"
        title={title || "Browse listings"}
        description="Explore cards with improved readability on both mobile and desktop."
      />
      <Divider mt="sm" />
      {data?.length ? (
        <Grid mt="lg">
          {data.map((item) => (
            <Grid.Col key={item._id} lg={4} sm={6} xs={12}>
              <ItemCard data={item} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <EmptyState
          title="Nothing to display"
          description="Try a different filter or come back later for new content."
        />
      )}
    </Container>
  );
};

export default CardWithPaginationSort;
