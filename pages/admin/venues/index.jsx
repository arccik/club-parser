import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";
import { useState } from "react";
import { Button, Pagination } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import Link from "next/link";
import Loading from "../../../src/utils/Loading/Loading";
import { useGetVenuesQuery } from "../../../src/features/venue/venueSlice";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import ErrorPage from "next/error";
import PageShell from "../../../src/components/resourses/Layout/PageShell";
import SectionHeader from "../../../src/components/resourses/Layout/SectionHeader";
import EmptyState from "../../../src/components/resourses/Layout/EmptyState";
import MobileActionBar from "../../../src/components/resourses/Layout/MobileActionBar";

const AdminVenuesPage = () => {
  const [activePage, setPage] = useState(1);
  const { user } = useUser();
  const { data, isLoading, error } = useGetVenuesQuery(activePage);
  if (user?.role !== "admin") return null;
  if (!user) return <ErrorPage statusCode={404} />;
  if (isLoading) return <Loading />;
  if (error) return <p>Problem to getting data from server</p>;
  return (
    <PageShell wide>
      <SectionHeader
        eyebrow="Admin venues"
        title="Manage venues"
        description="Keep venue information current and accessible. Use search for fast updates."
        action={
          <Button component={Link} href="/admin/venues/add" leftIcon={<IconPlus size={16} />}>
            Add Venue
          </Button>
        }
      />
      {data?.venues?.length ? (
        <TableScrollArea data={data.venues} type="venues" />
      ) : (
        <EmptyState
          title="No venues available"
          description="Add a venue profile to start building your directory."
          action={
            <Button component={Link} href="/admin/venues/add">
              Add Venue
            </Button>
          }
        />
      )}
      <Pagination
        position="center"
        mt="sm"
        size="sm"
        page={activePage}
        onChange={setPage}
        total={data?.numberOfPages || 1}
      />
      <MobileActionBar>
        <Button component={Link} href="/admin/venues/add" leftIcon={<IconPlus size={14} />}>
          Add Venue
        </Button>
      </MobileActionBar>
    </PageShell>
  );
};

export default withPageAuthRequired(AdminVenuesPage);
