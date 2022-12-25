import { Title } from "@mantine/core";
import { useGetOldEventsQuery } from "../../../src/features/event/eventSlice";
import Loading from "../../../src/utils/Loading/Loading";
import PlacesCardsGrid from "../../../src/components/HomePage/PlacesCardsGrid/PlacesCardsGrid";

const OldEventsPage = () => {
  const { data, isLoading, isError, error } = useGetOldEventsQuery();
  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p> There was an error on service check console {console.log(error)}</p>
    );
  return (
    <>
      <Title align="center" color="dimmed">
        Events Ended Recently
      </Title>
      <PlacesCardsGrid venues={data} type="events" />;
    </>
  );
};

export default OldEventsPage;
