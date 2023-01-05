import {
  Container,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
  Blockquote,
} from "@mantine/core";
import { useGetByGenresQuery } from "../../../src/features/both/bothSlice";
import { useRouter } from "next/router";
import Loading from "../../../src/utils/Loading/Loading";
import Link from "next/link";
import UniversalCards from "../../../src/components/UniversalCards/UniversalCards";

const GenresPage = (props) => {
  const router = useRouter();
  const { type } = router.query;

  const { data, isLoading, error } = useGetByGenresQuery(type, {
    skip: !type,
  });
  if (isLoading) return <Loading />;
  if (error) return <p>Could not load data</p>;
  console.log("Genres SS s ", data);
  return <UniversalCards data={data} />;
};

export default GenresPage;
