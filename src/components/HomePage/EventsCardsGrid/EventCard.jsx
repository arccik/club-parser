import { Text, AspectRatio, Group, Badge, Stack, Divider } from "@mantine/core";
import Image from "next/image";
import Stars from "../../DetailsPage/Stars/Stars";
import dayjs from "dayjs";
import useStyles from "./styles";

import { IconCalendar, IconGps, IconMoneybag } from "@tabler/icons";
import displayPrice from "../../../utils/displayPrice";
import { useRouter } from "next/router";
import ArtistsCards from "./ArtistsCards/ArtistsCards";

const Cards = ({ data }) => {
  const { classes } = useStyles();
  const router = useRouter();

  return data.map((article) => (
    <div key={article._id} className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        {article.image && (
          <Image
            fill
            sizes="(max-width: 500px) 100px"
            src={article.image}
            alt="article image"
            onClick={() => router.push(`/details/events/${article._id}`)}
            blurDataURL="/assets/blur.jpg"
            placeholder="blur"
          />
        )}
      </AspectRatio>

      <Group position="apart" m="sm">
        <Text size="sm" weight={700} className={classes.title}>
          {article.name}
        </Text>
        <Stars rating={article.rating} id={article._id} />
      </Group>
      <Group spacing={0}>
        <Stack spacing={0} ml="sm">
          {article.price && (
            <Text size="xs">
              <Group spacing={0}>
                <IconMoneybag size={14} />
                {displayPrice(article.price)}
              </Group>
            </Text>
          )}

          <Text size="xs">
            <Group spacing={0}>
              <IconCalendar size={14} />
              {dayjs(article.startdate).format("DD MMM")}
            </Group>
          </Text>
          {article.distance && (
            <Text size="xs">
              <IconGps size={14} /> {article.distance.toPrecision(3)} km
            </Text>
          )}
        </Stack>
        <ArtistsCards artists={article.artists} />
      </Group>
      {article.genres && (
        <Group spacing={0} m={0} ml="sm" mt="sm">
          {article.genres.map((genre) => (
            <Badge m={0} key={genre} color="light">
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
