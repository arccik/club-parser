import Edit from "../../../../src/components/AdminPage/EditPageFields/Edit";
import {
  useGetVenueByIdQuery,
  useDeleteVenueMutation,
  useUpdateVenueMutation,
} from "../../../../src/features/venue/venueSlice";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Loading from "../../../../src/utils/Loading/Loading";
import { useUser } from "@auth0/nextjs-auth0/client";

const EditEventPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;

  const { data: venue, isLoading, isError, error } = useGetVenueByIdQuery(id);

  const [removeItem, { isLoading: isDeleting, error: deletingError }] =
    useDeleteVenueMutation();

  const [updateVenue, { isLoading: eventAdding, isError: eventAddError }] =
    useUpdateVenueMutation(id);

  if (!user) return <ErrorPage statusCode={404} />;
  if (isDeleting) return <p>Deleting...</p>;
  if (isLoading || eventAdding) return <Loading />;

  if (isError || !id || eventAddError)
    return (
      <p>
        Problem on the server
        {console.log({ error })}
      </p>
    );

  return <Edit data={venue} onDelete={removeItem} onSave={updateVenue} />;
};

export default EditEventPage;
