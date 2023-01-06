import { useRouter } from "next/router";
import { LoadingOverlay, Title } from "@mantine/core";
import {
  useGetByDateQuery,
  useGetFromDateQuery,
} from "../../../src/features/both/bothSlice";
import Loading from "../../../src/utils/Loading/Loading";
import UniversalCards from "../../../src/components/UniversalCards/UniversalCards";
import dayjs from "dayjs";

const ByDatePage = () => {
  const router = useRouter();
  const { date } = router.query;
  const { data, isLoading, error, isSuccess } = useGetByDateQuery(date);
  const { data: otherData, isLoading: otherLoading } = useGetFromDateQuery(
    date,
    {
      skip: !isSuccess && data,
    }
  );
  console.log({ otherData });
  if (otherLoading) return <Loading />;
  if (isSuccess && !data.length)
    return (
      <>
        <Title order={3} mt="md" align="center">
          Nothing found on selected date
        </Title>
        <UniversalCards data={otherData} cardType="Check upcoming events" />
      </>
    );
  if (isLoading) return <Loading />;
  if (error) return;
  return (
    <UniversalCards data={data} cardType={dayjs(date).format("D MMM YYYY")} />
  );
};
  
export default ByDatePage;
