import Container from "@mui/material/Container";
import Header from "../../ClubsList/Header";
import ClubList from "../../ClubsList/ClubList";

export default function MainContent() {
  return (
    <main>
      <Header />
      <Container
        sx={{
          py: 8,
        }}
        maxWidth="md"
      >
        <ClubList />
      </Container>
    </main>
  );
}
