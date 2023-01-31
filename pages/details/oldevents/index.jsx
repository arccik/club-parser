import { Title, Pagination, Center } from "@mantine/core";
import { useGetOldEventsQuery } from "../../../src/features/event/eventSlice";
import Loading from "../../../src/utils/Loading/Loading";
import PlacesCardsGrid from "../../../src/components/HomePage/EventsCardsGrid/EventsCardsGrid";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FooterSocial from "../../../src/components/resourses/Footer/Footer";

const OldEventsPage = () => {
  const [activePage, setPage] = useState(1);
  const router = useRouter();

  const { data, isLoading, isError, error } = useGetOldEventsQuery(activePage);

  const handlePagination = (value) => {
    setPage(Number(value));
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: value,
      },
    });
    window.scrollTo(0, 0);
  };
  useEffect(() => {

    if (router.query.page && router.query.page !== activePage) {
      handlePagination(router.query.page);
    }
  }, [router.query.page]);

  if (isLoading) return <Loading />;
  if (isError)
    return <p>Error with this service. Check console {console.log(error)}</p>;

  const titleStyle = {
    WebkitTextStroke: "3px black",
    color: "white",
  };
  return (
    <>
      <Title align="center" style={titleStyle}>
        Events Recently Ended
      </Title>
      <PlacesCardsGrid events={data.events} type="events" old={true} />;
      {/* <Center> */}
      <Pagination
        page={activePage}
        onChange={handlePagination}
        total={data.numberOfPages}
        position="center"
        noWrap
      />
      <FooterSocial />
      {/* </Center> */};
    </>
  );
};

export default OldEventsPage;
