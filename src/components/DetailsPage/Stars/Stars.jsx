import { Rating } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRateEventMutation } from "../../../features/event/eventSlice";
import { useMemo } from "react";

const Stars = ({ rating, id }) => {
  const [localStorage, setLocalStorage] = useLocalStorage({
    key: `rating`,
    defaultValue: [],
  });
  const ratingAvarage = useMemo(() => {
    return (
      rating?.length > 0 &&
      rating?.reduce((acc, val) => (acc += val)) / rating?.length
    );
  }, [rating]);
  const fromStorage = localStorage.find((v) => v.id === id);
  const result = fromStorage ? fromStorage.score : ratingAvarage;

  const [rate, {}] = useRateEventMutation();

  const handleClick = async (score) => {
    setLocalStorage([...localStorage, { id, score }]);
    await rate({ _id: id, score });
  };
  return (
    <Rating
      style={{ marginTop: -15 }}
      onChange={handleClick}
      value={result}
      readOnly={fromStorage}
    />
  );
};

export default Stars;
