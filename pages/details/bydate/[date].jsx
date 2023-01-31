import { useRouter } from "next/router";
import { LoadingOverlay, Title } from "@mantine/core";
import {
  useGetByDateQuery,
  useGetFromDateQuery,
} from "../../../src/features/both/bothSlice";
import Loading from "../../../src/utils/Loading/Loading";
import UniversalCards from "../../../src/components/resourses/UniversalCards/UniversalCards";
import dayjs from "dayjs";
import { useState } from "react";

const ByDatePage = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { date } = router.query;
  const { data, isLoading, error, isSuccess } = useGetByDateQuery(
    {
      date,
      page,
    },
    { skip: !date }
  );
  const {
    data: otherData,
    isLoading: otherLoading,
    error: otherError,
  } = useGetFromDateQuery(
    {
      date,
      page,
    },
    { skip: data?.events?.length || !isSuccess }
  );
  if (otherLoading && isLoading) return <Loading />;
  if (otherError)
    return <Title align="center">Ops. something went wrong</Title>;

  if (isSuccess && !data?.events.length) {
    return (
      <>
        <Title order={3} mt="md" align="center">
          Nothing found on selected date
        </Title>
        <UniversalCards
          data={otherData?.events}
          cardType="Check upcoming events"
          page={page}
          setPage={setPage}
          numberOfPages={otherData?.numberOfPages}
          withOutSort
        />
      </>
    );
  }
  return (
    <UniversalCards
      numberOfPages={data?.numberOfPages}
      data={data?.events}
      cardType={dayjs(date).format("D MMM YYYY")}
      page={page}
      setPage={setPage}
      withOutSort
    />
  );
};
  
export default ByDatePage;
