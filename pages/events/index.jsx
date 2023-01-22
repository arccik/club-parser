import { LoadingOverlay, Text, Pagination } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState, useEffect } from "react";
import {
  useGetEventsQuery,
  useGetSortedEventsQuery,
} from "../../src/features/event/eventSlice";
import CardWithPaginationSort from "../../src/components/resourses/CardWithPaginationSort/CardWithPaginationSort";
import useCurrentLocation from "../../src/Hooks/useCurrentLocaiton";
import { useRouter } from "next/router";
import FooterSocial from "../../src/components/resourses/Footer/Footer";

const EventsPage = () => {
  const { location, getLocation } = useCurrentLocation();
  const [activePage, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("");
  const router = useRouter();
  const { data, isLoading, error } = useGetEventsQuery(activePage, {
    skip: sortValue,
  });
  const {
    data: sortedData,
    isLoading: isSortedLoading,
    error: sortedError,
  } = useGetSortedEventsQuery(
    { sortValue, activePage, location },
    { skip: !sortValue }
  );
  const handlePagination = (value) => {
    setPage(Number(value));
    router.push(`?page=${value}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (router.query.page) setPage(router.query.page);
    if (sortValue === "distance" && !location) getLocation();
  }, [router.query.page, sortValue]);

  if (error || sortedError) {
    return <Text align="center">Ops. something went wrong </Text>;
  }
  if (isLoading || isSortedLoading || sortedError) return <Loading />;
  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <CardWithPaginationSort
        data={sortedData?.events || data?.events}
        setSortValue={setSortValue}
        title="Event"
        type="event"
        setPage={setPage}
      />
      <Pagination
        position="center"
        m="lg"
        noWrap
        initialPage={activePage}
        page={Number(activePage)}
        onChange={handlePagination}
        total={sortedData?.numberOfPages || data?.numberOfPages}
      />
      <FooterSocial />
    </>
  );
};

// export async function getStaticProps({ params }) {
//   try {
//     await dbConnect();
//     const data = await Venue.findById(params.id);
//     const venue = JSON.parse(JSON.stringify(data));
//     return { props: { venue }, revalidate: 30 };
//   } catch (error) {
//     console.error("Static Generation Error", error);
//   }
// }

// export async function getStaticPaths() {
//   await dbConnect();
//   const venues = await Venue.find().distinct("_id");
//   const paths = venues.map((venue) => ({
//     params: { id: venue._id.toString() },
//   }));
//   return { paths, fallback: false };
// }

export default EventsPage;
