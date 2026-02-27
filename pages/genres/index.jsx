import GenresBox from "../../src/components/HomePage/GenresBox/GenresBox";
import { Container } from "@mantine/core";
import FooterSocial from "../../src/components/resourses/Footer/Footer";
import PageShell from "../../src/components/resourses/Layout/PageShell";
import SectionHeader from "../../src/components/resourses/Layout/SectionHeader";

const GenresPage = () => {
  return (
    <>
      <PageShell>
        <SectionHeader
          eyebrow="Genres"
          title="Browse by genre"
          description="Jump into curated categories and discover matching events and venues."
        />
        <GenresBox />
      </PageShell>
      <FooterSocial />
    </>
  );
};

export default GenresPage;
