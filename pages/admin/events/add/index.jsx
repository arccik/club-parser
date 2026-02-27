import { Button } from "@mantine/core";
import AddEvent from "../../../../src/components/AdminPage/AddEvent/AddEvent";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import ErrorPage from "next/error";
import PageShell from "../../../../src/components/resourses/Layout/PageShell";
import SectionHeader from "../../../../src/components/resourses/Layout/SectionHeader";
import Link from "next/link";
const EditEventPage = () => {
  const { user } = useUser();
  if (!user) return <ErrorPage statusCode={404} />;
  if (user?.role !== "admin") return null;
  return (
    <PageShell wide>
      <SectionHeader
        eyebrow="Admin events"
        title="Create new event"
        description="Fill the details below to publish a new event listing."
        action={
          <Button component={Link} href="/admin/events" variant="default">
            Back to events
          </Button>
        }
      />
      <AddEvent />
    </PageShell>
  );
};

export default withPageAuthRequired(EditEventPage);
