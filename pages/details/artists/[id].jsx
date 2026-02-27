import { createStyles, Image, Card, Badge } from "@mantine/core";

import dbConnect from "../../../src/utils/dbConnect";
import Artist from "../../../src/models/artist-model";
import Event from "../../../src/models/event-model";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    display: "block",
    fontSize: 20,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },
  name: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
    fontSize: 20,
  },
  player: {
    position: "absolute",
    bottom: 50,
    left: theme.spacing.xs + 2,
  },
  footer: {
    marginTop: theme.spacing.md,
  },
}));

const ArtistPage = ({ artist, event }) => {
  const { classes } = useStyles();
  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section>
          <Image src={artist.image} alt={artist.name} height={600} />
        </Card.Section>

        <Badge
          className={classes.name}
          variant="gradient"
          gradient={{ from: "yellow", to: "red" }}
        >
          {artist.name}
        </Badge>
        {artist.spotifymp3url && (
          <audio controls className={classes.player}>
            <source src={artist.spotifymp3url} type="audio/mpeg" width="100%" />
            Your browser does not support the audio element.
          </audio>
        )}
      </Card>
    </>
  );
};
export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const data = await Artist.findById(params.id);
    const events = await Event.find({
      artists: { $in: [data._id] },
    });
    const event = JSON.parse(JSON.stringify(events));

    const artist = JSON.parse(JSON.stringify(data));
    return { props: { artist, event }, revalidate: 30 };
  } catch (error) {
    console.error("Problem on server, cannot get artist ", error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    await dbConnect();
    const artists = await Artist.find().lean();
    const paths = artists.map((artist) => ({
      params: { id: artist._id.toString() },
    }));
    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("Artist paths generation error:", error);
    return { paths: [], fallback: "blocking" };
  }
}

export default ArtistPage;
