import Edit from "../../../../src/components/AdminPage/EditPageFields/Edit";
import {
  useDeleteEventMutation,
  useGetEventByIdQuery,
  useAddNewEventMutation,
} from "../../../../src/features/event/eventSlice";
import { useRouter } from "next/router";
import Loading from "../../../../src/utils/Loading/Loading";

const EditEventPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError, error } = useGetEventByIdQuery(id);

  const [removeItem, { isLoading: isDeleting, error: deletingError }] =
    useDeleteEventMutation();

  const [saveItem, { isLoading: isSaving, error: savingError }] =
    useAddNewEventMutation();

  if (isDeleting) return <p>Deleting....</p>;
  if (isLoading) return <Loading />;
  if (isError || !id || deletingError)
    return <p>Error check console : {console.log({ error, deletingError })}</p>;

  return <Edit data={data} onDelete={removeItem} onSave={saveItem} />;
};

export default EditEventPage;
