import fetcher from "../../../utils/fetcher";
import ProfileDetails from "../../../components/DetailsPage/Details";

export async function getStaticPaths() {
  const venuePaths = await fetcher(`${process.env.API}/venues/`);
  console.log("PathSS >>> ", venuePaths);
  const paths = venuePaths.map((item) => {
    return {
      params: {
        id: item._id,
      },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const data = await fetcher(`${process.env.API}/venues/${id}`);
  return {
    props: {
      data,
    },
  };
}

const MapPage = ({ data }) => {
  return <ProfileDetails data={data} />;
};

export default MapPage;
