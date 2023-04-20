import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  field: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    border: "1px solid lightgrey",
    padding: 10,



    boxShadow: "2px 2px 2px red",

    "&:hover, &:focus": {
      border: "1px solid lightgrey",
      backgroundColor: "#add8e696",

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
