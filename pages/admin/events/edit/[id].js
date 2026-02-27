import Edit from "../../../../src/components/AdminPage/EditPageFields/Edit";
import {
  useDeleteEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../../../src/features/event/eventSlice";
import { useRouter } from "next/router";
import Loading from "../../../../src/utils/Loading/Loading";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import ErrorPage from "next/error";
import PageShell from "../../../../src/components/resourses/Layout/PageShell";
import SectionHeader from "../../../../src/components/resourses/Layout/SectionHeader";
import { Button } from "@mantine/core";
import Link from "next/link";

const EditEventPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const { data, isLoading, isError, error } = useGetEventByIdQuery(id);

  const [removeItem, { isLoading: isDeleting, error: deletingError }] =
    useDeleteEventMutation();

  const [saveUpdatedItem, { isLoading: isSaving, error: savingError }] =
    useUpdateEventMutation();
  if (user?.role !== "admin") return router.push("/");
  if (!user) return <ErrorPage statusCode={404} />;
  if (isSaving) return <p>Updates saving...</p>;
  if (isDeleting) return <p>Deleting....</p>;
  if (isLoading) return <Loading />;
  if (isError || !id || deletingError)
    return <p>Error check console : {console.log({ error, deletingError })}</p>;

  return (
    <PageShell wide>
      <SectionHeader
        eyebrow="Admin events"
        title="Edit event"
        description="Adjust event metadata, dates, and publication details."
        action={
          <Button component={Link} href="/admin/events" variant="default">
            Back to events
          </Button>
        }
      />
      <Edit data={data} onDelete={removeItem} onSave={saveUpdatedItem} />
    </PageShell>
  );
};

export default withPageAuthRequired(EditEventPage);
