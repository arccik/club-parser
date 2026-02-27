import { motion } from "framer-motion";
import { Card, Group, Text } from "@mantine/core";

const COLOR_MAP = {
  cyan: { glow: "rgba(78,161,255,0.35)", text: "#4ea1ff" },
  grape: { glow: "rgba(168,85,247,0.35)", text: "#a855f7" },
  yellow: { glow: "rgba(255,208,102,0.35)", text: "#ffd066" },
};

const StatCard = ({ icon, label, value, hint, color = "cyan" }) => {
  const accent = COLOR_MAP[color] ?? COLOR_MAP.cyan;

  return (
    <motion.div
      className="stat-card-gradient"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <Card
        p="lg"
        sx={{
          background: "linear-gradient(160deg, #131723, #0f131d)",
          border: "1px solid #2b3244",
          overflow: "visible",
          transition: "box-shadow 0.25s ease",
          "&:hover": {
            boxShadow: `0 8px 32px ${accent.glow}`,
          },
        }}
      >
        <Group position="apart" align="flex-start" noWrap={false} sx={{ rowGap: 8 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <Text size="xs" color="dimmed" sx={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {label}
            </Text>
            <Text
              size="xl"
              weight={700}
              mt={4}
              sx={{
                lineHeight: 1.2,
                background: `linear-gradient(135deg, #fff 30%, ${accent.text})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {value}
            </Text>
            {hint ? (
              <Text size="xs" color="dimmed" mt={6} sx={{ lineHeight: 1.35 }}>
                {hint}
              </Text>
            ) : null}
          </div>

          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `${accent.glow}`,
              flexShrink: 0,
            }}
          >
            {icon}
          </motion.div>
        </Group>
      </Card>
    </motion.div>
  );
};

export default StatCard;
