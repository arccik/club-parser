import Edit from "../../../../src/components/AdminPage/EditPageFields/Edit";
import {
  useDeleteEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../../../src/features/event/eventSlice";
import { useRouter } from "next/router";
import Loading from "../../../../src/utils/Loading/Loading";

const EditEventPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError, error } = useGetEventByIdQuery(id);

  const [removeItem, { isLoading: isDeleting, error: deletingError }] =
    useDeleteEventMutation();

  const [saveUpdatedItem, { isLoading: isSaving, error: savingError }] =
    useUpdateEventMutation();

  if (isSaving) return <p>Updates saving...</p>;
  if (isDeleting) return <p>Deleting....</p>;
  if (isLoading) return <Loading />;
  if (isError || !id || deletingError)
    return <p>Error check console : {console.log({ error, deletingError })}</p>;

  return <Edit data={data} onDelete={removeItem} onSave={saveUpdatedItem} />;
};

export default EditEventPage;
