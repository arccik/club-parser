import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";
import AppContainer from "../../../src/components/AdminPage/AppContainer/AppContainer";
import { useGetVenuesQuery } from "../../../src/features/venue/venueSlice";
const EditEventPage = () => {
  const { data, isLoading, error } = useGetVenuesQuery();
  if (isLoading) return <p>Loading...</p>;

  return (
    <AppContainer>
      <TableScrollArea data={data} link="venues" />
    </AppContainer>
  );
};

export default EditEventPage;
