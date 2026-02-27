import { Container, Button, Grid, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import AddVenue from "../../../../src/components/AdminPage/AddVenue/AddVenue";
import ErrorPage from "next/error";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Loading from "../../../../src/utils/Loading/Loading";
import PageShell from "../../../../src/components/resourses/Layout/PageShell";
import SectionHeader from "../../../../src/components/resourses/Layout/SectionHeader";
import Link from "next/link";

const AddVenuePage = () => {
  const { user, isLoading } = useUser();
  if (user?.role !== "admin") return null;
  if (isLoading) return <Loading />;
  if (!user) return <ErrorPage statusCode={404} />;
  return (
    <PageShell wide>
      <SectionHeader
        eyebrow="Admin venues"
        title="Create new venue"
        description="Add a complete venue profile with contact details and media."
        action={
          <Button component={Link} href="/admin/venues" variant="default">
            Back to venues
          </Button>
        }
      />
      <AddVenue />
    </PageShell>
  );
};

export default withPageAuthRequired(AddVenuePage);
