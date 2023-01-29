import { Text, AspectRatio, Group, Divider, Grid } from "@mantine/core";
import Image from "next/image";
import Stars from "../../DetailsPage/Stars/Stars";
import dayjs from "dayjs";
import useStyles from "./styles";

import { IconCalendar, IconGps, IconBuildingCommunity } from "@tabler/icons";
import { useRouter } from "next/router";
import ArtistsBubbles from "./ArtistsCards/ArtistsBubbles";
import GenresSlider from "./GenresSlider";
import DisplayEndDate from "./DisplayEndDate";
import Price from "./Price";

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

      <Group position="apart" pl="xs" align="right">
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
      <Grid ml={1}>
        <Grid.Col span={6}>
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
          <Text size="xs">
            <Group spacing={5}>
              <IconCalendar size={14} />
              {dayjs(article.startdate).format("DD MMM")}
            </Group>
          </Text>
        </Grid.Col>
        <Price price={article.price} />
      </Grid>
      <ArtistsBubbles artists={article.artists} />
      <GenresSlider genres={article.genres} classes={classes} />
      <Divider mt="md" />
      <DisplayEndDate enddate={article.enddate} />
    </div>
  ));
};

export default Cards;
