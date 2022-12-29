import {
  TextInput,
  ActionIcon,
  useMantineTheme,
  Loader,
  Group,
  Center,
  Transition,
  GroupedTransition,
} from "@mantine/core";
import {
  IconSearch,
  IconArrowRight,
  IconArrowLeft,
  IconCalendar,
} from "@tabler/icons";
import styles from "../hero.module.css";

import { useState } from "react";
import { Autocomplete } from "@mantine/core";
import { useSearchEventsQuery } from "../../../../features/event/eventSlice";
import { useRouter } from "next/router";
import AutoCompleteItem from "./AutoCompleteItem";
import { Calendar } from "@mantine/dates";

const Search = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [itemPicked, setItemPicked] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const { data, isLoading } = useSearchEventsQuery(searchValue, {
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
    <Group className={styles.searchSection}>
      <Autocomplete
        radius="lg"
        onItemSubmit={(e) => {
          setItemPicked(true);
          router.push(`/details/${e.placeType}s/${e.id}`);
        }}
        value={searchValue}
        onChange={handleSearch}
        dropdownPosition="bottom"
        className={styles.serachField}
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
        filter={(value, item) =>
          item.value?.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.description?.toLowerCase().includes(value.toLowerCase().trim())
        }
      />
      <ActionIcon onClick={() => setShowCalendar((prev) => !prev)}>
        <IconCalendar />
      </ActionIcon>
      {showCalendar && (
        <>
          <Calendar
            size="md"
            className={styles.calendar}
            value={calendarValue}
            onChange={handleCalendar}
          />
        </>
      )}
    </Group>
  );
};

export default Search;
