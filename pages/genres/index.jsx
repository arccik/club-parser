import GenresBox from "../../src/components/HomePage/GenresBox/GenresBox";
import { Container } from "@mantine/core";
import FooterSocial from "../../src/components/resourses/Footer/Footer";


const GenresPage = () => {
  return (
    <>
      <Container>
        <GenresBox />
      </Container>
      <FooterSocial />
    </>
  );
};

export default GenresPage;
