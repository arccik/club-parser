import { useRef } from "react";
import { Grid, Input, SimpleGrid, Button } from "@mantine/core";
import { IconEdit } from "@tabler/icons";

const EditDetails = ({ data }) => {
  const titleRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <SimpleGrid cols={2}>
          <Input
            icon={<IconEdit />}
            variant="unstyled"
            placeholder={data?.name}
            radius="md"
            size="md"
          />
        </SimpleGrid>
      </Grid>
      <Button color="green" size="md" mt="lg">
        Save
      </Button>
    </form>
  );
};

export default EditDetails;
