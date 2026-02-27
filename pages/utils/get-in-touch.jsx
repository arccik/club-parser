import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Container,
  Card,
  Text,
  createStyles,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSendMessageMutation } from "../../src/features/admin/adminSlice";
import { useSessionStorage } from "@mantine/hooks";
import Link from "next/link";
import PageShell from "../../src/components/resourses/Layout/PageShell";
import SectionHeader from "../../src/components/resourses/Layout/SectionHeader";

const GetInTouch = () => {
  const [messageSent, setMessageSent] = useSessionStorage({
    key: "messageSent",
    defaultValue: false,
  });
  const [sendMessage] = useSendMessageMutation();
  const handleSubmit = async (e) => {
    const { data } = await sendMessage(form.values);
    if (data.status === "OK") setMessageSent(true);
  };
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
      message: (value) => value.trim().length === 0,
    },
  });
  const useStyles = createStyles((theme) => ({
    root: {
      paddingTop: 80,
      paddingBottom: 80,
    },

    label: {
      textAlign: "center",
      fontWeight: 900,
      fontSize: 120,
      lineHeight: 1,
      marginBottom: theme.spacing.xl * 1.5,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2],

      [theme.fn.smallerThan("sm")]: {
        fontSize: 120,
      },
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      textAlign: "center",
      fontWeight: 900,
      fontSize: 38,

      [theme.fn.smallerThan("sm")]: {
        fontSize: 32,
      },
    },

    description: {
      maxWidth: 500,
      margin: "auto",
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.xl * 1.5,
    },
  }));
  const { classes } = useStyles();

  return (
    <PageShell>
      <SectionHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Have a question, partnership request, or feedback? Send us a message and we will get back to you."
      />
      {!messageSent ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <SimpleGrid
            cols={2}
            mt="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <TextInput
              label="Name"
              placeholder="Your name"
              name="name"
              variant="filled"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              name="email"
              variant="filled"
              {...form.getInputProps("email")}
            />
          </SimpleGrid>

          <TextInput
            label="Subject"
            placeholder="Subject"
            mt="md"
            name="subject"
            variant="filled"
            {...form.getInputProps("subject")}
          />
          <Textarea
            mt="md"
            label="Message"
            placeholder="Your message"
            maxRows={10}
            minRows={5}
            autosize
            name="message"
            variant="filled"
            {...form.getInputProps("message")}
          />

          <Group position="center" mt="xl">
            <Button type="submit" size="md" variant="outline" color="gray">
              Send message
            </Button>
          </Group>
        </form>
      ) : (
        <Card>
          <div className={classes.label}>Thank You!</div>
          <Title className={classes.title}>Your messege sent</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            Team will get back to you soon.
          </Text>
          <Group position="center">
            <Button variant="subtle" size="md" component={Link} href="/">
              Return Main Page
            </Button>
          </Group>
        </Card>
      )}
    </PageShell>
  );
};
export default GetInTouch;
