import { Card, Text, Group, Avatar } from "@mantine/core";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import useStyles from "./styles";
import Link from "next/link";
import { IconHome2, IconClockHour7, IconCalendar } from "@tabler/icons";
const ItemCard = ({ data }) => {
  const { classes } = useStyles();
  return (
    <Card
      withBorder
      radius="md"
      p={0}
      className={classes.card}
      component={Link}
      href={`/details/${data.placeType}s/${data._id}`}
    >
      <Group noWrap spacing={0}>
        {data.image && (
          <Image
            src={data?.image}
            height={140}
            width={140}
            alt={data.name}
            blurDataURL="/assets/blur.jpg"
            placeholder="blur"
          />
        )}
        <div className={classes.body}>
          <Group>
            <Text transform="uppercase" color="dimmed" weight={700} size="xs">
              <Group spacing={2} noWrap>
                <IconCalendar size={13} />
                {data.startdate && dayjs(data.startdate).format("DD MMM YY")}
              </Group>
              {/* {data.open && (
                <>
                  <Group spacing={2} noWrap>
                    <IconClockHour7 size={13} />
                    <Text size="xs">
                      {data.open} - {data.close}
                    </Text>
                  </Group>
                </>
              )} */}
              {
                <Group spacing={2} noWrap>
                  <IconClockHour7 size={13} />
                  {dayjs(data.startdate).fromNow()}
                </Group>
              }
            </Text>
            {data.distance && (
              <Text size="xs"> {data.distance.toPrecision(3)} km</Text>
            )}
          </Group>
          <Text className={classes.title} mt="xs" mb="md">
            {data.name}
          </Text>
          <Group spacing={2} noWrap>
            <IconHome2 size={15} />
            <Text size="xs">{data.address}</Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
};
export default ItemCard;
