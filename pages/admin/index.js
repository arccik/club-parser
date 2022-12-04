import { Container, Table } from "@mantine/core";
import { useGetAllEventsQuery } from "../../src/services/events";

export default function Admin() {
  const { data, error, isLoading } = useGetAllEventsQuery();
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];

  const headers =
    data && Object.keys(data[0]).map((value) => <th key={value}>{value}</th>);

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.address}</td>
      <td>{element.placeType}</td>
      <td>{element.open}</td>
      <td>{element.close}</td>
    </tr>
  ));

  return (
    <Container size="lg" mt="lg">
      <Table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}
