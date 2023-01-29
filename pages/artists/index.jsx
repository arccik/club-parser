import { LoadingOverlay, Text, Pagination } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState, useEffect } from "react";
import {
  useGetVenuesQuery,
  useGetSortedVenuesQuery,
} from "../../src/features/venue/venueSlice";
import CardWithPaginationSort from "../../src/components/resourses/CardWithPaginationSort/CardWithPaginationSort";
import useCurrentLocation from "../../src/Hooks/useCurrentLocaiton";
import { useRouter } from "next/router";
import FooterSocial from "../../src/components/resourses/Footer/Footer";

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

const AdminVenuePage = () => {
  const [activePage, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("");
  const { location, getLocation } = useCurrentLocation();
  const router = useRouter();
  const { data, isLoading, error } = useGetVenuesQuery(activePage, {
    skip: sortValue,
  });

  const {
    data: sortedData,
    isLoading: isSortedLoading,
    error: sortedError,
  } = useGetSortedVenuesQuery(
    { sortValue, activePage, location },
    { skip: !sortValue }
  );

  const handlePagination = (value) => {
    setPage(Number(value));
    router.push(`?page=${value}`);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (router.query.page && router.query.page !== activePage) {
      setPage(router.query.page);
    }
    if (sortValue === "distance" && !location) getLocation();
  }, [router.query.page, sortValue]);

  if (error || sortedError) {
    return <Text align="center">Ops. something went wrong </Text>;
  }
  if (isLoading || isSortedLoading || sortedError) return <Loading />;

  return (
    <>
      <LoadingOverlay visible={isLoading || isSortedLoading} overlayBlur={2} />

      <CardWithPaginationSort
        data={sortedData?.venues || data?.venues}
        setPage={handlePagination}
        setSortValue={setSortValue}
        title="Artists"
        type="venue"
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

export default AdminVenuePage;
