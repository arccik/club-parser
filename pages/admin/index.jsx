import { Container } from "@mantine/core";
import Dashboard from "../../src/components/AdminPage/Dashboard/Dashboard";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const AdminPage = () => {
  const { user } = useUser();
  console.log("ADmin Panel User", user);
  if (user?.role !== "admin") return null;
  return (
    <Container size="sm">
      <Dashboard />
    </Container>
  );
};

export default withPageAuthRequired(AdminPage);
