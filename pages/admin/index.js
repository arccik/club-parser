import AppContainer from "../../src/components/AdminPage/AppContainer/AppContainer";
import { Button, Center, Paper, Container, Title } from "@mantine/core";
import StatsRing from "../../src/components/AdminPage/StatsRing/StatsRing";
import { useState } from "react";
import AddEvent from "../../src/components/AdminPage/AddEvent/AddEvent";
import AddVenue from "../../src/components/AdminPage/AddVenue/AddVenue";

const AdminPage = () => {
  const [place, setPlace] = useState(null);
  return (
    <AppContainer>
      <Button variant="light" ml="sm">
        ADD EVENT
      </Button>
      <Button variant="light" ml="sm">
        ADD VENUE
      </Button>
      <Button variant="light" ml="sm">
        ADD PUB
      </Button>
      {/* <AddEvent /> */}
      <AddVenue />
    </AppContainer>
  );
};

export default AdminPage;
