import { useGetByGenresQuery } from "../../../src/features/both/bothSlice";
import { useRouter } from "next/router";
import Loading from "../../../src/utils/Loading/Loading";
import UniversalCards from "../../../src/components/resourses/UniversalCards/UniversalCards";
import { useState } from "react";

const GenresPage = () => {
  const router = useRouter();
  const { genre } = router.query;
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetByGenresQuery(
    { genre, page },
    {
      skip: !genre,
    }
  );
  if (isLoading) return <Loading />;
  if (error) return <p>Could not load data</p>;
  if (!data) return <p>Nothing was found</p>;
  return (
    <UniversalCards
      data={data.places}
      page={page}
      setPage={setPage}
      withOutSort
      numberOfPages={data.numberOfPages}
    />
  );
};

export default GenresPage;
