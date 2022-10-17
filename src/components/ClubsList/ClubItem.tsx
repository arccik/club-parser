import IEvent from "../../interfaces/event";
import { motion, AnimatePresence } from "framer-motion";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { ListItem, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "../modal/ModalView";

import ClubCard from "./ClubCard";

export default function ClubItem({ club }: { club: any }) {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => {
    setModalOpen(true);
  };
  return (
    <>
      <a href={`#${club.eventname}`}>
        <motion.button
          id={club.eventname}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            border: 0,
            borderRadius: 10,
            width: "100%",
            background: modalOpen ? "#ff80ab" : "white",
            color: modalOpen ? "white" : "black",
          }}
          onClick={() => (modalOpen ? close() : open())}
        >
          <ListItem button>
            <ListItemAvatar>
              <Avatar alt="Profile Picture">{club.eventname[0]} </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={club.eventname}
              secondary={!modalOpen && club.description.slice(0, 30) + "..."}
            />
            <p>{club.date}</p>
          </ListItem>
        </motion.button>
      </a>

      {modalOpen && (
        <AnimatePresence>
          <Modal handleClose={close}>
            <Paper variant="outlined">
              <ClubCard club={club} />
            </Paper>
          </Modal>
        </AnimatePresence>
      )}
    </>
  );
}
