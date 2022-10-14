import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ClubItem from "./ClubItem";
import IEvent from "../../interfaces/event";
import { useContext } from "react";
import { AppContext } from "../../pages";
import { ListSubheader } from "@mui/material";

export default function ClubList() {
  const clubs = useContext(AppContext);
  return (
    <Paper square sx={{ pb: "50px" }}>
      <List sx={{ mb: 2 }}>
        {clubs.map((club: IEvent, index: number) => (
          <span key={club.id}>
            {index === 1 ||
              (clubs[index + 1] && clubs[index + 1].date !== club.date && (
                <ListSubheader sx={{ bgcolor: "background.paper" }}>
                  {club.date}
                </ListSubheader>
              ))}
            <ClubItem club={club} />
          </span>
        ))}
      </List>
    </Paper>
  );
}
