import { useRouter } from "next/router";
import { useGetByDateQuery } from "../../../src/features/both/bothSlice";
import Loading from "../../../src/utils/Loading/Loading";
import UniversalCards from "../../../src/components/UniversalCards/UniversalCards";

const ByDatePage = () => {
  const router = useRouter();
  const { date } = router.query;
  const { data, isLoading, error, isSuccess } = useGetByDateQuery(date);
  if (isLoading) return <Loading />;
  if (error) return <p>Connot get data</p>;
  return <UniversalCards data={data} cardType="Sorted By Date" />;
};

export default ByDatePage;
