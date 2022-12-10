import EditEvent from "../../../../src/components/AdminPage/EditPageFields/EditPage";
import {
  useGetVenueByIdQuery,
  useDeleteVenueMutation,
} from "../../../../src/features/venue/venueSlice";
import { useRouter } from "next/router";
import AppContainer from "../../../../src/components/AdminPage/AppContainer/AppContainer";

const EditEventPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: venue, isLoading, isError, error } = useGetVenueByIdQuery(id);

  const [removeItem, { isLoading: isDeleting, error: deletingError }] =
    useDeleteVenueMutation();

  if (isDeleting) return <p>Deleting...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError || !id)
    return (
      <p>
        Problem on the server: {error.data.message}
        {console.log({ error })}
      </p>
    );

  return (
    <AppContainer>
      <EditEvent data={venue} onDelete={removeItem} />
    </AppContainer>
  );
};

export default EditEventPage;
