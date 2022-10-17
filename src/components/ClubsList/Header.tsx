import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

import React from "react";
export default function Header() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 10,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          style={{
            fontWeight: "bold",
            color: "#121212",
            textAlign: "center",
            letterSpacing: 2,
            textShadow: `2px 7px 5px rgba(0,0,0,0.3), 
    0px -4px 10px rgba(255,255,255,0.3)`,
            backgroundImage: "linear-gradient(45deg, red, blue)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          variant="h2"
          gutterBottom
          component="div"
          align="center"
        >
          The Best UK Clubs In One Place
        </Typography>

        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Experience thousand of the capitals' most famous clubbing. You'll find
          sets from world-class DJs, a state-of-the-art sound system of the top
          nightclubs.
        </Typography>
        <Stack
          sx={{
            pt: 4,
          }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <FacebookIcon fontSize="large" />
          <YouTubeIcon fontSize="large" />
          <InstagramIcon fontSize="large" />
        </Stack>
      </Container>
    </Box>
  );
}
