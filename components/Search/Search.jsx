import {
  Container,
  Autocomplete,
  Group,
  Avatar,
  Text,
  Grid,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconCalendarEvent } from "@tabler/icons";
import { forwardRef, useState } from "react";
import { useRouter } from "next/router";

export default function Search({ eventsData, venuesData }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [calendarValue, setCalendarValue] = useState("");
  const theme = useMantineTheme();
  const router = useRouter();

  const data = [...venuesData, ...eventsData].map((item) => ({
    key: item._id,
    image: item.image,
    label: item.name,
    description: item.address || eventsData.date,
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
            // filter={(inputValue, item) =>
            //   item.value
            //     .toLowerCase()
            //     .includes(inputValue.toLowerCase().trim()) ||
            //   item.description
            //     .toLowerCase()
            //     .includes(inputValue.toLowerCase().trim())
            // }
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
        <Grid.Col span={1}>
          <IconCalendarEvent
            onClick={() => setShowCalendar((prev) => !prev)}
            color={theme.secondaryColor}
            style={{
              color: theme.secondaryColor,
              marginTop: 45,
              cursor: "pointer",
              marginRight: 20,
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
