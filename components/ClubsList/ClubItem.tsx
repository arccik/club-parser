import * as React from "react";
import IEvent from "../../interfaces/event";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import { ListItem } from "@mui/material";

export default function ClubItem({ club }: { club: IEvent }) {
  return (
    <span key={club.id}>
      <Link href={`/${club.id}`}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar alt="Profile Picture" src={club.imageurl} />
          </ListItemAvatar>
          <ListItemText primary={club.eventname} secondary={club.description} />
        </ListItem>
      </Link>
    </span>
  );
}
