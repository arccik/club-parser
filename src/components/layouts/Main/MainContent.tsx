import Container from "@mui/material/Container";
import Header from "../../ClubsList/Header";
import ClubList from "../../ClubsList/ClubList";
import Modal from "../../modal/ModalView";

export default function MainContent() {
  return (
    <main
      style={{
        backgroundImage: "linear-gradient(white 50%, black 100%)",
      }}
    >
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
