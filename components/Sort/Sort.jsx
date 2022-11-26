import { Center, Input, Select } from "@mantine/core";

const Sort = () => {
  return (
    <Center style={{ width: 400 }}>
      <Input placeholder="Search..." />
      <Select
        placeholder="Sort By"
        data={[
          { value: "date", label: "Date" },
          { value: "rating", label: "Rating" },
          { value: "distance", label: "Distance" },
          { value: "price", label: "Price" },
        ]}
      />
    </Center>
  );
};

export default Sort;
