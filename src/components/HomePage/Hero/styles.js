import { createStyles, keyframes } from "@mantine/core";

// export const bounce = keyframes({
//   "from, 20%, 53%, 80%, to": {
//     filter: "brightness(70%)",
//   },
//   "40%, 100%": {
//     filter: "brightness(100%)",
//   },
// });

const useStyles = createStyles((theme) => {
  return {
    heroImage: {
      objectFit: "cover",
      width: "100%",
      filter: "brightness(70%)",
      // animation: `${bounce} 3s ease-in-out infinite`,
    },

    container: {
      maxWidth: 1200,
      margin: "auto",
      padding: 0,
      borderRadius: 10,
      "@media (max-width: 650px)": {
        width: "100%",
      },
    },
  };
});

export default useStyles;
