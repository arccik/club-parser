import Edit from "../../../../src/components/AdminPage/EditPageFields/Edit";
import {
  useGetVenueByIdQuery,
  useDeleteVenueMutation,
  useUpdateVenueMutation,
} from "../../../../src/features/venue/venueSlice";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Loading from "../../../../src/utils/Loading/Loading";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import PageShell from "../../../../src/components/resourses/Layout/PageShell";
import SectionHeader from "../../../../src/components/resourses/Layout/SectionHeader";
import { Button } from "@mantine/core";
import Link from "next/link";

const EditEventPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;

  const { data: venue, isLoading, isError, error } = useGetVenueByIdQuery(id);

  const [removeItem, { isLoading: isDeleting, error: deletingError }] =
    useDeleteVenueMutation();

  const [updateVenue, { isLoading: eventAdding, isError: eventAddError }] =
    useUpdateVenueMutation(id);
  if (user?.role !== "admin") return null;
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

  return (
    <PageShell wide>
      <SectionHeader
        eyebrow="Admin venues"
        title="Edit venue"
        description="Update venue details, location metadata, and publication fields."
        action={
          <Button component={Link} href="/admin/venues" variant="default">
            Back to venues
          </Button>
        }
      />
      <Edit data={venue} onDelete={removeItem} onSave={updateVenue} />
    </PageShell>
  );
};

export default withPageAuthRequired(EditEventPage);
