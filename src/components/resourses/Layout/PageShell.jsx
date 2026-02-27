import { Container, Stack } from "@mantine/core";

const PageShell = ({ children, wide = false, className }) => {
  return (
    <Container
      size={wide ? "xl" : "lg"}
      className={className}
      sx={{ paddingTop: 24, paddingBottom: 48, minWidth: 0 }}
    >
      <Stack spacing="lg" sx={{ minWidth: 0 }}>
        {children}
      </Stack>
    </Container>
  );
};

export default PageShell;
