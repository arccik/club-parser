import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ClubItem from "./ClubItem";
import IEvent from "../../interfaces/event";
import { useContext } from "react";
import { AppContext } from "../../../pages";

export default function ClubList() {
  const clubs = useContext(AppContext);
  return (
    <Paper square sx={{ pb: "50px" }}>
      <List sx={{ mb: 2 }}>
        {clubs.map((club: IEvent, index: number) => (
          <div key={club.link}>
            <ClubItem club={club} />
          </div>
        ))}
      </List>
    </Paper>
  );
}
