import { Rating } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Stars = ({ rating, id }) => {
  const { data, error } = useSWR("/api/rating/event", fetcher);
  console.log("rating data: ", data, error);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  return <Rating defaultValue={rating} />;

  console.log(router.query, ratingStatus);
  return;
};

export default Stars;
