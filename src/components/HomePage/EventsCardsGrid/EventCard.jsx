import {
  Text,
  AspectRatio,
  Group,
  Badge,
  Stack,
  Divider,
  Grid,
} from "@mantine/core";
import Image from "next/image";
import Stars from "../../DetailsPage/Stars/Stars";
import dayjs from "dayjs";
import useStyles from "./styles";

import {
  IconCalendar,
  IconGps,
  IconCash,
  IconBuildingCommunity,
} from "@tabler/icons";
import displayPrice from "../../../utils/displayPrice";
import { useRouter } from "next/router";
import ArtistsCards from "./ArtistsCards/ArtistsCards";

const Cards = ({ data }) => {
  const { classes } = useStyles();
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/details/events/${id}`);
  };

  return data.map((article) => (
    <div key={article._id} className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        {article.image && (
          <Image
            fill
            sizes="(max-width: 500px) 100px"
            className={classes.link}
            src={article.image}
            alt="article image"
            onClick={() => handleClick(article._id)}
            blurDataURL="/assets/blur.jpg"
            placeholder="blur"
          />
        )}
      </AspectRatio>

      <Group position="apart" pl="xs">
        <Text
          size="sm"
          weight={700}
          className={classes.title}
          onClick={() => handleClick(article._id)}
        >
          {article.name}
        </Text>
        <Stars rating={article.rating} id={article._id} />
      </Group>
      <Grid mt="sm">
        <Grid.Col span={4}>
          {article.venue?.town && (
            <Text size="xs">
              <Group spacing={5}>
                <IconBuildingCommunity size={14} /> {article.venue.town}
              </Group>
            </Text>
          )}
          {article.distance && (
            <Text size="xs">
              <Group spacing={5}>
                <IconGps size={14} /> {article.distance.toPrecision(3)} km
              </Group>
            </Text>
          )}
        </Grid.Col>
        <Grid.Col span={6}>
          {article.price && (
            <Text size="xs">
              <Group spacing={5}>
                <IconCash size={14} />
                {displayPrice(article.price)}
              </Group>
            </Text>
          )}

          <Text size="xs">
            <Group spacing={5}>
              <IconCalendar size={14} />
              {dayjs(article.startdate).format("DD MMM")}
            </Group>
          </Text>
        </Grid.Col>
      </Grid>
      {/* <ArtistsCards artists={article.artists} /> */}
      {article.artists &&
        article.artists.map((artist) => (
          <Badge
            // m={0}
            key={artist}
            color="light"
            // className={classes.link}
          >
            {artist}
          </Badge>
        ))}

      {article.genres && (
        <Group m="xs">
          <Text size="xs" weight="bolder">
            Genres
          </Text>
          {article.genres.map((genre) => (
            <Badge
              // m={0}
              key={genre}
              color="light"
              className={classes.link}
              onClick={() => router.push(`/details/genres/${genre}`)}
            >
              {genre}
            </Badge>
          ))}
        </Group>
      )}
      <Divider mt="md" />
      {article.enddate < new Date() && (
        <Group position="apart" mt="md">
          <Badge color="pink">
            <Text size="xs" color="dimmed">
              Ended on
              <b> {dayjs(article.enddate).format("DD MMM YYYY")}</b>
            </Text>
          </Badge>
        </Group>
      )}
    </div>
  ));
};

export default Cards;
