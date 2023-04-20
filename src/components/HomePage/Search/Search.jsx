import { useState } from "react";
import {
  ActionIcon,
  useMantineTheme,
  Loader,
  Group,
  Transition,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { Autocomplete } from "@mantine/core";
import { useRouter } from "next/router";
import { IconSearch, IconArrowRight, IconCalendar } from "@tabler/icons";

import { useSearchEventsQuery } from "../../../features/event/eventSlice";
import AutoCompleteItem from "./AutoCompleteItem";
import useStyles from "./styles";

const Search = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [itemPicked, setItemPicked] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const { data, isLoading, isSuccess } = useSearchEventsQuery(searchValue, {
    skip: !searchValue,
  });

  const theme = useMantineTheme();
  const handleSearch = (e) => {
    setSearchValue(e);
    setItemPicked(false);
  };

  const handleCalendar = (date) => {
    setCalendarValue(date);
    router.push(`/details/bydate/${date}`);
  };

  return (
    <>
      <Group className={classes.searchSection}>
        <Autocomplete
          radius="lg"
          onItemSubmit={(e) => {
            setItemPicked(true);
            router.push(`/details/${e.placeType}s/${e.id}`);
          }}
          value={searchValue}
          onChange={handleSearch}
          dropdownPosition="bottom"
          className={classes.serachField}
          // label="Search..."
          placeholder="Search..."
          icon={
            !isLoading ? (
              <IconSearch size={18} stroke={1.5} />
            ) : (
              <Loader color="indigo" size="xs" />
            )
          }
          rightSection={
            <ActionIcon
              size={32}
              radius="md"
              color={theme.primaryColor}
              variant="transparent"
            >
              {itemPicked ? (
                <Loader />
              ) : (
                <IconArrowRight size={18} stroke={1.5} />
              )}
            </ActionIcon>
          }
          itemComponent={AutoCompleteItem}
          data={data || []}
          nothingFound={
            isSuccess ? "Nothing was found" : "Search result will appear here"
          }
          filter={(value, item) =>
            item.value?.toLowerCase().includes(value?.toLowerCase()?.trim()) ||
            item.description
              ?.toLowerCase()
              .includes(value?.toLowerCase()?.trim())
          }
        />
        <ActionIcon onClick={() => setShowCalendar((prev) => !prev)}>
          <IconCalendar color="white" />
        </ActionIcon>
      </Group>

      <Transition
        mounted={showCalendar}
        transition="slide-down"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <div className={classes.calendarContainer}>
            <Calendar
              className={classes.calendar}
              style={styles}
              size="md"
              value={calendarValue}
              onChange={handleCalendar}
            />
          </div>
        )}
      </Transition>
    </>
  );
};

export default Search;
