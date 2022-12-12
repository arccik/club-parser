import { Container } from "@mantine/core";
import Dashboard from "../../src/components/AdminPage/Dashboard/Dashboard";

const AdminPage = () => {
  return (
    <Container size="sm" sx={{ left: "50%", right: "50%" }}>
      <Dashboard />
    </Container>
  );
};

export default AdminPage;
