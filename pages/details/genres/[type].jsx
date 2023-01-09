import { useGetByGenresQuery } from "../../../src/features/both/bothSlice";
import { useRouter } from "next/router";
import Loading from "../../../src/utils/Loading/Loading";
import UniversalCards from "../../../src/components/resourses/UniversalCards/UniversalCards";

const GenresPage = () => {
  const router = useRouter();
  const { type } = router.query;

  const { data, isLoading, error } = useGetByGenresQuery(type, {
    skip: !type,
  });
  if (isLoading) return <Loading />;
  if (error) return <p>Could not load data</p>;
  return <UniversalCards data={data} />;
};

export default GenresPage;
