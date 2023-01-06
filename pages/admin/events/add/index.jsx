import { Container } from "@mantine/core";
import AddEvent from "../../../../src/components/AdminPage/AddEvent/AddEvent";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import ErrorPage from "next/error";
const EditEventPage = () => {
  const { user } = useUser();
  if (!user) return <ErrorPage statusCode={404} />;
  if (user?.role !== "admin") return null;
  return (
    <Container size={"100%"}>
      <AddEvent />
    </Container>
  );
};

export default withPageAuthRequired(EditEventPage);
