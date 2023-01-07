import { Container } from "@mantine/core";
import Dashboard from "../../src/components/AdminPage/Dashboard/Dashboard";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

const AdminPage = () => {
  const { user } = useUser();
  const router = useRouter();
  if (user?.role !== "admin") return router.push("/");
  return (
    <Container size="sm">
      <Dashboard />
    </Container>
  );
};

export default withPageAuthRequired(AdminPage);
