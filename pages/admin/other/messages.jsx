import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import DashboardMessageTable from "../../../src/components/AdminPage/Dashboard/MessageTable/MessageTable";
import PageShell from "../../../src/components/resourses/Layout/PageShell";
import SectionHeader from "../../../src/components/resourses/Layout/SectionHeader";

const MessagesPage = () => {
  return (
    <PageShell wide>
      <SectionHeader
        eyebrow="Admin inbox"
        title="Messages"
        description="Review and clear incoming contact requests."
      />
      <DashboardMessageTable />
    </PageShell>
  );
};

export default withPageAuthRequired(MessagesPage);
