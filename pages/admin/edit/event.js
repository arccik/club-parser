import EditEvent from "../../../components/AdminPage/EditEvent/EditEvent";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const EditEventPage = () => {
  const router = useRouter();
  const id = router.query.id;
  console.log("EditEventPage ID", id);
  const { data, error } = useSWR(
    `http://localhost:3000/api/events/${id}`,
    fetcher
  );
  console.log("EditEventPage DATA", data);
  if (!data) return <p>Event Not Found </p>;
  return <EditEvent eventData={data} />;
};

export default EditEventPage;
