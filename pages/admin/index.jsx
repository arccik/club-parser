import Dashboard from "../../src/components/AdminPage/Dashboard/Dashboard";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import PageShell from "../../src/components/resourses/Layout/PageShell";

const AdminPage = () => {
  const { user } = useUser();
  const router = useRouter();
  if (user?.role !== "admin") return router.push("/");
  return (
    <PageShell wide>
      <Dashboard />
    </PageShell>
  );
};

export default withPageAuthRequired(AdminPage);
