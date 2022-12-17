import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  field: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    border: "1px solid lightgrey",
    padding: 10,
    "&:hover, &:focus": {
      backgroundColor: "lightblue",
      opacity: 0.4,
      boxShadow: "2px 2px 2px red",
    },
  },
  fieldLabel: {
    marginTop: 10,
  },
  pageHeader: {
    color: "lightgrey",
  },
}));

export default useStyles;
