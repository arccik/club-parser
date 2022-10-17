import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import IEvent from "../src/interfaces/event";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import WestIcon from "@mui/icons-material/West";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

// export async function getStaticProps({ params }: { params: { id: string } }) {
//   const id = params.id;
//   const { data } = await axios.get(`/api/data/eventsByID?id=${id}`);
//   return {
//     props: {
//       data,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const { data } = await axios.get("http://localhost:3000/api/data");
//   const paths = data.map((club: IEvent) => {
//     return {
//       params: {
//         id: club.id,
//       },
//     };
//   });
//   return { paths, fallback: true };
// }

export default function MediaCard({ data }: { data: IEvent }) {
  const [event, setEvent] = useState<IEvent>(data);
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/data/eventsByID?id=${id}`);
      setEvent(data[0]);
    };
    fetchData();
  }, [id]);

  if (!event) return <Box> Loading... </Box>;

  return (
    <Box
      sx={{
        pt: 2,
        m: 5,
      }}
    >
      <Container component="main" maxWidth="md">
        <Link href="/">
          <WestIcon style={{ cursor: "pointer", right: 0 }} />
        </Link>
        <Paper variant="outlined">
          <Card>
            <CardMedia
              component="img"
              height="400px"
              image={event.largeimageurl}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {event.eventname}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {event.description}
              </Typography>
              {event.openingtimes && (
                <>
                  <Chip
                    sx={{ mt: 2, mb: 2 }}
                    label={event.date}
                    variant="outlined"
                  />
                  <Chip
                    sx={{ mt: 2, mb: 2 }}
                    label={`
                      Doors: ${event.openingtimes.doorsopen} - ${event.openingtimes.doorsclose}
                      `}
                    variant="outlined"
                  />
                </>
              )}

              {event.entryprice && (
                <Typography variant="body2">
                  Minimum Age: {event.minage}
                </Typography>
              )}

              {event.artists && (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <Typography
                    sx={{ mt: 2, mb: 2 }}
                    variant="h6"
                    component="div"
                  >
                    Artists
                  </Typography>
                  {event.artists.map((artist) => (
                    <ListItem key={artist.artistid}>
                      <ListItemAvatar>
                        <Avatar src={artist.image} />
                      </ListItemAvatar>
                      <ListItemText primary={artist.name} />
                    </ListItem>
                  ))}
                </List>
              )}

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{`${event.venue.type}: ${event.venue.name}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{event.venue.type}</Typography>
                  <Typography>{event.venue.name}</Typography>

                  <Typography variant="body1">{event.venue.town}</Typography>
                  <Typography variant="body1">{event.venue.address}</Typography>
                  <Typography>{event.venue.postcode}</Typography>
                  <Typography> Rating: {event.venue.rating}</Typography>
                </AccordionDetails>
              </Accordion>
            </CardContent>
            <CardActions>
              <a href={event.link} target="_blank">
                <Button size="small">Link</Button>
              </a>
              <a
                href={`https://www.google.com/maps?q=${event.venue.latitude},${event.venue.longitude}`}
                target="_blank"
              >
                <Button size="small">Get Direction</Button>
              </a>
            </CardActions>
          </Card>
        </Paper>
      </Container>
    </Box>
  );
}
