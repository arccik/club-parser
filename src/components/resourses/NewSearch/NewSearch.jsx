import { ActionIcon, Affix, Transition } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import Search from "../../HomePage/Search/Search";
import { useWindowScroll } from "@mantine/hooks";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

const NewSearch = () => {
  const [scrollPosition, scrollTo] = useWindowScroll();
  const [open, setOpen] = useState(false);
  const mobile = useMediaQuery(`(max-width: 550px)`);
  return (
    <>
      <ActionIcon
        variant="subtle"
        color="dark"
        size="md"
        onClick={() => setOpen((prev) => !prev)}
      >
        <IconSearch />
      </ActionIcon>
      <Affix
        position={
          mobile
            ? { top: "25%", left: 10 }
            : {
                top: "60%",
                left: "10%",
              }
        }
      >
        <Transition
          transition="slide-down"
          mounted={open || scrollPosition.y < 100}
        >
          {(transitionStyles) => (
            <div style={transitionStyles}>
              <Search />
            </div>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default NewSearch;
