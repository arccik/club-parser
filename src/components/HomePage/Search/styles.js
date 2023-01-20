import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => {
  return {
    searchSection: {
      width: 680,
      margin: "auto",
      zIndex: 120,
      padding: 20,
      height: 50,
      marginTop: -300,
      "@media (max-width: 650px)": {
        width: "100%",
        marginTop: -120,
      },
    },
    // serachField: {
    //   width: "90%",
    //   "@media (max-width: 650px)": {
    //     width: "80%",
    //   },
    // },
    calendar: {
      margin: "auto",
      backgroundColor: "black",
      borderRadius: 20,
      zIndex: 100,
      "@media (max-width: 650px)": {
        marginTop: 40,
      },
    },
  };
});

export default useStyles;
