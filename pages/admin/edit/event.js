import EditEvent from "../../../src/components/AdminPage/EditEvent/EditEvent";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const EditEventPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/events/${id}`,
    fetcher
  );
  if (!data) return <p>Event Not Found </p>;
  return <EditEvent eventData={data} />;
};

export default EditEventPage;
