import { Title, Pagination } from "@mantine/core";
import { useGetOldEventsQuery } from "../../../src/features/event/eventSlice";
import Loading from "../../../src/utils/Loading/Loading";
import PlacesCardsGrid from "../../../src/components/HomePage/EventsCardsGrid/EventsCardsGrid";
import { useState } from "react";

const OldEventsPage = () => {
  const [activePage, setPage] = useState(1);

  const { data, isLoading, isError, error } = useGetOldEventsQuery(activePage);
  if (isLoading) return <Loading />;
  if (isError)
    return <p>Error with this service. Check console {console.log(error)}</p>;
  return (
    <>
      <Title align="center" color="dimmed">
        Events Ended Recently
      </Title>
      <PlacesCardsGrid events={data.events} type="events" old={true} />;
      <Pagination
        page={activePage}
        onChange={setPage}
        total={data.numberOfPages}
      />
      ;
    </>
  );
};

export default OldEventsPage;
