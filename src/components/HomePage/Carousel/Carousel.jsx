import { Carousel } from "@mantine/carousel";
import { Anchor, Box, Group, Text, createStyles } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import Link from "next/link";
import Card from "./Card/Card";
import dayjs from "dayjs";

const useStyles = createStyles((theme) => ({
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.3rem 0.85rem",
    borderRadius: "9999px",
    background: "rgba(116, 242, 206, 0.08)",
    border: "1px solid rgba(116, 242, 206, 0.25)",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#74f2ce",
    marginBottom: "0.75rem",
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#74f2ce",
    boxShadow: "0 0 6px #74f2ce",
    flexShrink: 0,
    display: "inline-block",
  },
  title: {
    fontSize: "clamp(1.4rem, 2.5vw, 2.1rem)",
    fontWeight: 700,
    color: "#f4f6fb",
    lineHeight: 1.15,
  },
  seeAll: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: "#4ea1ff",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    transition: "opacity 0.2s",
    "&:hover": {
      opacity: 0.75,
      textDecoration: "none",
    },
  },
  controls: {
    "& button": {
      background: "rgba(18, 20, 29, 0.8) !important",
      border: "1px solid rgba(78, 161, 255, 0.3) !important",
      backdropFilter: "blur(8px)",
      color: "#4ea1ff !important",
      "&:hover": {
        background: "rgba(78, 161, 255, 0.15) !important",
        border: "1px solid rgba(78, 161, 255, 0.6) !important",
      },
    },
  },
  indicator: {
    height: 4,
    borderRadius: 4,
    background: "rgba(255,255,255,0.2)",
    transition: "width 0.3s ease, background 0.3s ease",
    width: 20,
    "&[data-active]": {
      background: "#4ea1ff",
      width: 36,
    },
  },
}));

const CardsCarousel = ({ events }) => {
  const { classes } = useStyles();

  const slides = events?.map((item) => (
    <Carousel.Slide key={item._id}>
      <Card
        image={item.image}
        title={item.name}
        date={dayjs(item.startdate).format("DD/MM/YYYY")}
        id={item._id}
      />
    </Carousel.Slide>
  ));

  return (
    <Box px={{ base: 16, sm: 24 }}>
      <Group position="apart" align="flex-end" mb={16}>
        <div>
          <div className={classes.eyebrow}>
            <span className={classes.eyebrowDot} />
            Curated picks
          </div>
          <div className={classes.title}>Recommended Events</div>
        </div>
        <Anchor component={Link} href="/events" className={classes.seeAll} underline={false}>
          See all <IconArrowRight size={14} />
        </Anchor>
      </Group>

      <Carousel
        loop
        dragFree
        withIndicators
        pb={32}
        slideGap="md"
        align="start"
        classNames={{
          controls: classes.controls,
          indicator: classes.indicator,
        }}
        breakpoints={[
          { maxWidth: "sm", slideSize: "80%" },
          { minWidth: "sm", slideSize: "48%" },
          { minWidth: "md", slideSize: "28%" },
        ]}
      >
        {slides}
      </Carousel>
    </Box>
  );
};

export default CardsCarousel;
