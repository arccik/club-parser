import { Container } from "@mantine/core";
import Dashboard from "../../src/components/AdminPage/Dashboard/Dashboard";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useCheckUserQuery } from "../../src/features/admin/adminSlice";
import Loading from "../../src/utils/Loading/Loading";

const AdminPage = () => {
  const { user } = useUser();

  return (
    <Container size="sm">
      <Dashboard />
    </Container>
  );
};

export default AdminPage;
