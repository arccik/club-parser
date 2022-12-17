import { TextInput, ActionIcon, useMantineTheme, Loader } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons";
import Loading from "../../../utils/Loading/Loading";
import styles from "../hero.module.css";

import { useState } from "react";
import { Autocomplete } from "@mantine/core";
import { useSearchEventsQuery } from "../../../features/event/eventSlice";
import { useRouter } from "next/router";
import AutoCompleteItem from "./AutoCompleteItem";

const Search = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [itemPicked, setItemPicked] = useState(false);
  const { data, isLoading } = useSearchEventsQuery(searchValue);
  const theme = useMantineTheme();

  const handleSearch = (e) => {
    setSearchValue(e);
    setItemPicked(false);
  };

  return (
    <Autocomplete
      radius="lg"
      onItemSubmit={(e) => {
        setItemPicked(true);
        router.push(`/details/${e.placeType}s/${e.id}`);
      }}
      value={searchValue}
      onChange={handleSearch}
      dropdownPosition="bottom"
      label="Search..."
      placeholder="What you are looking for ?"
      className={styles.serachField}
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
          {itemPicked ? <Loader /> : <IconArrowRight size={18} stroke={1.5} />}
        </ActionIcon>
      }
      itemComponent={AutoCompleteItem}
      data={data || []}
      filter={(value, item) =>
        item.value?.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description?.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
};

export default Search;
