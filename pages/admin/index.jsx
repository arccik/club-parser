import {
  Button,
  Center,
  Paper,
  Container,
  Title,
  createStyles,
  Badge,
  Group,
  Text,
  Card,
  SimpleGrid,
} from "@mantine/core";
import StatsRing from "../../src/components/AdminPage/StatsRing/StatsRing";
import { useState } from "react";
import AddEvent from "../../src/components/AdminPage/AddEvent/AddEvent";
import AddVenue from "../../src/components/AdminPage/AddVenue/AddVenue";
import Dashboard from "../../src/components/AdminPage/Dashboard/Dashboard";
import { IconGauge, IconUser, IconCookie } from "@tabler/icons";

const AdminPage = () => {
  const [place, setPlace] = useState(null);
  return (
    <Container size="sm" sx={{ left: "50%", right: "50%" }}>
      <Dashboard />
    </Container>
  );
};

export default AdminPage;
