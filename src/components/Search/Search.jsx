import {
  Container,
  Autocomplete,
  Group,
  Avatar,
  Text,
  Grid,
  Skeleton,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconCalendarEvent } from "@tabler/icons";
import { forwardRef, useState } from "react";
import { useRouter } from "next/router";
import { useGetMarkersQuery } from "../../features/api/apiSlice";
import SearchBarSkeleton from "./SearchBarSkeleton";

export default function Search({ eventData }) {
  // const { data: eventData, error, isLoading } = useGetMarkersQuery();
  const [showCalendar, setShowCalendar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [calendarValue, setCalendarValue] = useState("");
  const theme = useMantineTheme();
  const router = useRouter();
  // if (isLoading) return null;
  // if (error) return <p>Error check console {console.error({ error })}</p>;
  // return null;
  const data = eventData.map((item) => ({
    key: item._id,
    image: item.image,
    label: item.name,
    description: item.description,
    value: item.name,
    id: item._id,
  }));

  const handleCalendarChange = (event) => {
    setCalendarValue(event);
  };

  // eslint-disable-next-line react/display-name
  const AutoCompleteItem = forwardRef(
    ({ description, value, image, id, ...others }, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />

          <div>
            <Text>{value}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

  return (
    <Container size="lg">
      <Grid>
        <Grid.Col span={11}>
          <Autocomplete
            icon={<IconSearch size={18} stroke={1.5} />}
            radius="xl"
            size="md"
            mt="sm"
            mb="sm"
            onChange={setInputValue}
            label="Search events, artist or places"
            placeholder="Search..."
            rightSectionWidth={42}
            itemComponent={AutoCompleteItem}
            data={data}
            rightSection={
              <ActionIcon
                size={30}
                radius="xl"
                color={theme.secondaryColor}
                variant="filled"
              >
                <IconArrowRight size={18} stroke={1.5} />
              </ActionIcon>
            }
          />
        </Grid.Col>
        <Grid.Col span={1} p={0}>
          <IconCalendarEvent
            onClick={() => setShowCalendar((prev) => !prev)}
            color={theme.secondaryColor}
            style={{
              color: theme.secondaryColor,
              marginTop: 55,
              cursor: "pointer",
            }}
          />
        </Grid.Col>
      </Grid>

      <Calendar
        style={{
          margin: "auto",
          transition: "display 2s",
          display: !showCalendar ? "none" : "block",
        }}
        value={calendarValue}
        onChange={handleCalendarChange}
      />
    </Container>
  );
}
