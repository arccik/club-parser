import { useLoadScript } from "@react-google-maps/api";
import ProfileDetails from "../../../components/DetailsPage/Details";
import fetcher from "../../../utils/fetcher";
import {
  Title,
  Text,
  Button,
  Image,
  TextInput,
  Container,
  Group,
  Rating,
  RingProgress,
} from "@mantine/core";
import useStyles from "../../../styles/eventHeader";
import image from "../../../public/assets/logo.png";

export async function getStaticPaths() {
  const data = await fetcher(`http://localhost:3000/api/events`);
  const paths = data.map((item) => {
    return {
      params: {
        id: item._id,
      },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const data = await fetcher(`http://localhost:3000/api/events/${id}`);
  return {
    props: {
      data,
    },
  };
}

const MapPage = ({ data }) => {
  const { classes } = useStyles();
  return (
    <Container>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>{data.name}</Title>
          <Group spacing={5} mb="lg">
            <span>
              <Rating defaultValue={data.rating} />
            </span>
            <RingProgress size={18} sections={[{ value: 80, color: "blue" }]} />
          </Group>
          <Text size="sm" color="dimmed">
            {data.description}
          </Text>

          <div className={classes.controls}>
            {/* <TextInput
              placeholder="Your email"
              classNames={{ input: classes.input, root: classes.inputWrapper }}
            /> */}

            <Button>Buy Tickets </Button>
          </div>
        </div>
        <Image src={data.image} className={classes.image} alt={data.name} />
        {/* <ProfileDetails data={data} /> */}
      </div>
    </Container>
  );
};

export default MapPage;
