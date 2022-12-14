import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
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
  const { data, isLoading } = useSearchEventsQuery(searchValue);
  const theme = useMantineTheme();

  const handleSearch = (e) => {
    setSearchValue(e);
  };

  return (
    <Autocomplete
      radius="lg"
      onItemSubmit={(e) => router.push(`/details/${e.placeType}s/${e.id}`)}
      value={searchValue}
      onChange={handleSearch}
      dropdownPosition="bottom"
      label="Search..."
      placeholder="What you are looking for ?"
      className={styles.serachField}
      icon={!isLoading ? <IconSearch size={18} stroke={1.5} /> : <Loading />}
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="transparent"
        >
          <IconArrowRight size={18} stroke={1.5} />
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
