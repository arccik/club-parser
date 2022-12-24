import Edit from "../../../../src/components/AdminPage/EditPageFields/Edit";
import {
  useDeleteEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../../../src/features/event/eventSlice";
import { useRouter } from "next/router";
import Loading from "../../../../src/utils/Loading/Loading";
import { useUser } from "@auth0/nextjs-auth0/client";
import ErrorPage from "next/error";

const EditEventPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const { data, isLoading, isError, error } = useGetEventByIdQuery(id);

  const [removeItem, { isLoading: isDeleting, error: deletingError }] =
    useDeleteEventMutation();

  const [saveUpdatedItem, { isLoading: isSaving, error: savingError }] =
    useUpdateEventMutation();
  if (!user) return <ErrorPage statusCode={404} />;
  if (isSaving) return <p>Updates saving...</p>;
  if (isDeleting) return <p>Deleting....</p>;
  if (isLoading) return <Loading />;
  if (isError || !id || deletingError)
    return <p>Error check console : {console.log({ error, deletingError })}</p>;

  return <Edit data={data} onDelete={removeItem} onSave={saveUpdatedItem} />;
};

export default EditEventPage;
