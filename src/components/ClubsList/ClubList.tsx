import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ClubItem from "./ClubItem";
import IEvent from "../../interfaces/event";
import { useQuery } from "react-query";
import { getClubs } from "../../services/api/index";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";

export default function ClubList() {
  const [page, setPage] = useState(6);
  const { isLoading, error, data } = useQuery(
    ["clubs", page],
    () => getClubs(5, 5 * page - 5),
    {
      keepPreviousData: true,
    }
  );

  const PAGE_COUNT = Math.ceil(data?.total / data?.limit);
  const handlePagination = (event: any, value: any) => {
    console.log("Handle  Change: ", value);
    setPage(value);
  };

  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>{JSON.stringify(error)} Error....</p>;
  return (
    <Paper square sx={{ pb: "50px" }}>
      <List>
        {data.data.map((club: IEvent, index: number) => (
          <div key={club.link}>
            <ClubItem club={club} />
          </div>
        ))}
      </List>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={PAGE_COUNT}
          size="large"
          defaultPage={page}
          onChange={handlePagination}
        />
      </div>
    </Paper>
  );
}
