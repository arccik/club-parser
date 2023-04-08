import { Rating } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRateMutation } from "../../../features/both/bothSlice";
import { useMemo, useState } from "react";

const Stars = ({ rating, id, type }) => {
  const [vote, setVote] = useState();
  // const [localStorage, setLocalStorage] = useLocalStorage({
  //   key: `rating`,
  //   defaultValue: [],
  // });
  const ratingAvarage = useMemo(() => {
    return (
      rating?.length > 0 &&
      rating?.reduce((acc, val) => (acc += val)) / rating?.length
    );
  }, [rating]);
  // const fromStorage = localStorage.find((v) => v.id === id);

  const [rate, {}] = useRateMutation();

  const handleClick = async (score) => {
    // setLocalStorage([...localStorage, { id, score }]);
    setVote(score);
    await rate({ _id: id, score, type });
  };
  return (
    <Rating
      mt="xs"
      mr="xs"
      onChange={handleClick}
      value={vote}
      readOnly={ratingAvarage}
    />
  );
};

export default Stars;
