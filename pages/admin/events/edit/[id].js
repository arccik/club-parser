import EditEvent from "../../../../src/components/AdminPage/EditPageFields/EditPage";
import {
  useDeleteEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../../../src/features/event/eventSlice";
import {} from "../../../../src/features/venue/venueSlice";
import { useRouter } from "next/router";
import AppContainer from "../../../../src/components/AdminPage/AppContainer/AppContainer";

const EditEventPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError, error } = useGetEventByIdQuery(id);

  const [removeItem, { isLoading: isDeleting, error: deletingError }] =
    useDeleteEventMutation();

  const [saveItem, { isLoading: isSaving, error: savingError }] =
    useUpdateEventMutation();

  if (isDeleting) return <p>Deleting....</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError || !id || deletingError)
    return <p>Error check console : {console.log({ error, deletingError })}</p>;

  return (
    <AppContainer>
      <EditEvent data={data} onDelete={removeItem} onSave={saveItem} />
    </AppContainer>
  );
};

export default EditEventPage;
