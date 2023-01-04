import { createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => {
  return {
    //   card: {
    //     backgroundColor:
    //       theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.white,
    //   },

    heroImage: { objectFit: "cover", width: "100%" },

    container: {
      maxWidth: 1200,
      margin: "auto",
      zIndex: 200,
      padding: 0,
      "@media (max-width: 600px)": {
        width: "100%",
      },
    },
    searchSection: {
      width: 800,
      margin: "auto",
      zIndex: 120,
      height: 50,
      marginTop: -300,
      "@media (max-width: 600px)": {
        width: "90%",
        marginTop: -120,
      },
    },
    serachField: {
      width: "90%",
      "@media (max-width: 600px)": {
        width: "80%",
      },
    },
    calendar: {
      margin: "auto",
      backgroundColor: "black",
      borderRadius: 20,
      zIndex: 100,
      "@media (max-width: 600px)": {
        marginTop: 40,
      },
    },
  };
});

export default useStyles;
