import Event from "../../../models/event-model";
import {
  Title,
  Text,
  Button,
  Image,
  Container,
  Group,
  Rating,
  RingProgress,
} from "@mantine/core";
import useStyles from "../../../styles/eventHeader";
import connectMongo from "../../../utils/mongodbConnect";

export async function getServerSideProps({ params }) {
  const id = params.id;
  await connectMongo();

  const event = await Event.findById(id);
  return {
    props: {
      event: JSON.stringify(event),
    },
  };
}

const MapPage = (props) => {
  const event = JSON.parse(props.event);
  const { classes } = useStyles();

  return (
    <Container>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>{event.name}</Title>
          <Group spacing={5} mb="lg">
            <span>
              <Rating defaultValue={event.rating} />
            </span>
            <RingProgress size={18} sections={[{ value: 80, color: "blue" }]} />
          </Group>
          <Text size="sm" color="dimmed">
            {event.description}
          </Text>

          <div className={classes.controls}>
            <Button>Buy Tickets </Button>
          </div>
        </div>
        <Image src={event.image} className={classes.image} alt={event.name} />
      </div>
    </Container>
  );
};

export default MapPage;
