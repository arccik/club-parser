import { Rating } from "@mantine/core";
import useSWR from "swr";
import { useLocalStorage } from "@mantine/hooks";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Stars = ({ rating, id }) => {
  const [value, setValue] = useLocalStorage({
    key: `Rate for : ${id}`,
    defaultValue: rating,
  });
  console.log("Rating value: ", value);

  const { data, error } = useSWR(`/api/rating/event?id=${id}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <Rating defaultValue={rating} onChange={setValue} readOnly={value} />;
};

export default Stars;
