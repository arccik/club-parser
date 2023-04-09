import { Rating } from "@mantine/core";
import { useRateMutation } from "../../../features/both/bothSlice";
import { useMemo, useState } from "react";

const Stars = ({ rating, id }) => {
  const ratingAvarage = useMemo(() => {
    return rating?.length > 0
      ? rating?.reduce((acc, val) => (acc += val)) / rating?.length
      : 0;
  }, [rating]);
  const [vote, setVote] = useState(ratingAvarage);

  const [rate, {}] = useRateMutation();

  const handleClick = async (score) => {
    setVote(score);
    await rate({ _id: id, score });
  };
  return (
    <Rating
      mt="xs"
      mr="xs"
      onChange={handleClick}
      value={vote}
      // readOnly={ratingAvarage}
    />
  );
};

export default Stars;
