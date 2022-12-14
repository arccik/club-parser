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
  const [searchResult, setSearchResult] = useState();
  const { data, isLoading } = useSearchEventsQuery(searchValue || null);
  const theme = useMantineTheme();

  const handleSearch = (e) => {
    setSearchValue(e);
    setSearchResult(data);
  };

  if (isLoading) return <Loading />;

  return (
    <Autocomplete
      onItemSubmit={(e) => router.push(`/details/${e.placeType}s/${e.id}`)}
      value={searchValue}
      onChange={handleSearch}
      dropdownPosition="bottom"
      label="Search..."
      placeholder="What you are looking for ?"
      className={styles.serachField}
      icon={<IconSearch size={18} stroke={1.5} />}
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="transparent"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      itemComponent={AutoCompleteItem}
      data={searchResult || data}
      filter={(value, item) =>
        item.value?.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description?.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
    // <TextInput
    //   value={searchValue}
    //   onChange={handleSearch}
    //   className={styles.serachField}
    //   icon={<IconSearch size={18} stroke={1.5} />}
    //   radius="xl"
    //   size="md"
    //   variant="filled"
    //   rightSection={
    //     <ActionIcon
    //       size={32}
    //       radius="xl"
    //       color={theme.primaryColor}
    //       variant="transparent"
    //     >
    //       {theme.dir === "ltr" ? (
    //         <IconArrowRight size={18} stroke={1.5} />
    //       ) : (
    //         <IconArrowLeft size={18} stroke={1.5} />
    //       )}
    //     </ActionIcon>
    //   }
    //   placeholder="Search events or venues"
    //   rightSectionWidth={42}
    // />
  );
};

export default Search;
