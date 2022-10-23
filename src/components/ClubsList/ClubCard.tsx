import IEvent from "../../interfaces/event";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PublicIcon from "@mui/icons-material/Public";
import NearMeIcon from "@mui/icons-material/NearMe";
import CloseIcon from "@mui/icons-material/Close";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

export default function ClubCard({
  club,
  handleClose,
}: {
  club: IEvent;
  handleClose: any;
}) {
  return (
    <>
      <Card sx={{ bgcolor: "#fafafa", display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <CardMedia
            sx={{ p: 2, borderRadius: 5 }}
            component="img"
            height="250px"
            image={club.largeimageurl}
            alt={club.eventname}
          />

          <CardContent sx={{ flexGrow: 1, flexShrink: 1, flexBasis: "1000px" }}>
            <CloseIcon
              onClick={handleClose}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                margin: 10,
                cursor: "pointer",
              }}
            />
            <Typography gutterBottom variant="h5" component="div">
              {club.eventname}{" "}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {club.description}
            </Typography>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Venue Address</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{club.venue.name}</Typography>

                <Typography variant="body1">{club.venue.town}</Typography>
                <Typography variant="body1">{club.venue.address}</Typography>
                <Typography>{club.venue.postcode}</Typography>
                <Typography> Rating: {club.venue.rating}</Typography>
                <a
                  href={`https://www.google.com/maps?q=${club.venue.latitude},${club.venue.longitude}`}
                  target="_blank"
                >
                  <Chip
                    sx={{ mt: 2, mb: 2, bgcolor: "#FF0063", color: "white" }}
                    label="Get Directions"
                    variant="outlined"
                  />
                </a>
              </AccordionDetails>
            </Accordion>

            {club.openingtimes && (
              <>
                {club.entryprice && (
                  <Typography sx={{ mt: 2, mb: 2 }}>
                    {club.entryprice}
                  </Typography>
                )}
                <Typography sx={{ mt: 2, mb: 2 }}>{`
            Doors: ${club.openingtimes.doorsopen} - ${club.openingtimes.doorsclose}
            `}</Typography>
              </>
            )}

            {club.minage && (
              <Typography sx={{ mt: 2, mb: 2 }} variant="body2">
                Minimum Age: {club.minage}
              </Typography>
            )}

            {club.artists?.length > 0 && (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
                  Artists
                </Typography>
                {club.artists.map((artist) => (
                  <ListItem key={artist.artistid}>
                    <ListItemAvatar>
                      <Avatar src={artist.image} />
                    </ListItemAvatar>
                    <ListItemText primary={artist.name} />
                  </ListItem>
                ))}
              </List>
            )}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <a href={club.link} target="_blank">
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#ff0062d2", mr: 2 }}
                  startIcon={<PublicIcon />}
                >
                  Website
                </Button>
              </a>
              <a
                href={`https://www.google.com/maps?q=${club.venue.latitude},${club.venue.longitude}`}
                target="_blank"
              >
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#ff0062d2" }}
                  startIcon={<NearMeIcon />}
                >
                  Directions
                </Button>
              </a>
            </div>
          </CardContent>
        </Box>
      </Card>
      <br />
    </>
  );
}
