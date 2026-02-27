import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";
import { useGetEventsQuery } from "../../../src/features/event/eventSlice";
import { Button, Pagination } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import Link from "next/link";
import Loading from "../../../src/utils/Loading/Loading";
import { useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import ErrorPage from "next/error";
import PageShell from "../../../src/components/resourses/Layout/PageShell";
import SectionHeader from "../../../src/components/resourses/Layout/SectionHeader";
import MobileActionBar from "../../../src/components/resourses/Layout/MobileActionBar";
import EmptyState from "../../../src/components/resourses/Layout/EmptyState";

const AdminEventsPage = () => {
  const [activePage, setPage] = useState(1);
  const { data, isLoading, error } = useGetEventsQuery(activePage);
  const { user } = useUser();
  if (user?.role !== "admin") return null;

  if (isLoading) return <Loading />;
  if (error) return <p>Problem to getting data from server</p>;
  if (!user) return <ErrorPage statusCode={404} />;
  return (
    <PageShell wide>
      <SectionHeader
        eyebrow="Admin events"
        title="Manage events"
        description="Search, edit, and remove event records. The table adapts to cards on small screens."
        action={
          <Button component={Link} href="/admin/events/add" leftIcon={<IconPlus size={16} />}>
            Add Event
          </Button>
        }
      />
      {data?.events?.length ? (
        <TableScrollArea data={data.events} />
      ) : (
        <EmptyState
          title="No events available"
          description="Create your first event to start populating the catalog."
          action={
            <Button component={Link} href="/admin/events/add">
              Add Event
            </Button>
          }
        />
      )}
      <Pagination
        position="center"
        m="sm"
        noWrap
        page={activePage}
        onChange={setPage}
        total={data?.numberOfPages || 1}
      />
      <MobileActionBar>
        <Button component={Link} href="/admin/events/add" leftIcon={<IconPlus size={14} />}>
          Add Event
        </Button>
      </MobileActionBar>
    </PageShell>
  );
};

export default withPageAuthRequired(AdminEventsPage);
